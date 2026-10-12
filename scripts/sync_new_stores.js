const fs = require('fs');
const path = require('path');

async function syncNewStores() {
  console.log('Starting sync for newly discovered verified stores...');
  
  // Existing products
  const productsPath = path.join(__dirname, '..', 'data', 'products.json');
  const existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  console.log(`Current existing products: ${existingProducts.length}`);

  const newlyFetched = [];

  // Helper function for Shopify
  async function fetchShopify(storeId, label, baseUrl, limit = 100) {
    try {
      console.log(`Fetching Shopify feed for ${label}...`);
      const url = `${baseUrl.replace(/\/$/, '')}/products.json?limit=${limit}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.warn(`Failed ${label}: ${res.status}`);
        return [];
      }
      const data = await res.json();
      const rawProducts = data.products || [];
      console.log(`Received ${rawProducts.length} raw products from ${label}`);

      const items = [];
      for (const item of rawProducts) {
        if (!item.title || !item.images || item.images.length === 0) continue;
        const firstVariant = item.variants?.[0];
        const price = firstVariant?.price ? Math.round(parseFloat(firstVariant.price)) : 999;
        const comparePrice = firstVariant?.compare_at_price ? Math.round(parseFloat(firstVariant.compare_at_price)) : null;

        const sizes = [];
        let inStock = false;
        if (item.variants) {
          for (const v of item.variants) {
            if (v.available) {
              inStock = true;
              const s = v.option1 || v.title;
              if (s && !s.toLowerCase().includes('default')) sizes.push(s.trim());
            }
          }
        }

        const tagsArray = Array.isArray(item.tags)
          ? item.tags
          : typeof item.tags === 'string'
          ? item.tags.split(',').map(t => t.trim())
          : [];

        const titleLower = item.title.toLowerCase();
        let category = 'FAN_VERSION';
        if (titleLower.includes('player')) category = 'PLAYER_VERSION';
        else if (titleLower.includes('retro') || titleLower.includes('vintage')) category = 'RETRO';
        else if (titleLower.includes('concept')) category = 'CONCEPT';
        else if (titleLower.includes('jacket')) category = 'APPAREL';

        items.push({
          id: `${storeId.toLowerCase()}_${item.id}`,
          store: label,
          storeId,
          name: item.title,
          category,
          price: comparePrice && comparePrice > price ? comparePrice : price,
          discountedPrice: comparePrice && comparePrice > price ? price : null,
          currency: 'INR',
          inStock,
          imageUrl: item.images[0].src,
          productUrl: `${baseUrl.replace(/\/$/, '')}/products/${item.handle}?utm_source=kitscout&utm_medium=referral`,
          tags: tagsArray,
          sizes: Array.from(new Set(sizes)),
          firstSeenAt: new Date().toISOString()
        });
      }
      return items;
    } catch (e) {
      console.error(`Error fetching ${label}:`, e.message);
      return [];
    }
  }

  // Helper function for WooCommerce
  async function fetchWooCommerce(storeId, label, baseUrl, perPage = 80) {
    try {
      console.log(`Fetching WooCommerce API for ${label}...`);
      const url = `${baseUrl.replace(/\/$/, '')}/wp-json/wc/store/v1/products?per_page=${perPage}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.warn(`Failed ${label}: ${res.status}`);
        return [];
      }
      const rawProducts = await res.json();
      if (!Array.isArray(rawProducts)) return [];
      console.log(`Received ${rawProducts.length} raw products from ${label}`);

      const items = [];
      for (const item of rawProducts) {
        if (!item.name || !item.images || item.images.length === 0) continue;
        const factor = Math.pow(10, item.prices?.currency_minor_unit ?? 2);
        const priceRaw = parseFloat(item.prices?.price || 0) / factor;
        const regPriceRaw = parseFloat(item.prices?.regular_price || 0) / factor;
        const salePriceRaw = parseFloat(item.prices?.sale_price || 0) / factor;

        const hasDiscount = salePriceRaw > 0 && regPriceRaw > salePriceRaw;
        const price = Math.round(hasDiscount ? regPriceRaw : priceRaw);
        const discountedPrice = hasDiscount ? Math.round(salePriceRaw) : null;

        const tags = [];
        if (item.tags) item.tags.forEach(t => tags.push(t.name));
        if (item.categories) item.categories.forEach(c => tags.push(c.name));

        const sizes = [];
        if (item.attributes) {
          const sAttr = item.attributes.find(a => a.name.toLowerCase().includes('size'));
          if (sAttr && sAttr.terms) sAttr.terms.forEach(t => sizes.push(t.name));
        }

        const titleLower = item.name.toLowerCase();
        let category = 'FAN_VERSION';
        if (titleLower.includes('player')) category = 'PLAYER_VERSION';
        else if (titleLower.includes('retro') || titleLower.includes('vintage')) category = 'RETRO';
        else if (titleLower.includes('jacket')) category = 'APPAREL';

        items.push({
          id: `${storeId.toLowerCase()}_${item.id}`,
          store: label,
          storeId,
          name: item.name,
          category,
          price,
          discountedPrice,
          currency: 'INR',
          inStock: item.is_in_stock,
          imageUrl: item.images[0].src,
          productUrl: `${item.permalink}${item.permalink.includes('?') ? '&' : '?'}utm_source=kitscout&utm_medium=referral`,
          tags,
          sizes: Array.from(new Set(sizes)),
          firstSeenAt: new Date().toISOString()
        });
      }
      return items;
    } catch (e) {
      console.error(`Error fetching ${label}:`, e.message);
      return [];
    }
  }

  // 1. ThirdKit Store
  const thirdStoreProducts = await fetchShopify('THIRD_STORE', 'THE THIRD STORE', 'https://thirdstore.in', 100);
  newlyFetched.push(...thirdStoreProducts);

  // 2. Champions Kit
  const champProducts = await fetchShopify('CHAMPIONS_KIT', 'CHAMPIONS KIT', 'https://championskit.in', 100);
  newlyFetched.push(...champProducts);

  // 3. Ragefits
  const rageProducts = await fetchShopify('RAGEFITS', 'RAGEFITS', 'https://ragefits.com', 100);
  newlyFetched.push(...rageProducts);

  // 4. Fanaacs
  const fanProducts = await fetchShopify('FANAACS', 'FANAACS', 'https://fanaacs.com', 100);
  newlyFetched.push(...fanProducts);

  // 5. FootballMonk
  const monkProducts = await fetchWooCommerce('FOOTBALLMONK', 'FOOTBALLMONK', 'https://footballmonk.in', 80);
  newlyFetched.push(...monkProducts);

  // 6. Zeal Evince
  const zealProducts = await fetchWooCommerce('ZEAL_EVINCE', 'ZEAL EVINCE', 'https://zealevince.in', 80);
  newlyFetched.push(...zealProducts);

  // 7. Sansiro Sports
  const sansiroProducts = await fetchWooCommerce('SANSIRO_SPORTS', 'SANSIRO SPORTS', 'https://sansirosports.in', 80);
  newlyFetched.push(...sansiroProducts);

  // 8. Copycatz
  const copyProducts = await fetchWooCommerce('COPYCATZ', 'COPYCATZ', 'https://www.copycatz.in', 80);
  newlyFetched.push(...copyProducts);

  // 9. JCClub
  const jcProducts = await fetchWooCommerce('JCCLUB', 'JCCLUB', 'https://jcclub.in', 80);
  newlyFetched.push(...jcProducts);

  console.log(`Total new products fetched from 9 stores: ${newlyFetched.length}`);

  // Deduplicate against existing IDs
  const existingMap = new Map();
  existingProducts.forEach(p => existingMap.set(p.id, p));

  let addedCount = 0;
  for (const item of newlyFetched) {
    if (!existingMap.has(item.id)) {
      existingMap.set(item.id, item);
      addedCount++;
    }
  }

  const combinedProducts = Array.from(existingMap.values());
  console.log(`Newly added products: ${addedCount}`);
  console.log(`Total combined products: ${combinedProducts.length}`);

  fs.writeFileSync(productsPath, JSON.stringify(combinedProducts, null, 2));
  console.log('Saved combined products to data/products.json');

  // Update stores.json
  const storesPath = path.join(__dirname, '..', 'data', 'stores.json');
  const stores = JSON.parse(fs.readFileSync(storesPath, 'utf8'));
  
  // Count by store
  const storeCounts = {};
  combinedProducts.forEach(p => {
    storeCounts[p.store] = (storeCounts[p.store] || 0) + 1;
  });

  // Update hasCatalog and stats
  stores.forEach(s => {
    const count = storeCounts[s.meta.label] || storeCounts[s.meta.id] || 0;
    if (count > 0) {
      s.meta.hasCatalog = true;
    }
    s.stats.productCount = count;
  });

  // If THIRD_STORE or RAGEFITS aren't in stores.json, append them
  const existingStoreIds = new Set(stores.map(s => s.meta.id));
  const newStoresToAdd = [
    {
      meta: {
        id: "THIRD_STORE",
        label: "THE THIRD STORE",
        logoUrl: "/stores/thirdstore.webp",
        location: "Delhi NCR",
        websiteUrl: "https://thirdstore.in/",
        description: "Premier Indian football shirt stockist with deep player version and retro catalog.",
        hasCatalog: true
      },
      stats: {
        avgOverall: 8.5,
        avgShipping: 8.2,
        avgQuality: 8.9,
        avgSupport: 8.0,
        avgValue: 9.0,
        recommendPercent: 88,
        reviewCount: 9,
        productCount: storeCounts["THE THIRD STORE"] || 0
      }
    },
    {
      meta: {
        id: "RAGEFITS",
        label: "RAGEFITS",
        logoUrl: "/stores/ragefits.webp",
        location: "Jaipur",
        websiteUrl: "https://ragefits.com/",
        description: "Street-inspired football fashion and oversized retro jersey collections.",
        hasCatalog: true
      },
      stats: {
        avgOverall: 8.4,
        avgShipping: 8.0,
        avgQuality: 8.8,
        avgSupport: 7.9,
        avgValue: 8.9,
        recommendPercent: 84,
        reviewCount: 5,
        productCount: storeCounts["RAGEFITS"] || 0
      }
    },
    {
      meta: {
        id: "SANSIRO_SPORTS",
        label: "SANSIRO SPORTS",
        logoUrl: "/stores/sansiro.webp",
        location: "Malappuram, Kerala",
        websiteUrl: "https://sansirosports.in/",
        description: "Grassroots football kit stockist from the football heartland of Kerala.",
        hasCatalog: true
      },
      stats: {
        avgOverall: 8.2,
        avgShipping: 7.9,
        avgQuality: 8.5,
        avgSupport: 8.1,
        avgValue: 8.7,
        recommendPercent: 80,
        reviewCount: 4,
        productCount: storeCounts["SANSIRO SPORTS"] || 0
      }
    }
  ];

  for (const ns of newStoresToAdd) {
    if (!existingStoreIds.has(ns.meta.id)) {
      stores.push(ns);
    }
  }

  fs.writeFileSync(storesPath, JSON.stringify(stores, null, 2));
  console.log('Saved updated stores to data/stores.json');
}

syncNewStores();
