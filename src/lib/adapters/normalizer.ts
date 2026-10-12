export function parseEdition(title: string, tags: string[] = []): string {
  const combined = (title + " " + tags.join(" ")).toLowerCase();
  if (combined.includes("player")) return "PLAYER_VERSION";
  if (combined.includes("retro") || combined.includes("vintage")) return "RETRO";
  if (combined.includes("concept")) return "CONCEPT";
  if (combined.includes("jacket") || combined.includes("hoodie")) return "APPAREL";
  if (combined.includes("fan")) return "FAN_VERSION";
  return "FAN_VERSION";
}

export function extractTeam(title: string): string {
  const t = title.toLowerCase();
  const teams = [
    { match: ["real madrid", "rma", "madrid"], name: "Real Madrid" },
    { match: ["barcelona", "barca", "fcb"], name: "FC Barcelona" },
    { match: ["manchester united", "man utd", "mufc"], name: "Manchester United" },
    { match: ["manchester city", "man city", "mcfc"], name: "Manchester City" },
    { match: ["arsenal"], name: "Arsenal" },
    { match: ["liverpool"], name: "Liverpool" },
    { match: ["chelsea"], name: "Chelsea" },
    { match: ["bayern munich", "bayern"], name: "Bayern Munich" },
    { match: ["psg", "paris saint-germain"], name: "Paris Saint-Germain" },
    { match: ["juventus", "juve"], name: "Juventus" },
    { match: ["ac milan", "milan"], name: "AC Milan" },
    { match: ["inter milan", "inter"], name: "Inter Milan" },
    { match: ["borussia dortmund", "bvb"], name: "Dortmund" },
    { match: ["tottenham", "spurs"], name: "Tottenham" },
    { match: ["argentina"], name: "Argentina" },
    { match: ["portugal"], name: "Portugal" },
    { match: ["brazil", "brasil"], name: "Brazil" },
    { match: ["france"], name: "France" },
    { match: ["germany"], name: "Germany" },
    { match: ["england"], name: "England" },
    { match: ["italy"], name: "Italy" },
    { match: ["spain"], name: "Spain" },
    { match: ["japan"], name: "Japan" },
    { match: ["al nassr"], name: "Al Nassr" },
    { match: ["inter miami"], name: "Inter Miami" },
  ];

  for (const item of teams) {
    if (item.match.some((m) => t.includes(m))) {
      return item.name;
    }
  }
  return "Club / International";
}

export function extractSeason(title: string): string {
  const match = title.match(/(20\d{2}[-/]\d{2,4}|\d{2}[-/]\d{2}|19\d{2})/);
  if (match) return match[0];
  return "";
}

export function generateComparisonKey(title: string): string {
  const team = extractTeam(title).toLowerCase().replace(/[^a-z0-9]/g, "");
  const edition = title.toLowerCase().includes("player")
    ? "player"
    : title.toLowerCase().includes("retro")
    ? "retro"
    : "fan";
  const season = extractSeason(title).replace(/[^a-z0-9]/g, "");
  const type = title.toLowerCase().includes("away")
    ? "away"
    : title.toLowerCase().includes("third")
    ? "third"
    : "home";

  return `${team}-${season || "std"}-${type}-${edition}`;
}
