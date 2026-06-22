export type SmartParsedNews = {
  title: string;
  category: string;
  district: string;
  description: string;
  content: string;
  tags: string;
  officialLink: string;
  sourceLink: string;
  imageUrl: string;
  imageTitle: string;
};

const districtAliases = [
  ["Araria", "araria", "अररिया"],
  ["Arwal", "arwal", "अरवल"],
  ["Aurangabad", "aurangabad", "औरंगाबाद"],
  ["Banka", "banka", "बांका"],
  ["Begusarai", "begusarai", "बेगूसराय"],
  ["Bhagalpur", "bhagalpur", "भागलपुर"],
  ["Bhojpur", "bhojpur", "भोजपुर"],
  ["Buxar", "buxar", "बक्सर"],
  ["Darbhanga", "darbhanga", "दरभंगा"],
  ["East Champaran", "east champaran", "motihari", "पूर्वी चंपारण", "मोतिहारी"],
  ["Gaya", "gaya", "गया"],
  ["Gopalganj", "gopalganj", "गोपालगंज"],
  ["Jamui", "jamui", "जमुई"],
  ["Jehanabad", "jehanabad", "जहानाबाद"],
  ["Kaimur", "kaimur", "भभुआ", "कैमूर"],
  ["Katihar", "katihar", "कटिहार"],
  ["Khagaria", "khagaria", "खगड़िया"],
  ["Kishanganj", "kishanganj", "किशनगंज"],
  ["Lakhisarai", "lakhisarai", "लखीसराय"],
  ["Madhepura", "madhepura", "मधेपुरा"],
  ["Madhubani", "madhubani", "मधुबनी"],
  ["Munger", "munger", "मुंगेर"],
  ["Muzaffarpur", "muzaffarpur", "मुजफ्फरपुर"],
  ["Nalanda", "nalanda", "नालंदा"],
  ["Nawada", "nawada", "नवादा"],
  ["Patna", "patna", "पटना"],
  ["Purnea", "purnea", "पूर्णिया"],
  ["Rohtas", "rohtas", "रोहतास"],
  ["Saharsa", "saharsa", "सहरसा"],
  ["Samastipur", "samastipur", "समस्तीपुर"],
  ["Saran", "saran", "छपरा", "सारण"],
  ["Sheikhpura", "sheikhpura", "शेखपुरा"],
  ["Sheohar", "sheohar", "शिवहर"],
  ["Sitamarhi", "sitamarhi", "सीतामढ़ी"],
  ["Siwan", "siwan", "सिवान"],
  ["Supaul", "supaul", "सुपौल"],
  ["Vaishali", "vaishali", "वैशाली"],
  ["West Champaran", "west champaran", "bettiah", "पश्चिम चंपारण", "बेतिया"],
];

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function getValue(text: string, labels: string[]) {
  for (const label of labels) {
    const regex = new RegExp(
      `(?:^|\\n)\\s*${label}\\s*[:：-]\\s*(.+)`,
      "i"
    );

    const match = text.match(regex);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
}

function getContentBlock(text: string) {
  const match = text.match(
    /(?:^|\n)\s*(content|full content|news content|full news content|पूरी खबर|खबर)\s*[:：-]\s*([\s\S]*)/i
  );

  if (match?.[2]) {
    return match[2].trim();
  }

  return "";
}

function removeMetaLines(text: string) {
  return text
    .split("\n")
    .filter((line) => {
      const lower = line.toLowerCase().trim();

      return !(
        lower.startsWith("title:") ||
        lower.startsWith("heading:") ||
        lower.startsWith("category:") ||
        lower.startsWith("district:") ||
        lower.startsWith("short description:") ||
        lower.startsWith("description:") ||
        lower.startsWith("tags:") ||
        lower.startsWith("keywords:") ||
        lower.startsWith("official link:") ||
        lower.startsWith("source link:") ||
        lower.startsWith("image url:") ||
        lower.startsWith("image title:") ||
        lower.startsWith("content:") ||
        lower.startsWith("full content:") ||
        lower.startsWith("news content:")
      );
    })
    .join("\n")
    .trim();
}

function detectDistrict(text: string) {
  const lowerText = normalize(text);

  for (const aliases of districtAliases) {
    const districtName = aliases[0];

    const matched = aliases
      .slice(1)
      .some((alias) => lowerText.includes(normalize(alias)));

    if (matched) return districtName;
  }

  return "All Bihar";
}

function detectCategory(text: string) {
  const lowerText = normalize(text);

  if (
    lowerText.includes("job") ||
    lowerText.includes("vacancy") ||
    lowerText.includes("recruitment") ||
    lowerText.includes("नौकरी") ||
    lowerText.includes("भर्ती") ||
    lowerText.includes("रिक्ति")
  ) {
    return "Government Jobs";
  }

  if (
    lowerText.includes("yojana") ||
    lowerText.includes("scheme") ||
    lowerText.includes("योजना") ||
    lowerText.includes("लाभ") ||
    lowerText.includes("आवेदन")
  ) {
    return "Sarkari Yojana";
  }

  if (
    lowerText.includes("result") ||
    lowerText.includes("admit card") ||
    lowerText.includes("exam") ||
    lowerText.includes("school") ||
    lowerText.includes("college") ||
    lowerText.includes("education") ||
    lowerText.includes("परीक्षा") ||
    lowerText.includes("रिजल्ट") ||
    lowerText.includes("एडमिट कार्ड") ||
    lowerText.includes("छात्र") ||
    lowerText.includes("विद्यालय")
  ) {
    return "Education";
  }

  if (
    lowerText.includes("crime") ||
    lowerText.includes("murder") ||
    lowerText.includes("police") ||
    lowerText.includes("अपराध") ||
    lowerText.includes("हत्या") ||
    lowerText.includes("पुलिस")
  ) {
    return "Crime";
  }

  if (
    lowerText.includes("weather") ||
    lowerText.includes("rain") ||
    lowerText.includes("flood") ||
    lowerText.includes("मौसम") ||
    lowerText.includes("बारिश") ||
    lowerText.includes("बाढ़")
  ) {
    return "Weather Alert";
  }

  if (
    lowerText.includes("health") ||
    lowerText.includes("hospital") ||
    lowerText.includes("doctor") ||
    lowerText.includes("स्वास्थ्य") ||
    lowerText.includes("अस्पताल")
  ) {
    return "Health";
  }

  if (
    lowerText.includes("kisan") ||
    lowerText.includes("agriculture") ||
    lowerText.includes("farmer") ||
    lowerText.includes("किसान") ||
    lowerText.includes("कृषि")
  ) {
    return "Agriculture";
  }

  if (
    lowerText.includes("politics") ||
    lowerText.includes("election") ||
    lowerText.includes("minister") ||
    lowerText.includes("चुनाव") ||
    lowerText.includes("राजनीति") ||
    lowerText.includes("मंत्री")
  ) {
    return "Politics";
  }

  const detectedDistrict = detectDistrict(text);

  if (detectedDistrict !== "All Bihar") {
    return "District News";
  }

  return "Breaking";
}

function makeShortDescription(text: string, title: string) {
  const cleaned = removeMetaLines(text)
    .replace(title, "")
    .replace(/[#>*!\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return title;

  return cleaned.length > 165 ? `${cleaned.slice(0, 165)}...` : cleaned;
}

function makeTags(title: string, category: string, district: string, existing: string) {
  if (existing.trim()) return existing.trim();

  const tags = [
    "Bihar News",
    "News of Bihar",
    category,
    district !== "All Bihar" ? district : "",
    ...title
      .replace(/[^\u0900-\u097Fa-zA-Z0-9\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 4),
  ].filter(Boolean);

  return Array.from(new Set(tags)).join(", ");
}

function firstUsefulLine(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.find((line) => !line.includes(":")) || lines[0] || "";
}

function ensurePremiumContent(content: string, title: string) {
  const cleanContent = content.trim();

  if (!cleanContent) return "";

  if (
    cleanContent.startsWith("# ") ||
    cleanContent.startsWith("## ") ||
    cleanContent.includes("\n## ") ||
    cleanContent.includes("\n- ") ||
    cleanContent.includes("\n! ")
  ) {
    return cleanContent;
  }

  return `# ${title}

## पूरी जानकारी

${cleanContent}

! इस खबर से जुड़ी जानकारी को समझने के लिए official source और latest update जरूर check करें।`;
}

export function parseSmartNewsInput(rawText: string): SmartParsedNews {
  const text = rawText.trim();

  const labelledTitle = getValue(text, ["Title", "Heading", "News Title", "शीर्षक", "टाइटल"]);
  const title = labelledTitle || firstUsefulLine(text).replace(/^#\s*/, "");

  const category =
    getValue(text, ["Category", "कैटेगरी", "Section"]) || detectCategory(text);

  const district =
    getValue(text, ["District", "जिला"]) || detectDistrict(text);

  const officialLink = getValue(text, ["Official Link", "Official URL", "आधिकारिक लिंक"]);
  const sourceLink = getValue(text, ["Source Link", "Source URL", "स्रोत लिंक"]);
  const imageUrl = getValue(text, ["Image URL", "Image Link", "Thumbnail URL"]);
  const imageTitle = getValue(text, ["Image Title", "Thumbnail Title"]) || title;

  const rawContent = getContentBlock(text) || removeMetaLines(text);
  const content = ensurePremiumContent(rawContent, title);

  const description =
    getValue(text, [
      "Short Description",
      "Description",
      "Summary",
      "छोटा विवरण",
      "विवरण",
    ]) || makeShortDescription(content, title);

  const existingTags = getValue(text, ["Tags", "Keywords", "Tag", "कीवर्ड"]);
  const tags = makeTags(title, category, district, existingTags);

  return {
    title,
    category,
    district,
    description,
    content,
    tags,
    officialLink,
    sourceLink,
    imageUrl,
    imageTitle,
  };
}