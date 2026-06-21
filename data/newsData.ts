export type NewsPriority = "High" | "Medium" | "Normal";

export type NewsItem = {
  slug: string;
  category: string;
  title: string;
  description: string;
  district: string;
  date: string;
  source: string;
  content: string;

  imageTitle?: string;
  imageUrl?: string;
  officialLink?: string;
  sourceLink?: string;
  priority?: NewsPriority;
  isBreaking?: boolean;
  tags?: string[];
};

export const allNews: NewsItem[] = [
  {
    slug: "bihar-breaking-news-update",
    category: "Breaking",
    title: "बिहार की बड़ी खबर: जनता से जुड़ी जरूरी अपडेट सामने आई",
    description:
      "बिहार के लोगों के लिए यह खबर बेहद महत्वपूर्ण है। पूरी जानकारी सरल और साफ भाषा में पढ़ें।",
    district: "Patna",
    date: "20 June 2026",
    source: "News of Bihar Desk",
    content:
      "बिहार से जुड़ी यह जरूरी खबर आम नागरिकों के लिए महत्वपूर्ण मानी जा रही है। News of Bihar का उद्देश्य खबर को सरल, साफ और जिम्मेदार भाषा में लोगों तक पहुँचाना है। किसी भी सूचना को अंतिम मानने से पहले official source से मिलान करना जरूरी है। हम खबर को तेज़ बनाने से पहले सही बनाने की कोशिश करते हैं।",
    imageTitle: "बिहार की बड़ी खबर",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "High",
    isBreaking: true,
    tags: ["Bihar News", "Breaking News", "Patna"],
  },

  {
    slug: "bihar-education-exam-result-update",
    category: "Education",
    title: "छात्रों के लिए जरूरी सूचना: परीक्षा और रिजल्ट अपडेट",
    description:
      "बिहार के छात्रों के लिए शिक्षा, परीक्षा, एडमिट कार्ड और रिजल्ट से जुड़ी जरूरी जानकारी।",
    district: "All Bihar",
    date: "20 June 2026",
    source: "Education Desk",
    content:
      "बिहार के छात्रों के लिए परीक्षा, रिजल्ट, एडमिट कार्ड, आंसर-की और आवेदन से जुड़ी जानकारी बहुत महत्वपूर्ण होती है। News of Bihar छात्रों तक सरल भाषा में जरूरी अपडेट पहुँचाने का प्रयास करता है। किसी भी परीक्षा या रिजल्ट से जुड़ी जानकारी को official website से जरूर मिलान करें।",
    imageTitle: "छात्रों के लिए जरूरी सूचना",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "High",
    isBreaking: false,
    tags: ["Education", "Bihar Board", "Exam Update"],
  },

  {
    slug: "bihar-government-jobs-update",
    category: "Government Jobs",
    title: "सरकारी नौकरी की तैयारी कर रहे युवाओं के लिए नया अपडेट",
    description:
      "BPSC, BSSC, Bihar Police, Railway और Teacher Vacancy से जुड़ी जानकारी यहाँ मिलेगी।",
    district: "All Bihar",
    date: "20 June 2026",
    source: "Jobs Desk",
    content:
      "बिहार के लाखों युवा सरकारी नौकरी की तैयारी करते हैं। BPSC, BSSC, Bihar Police, Railway, Banking और Teacher Vacancy से जुड़ी जानकारी अभ्यर्थियों के लिए बहुत जरूरी होती है। आवेदन करने से पहले official notification, eligibility, last date और application fee को ध्यान से पढ़ना चाहिए।",
    imageTitle: "सरकारी नौकरी अपडेट",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "High",
    isBreaking: false,
    tags: ["Government Jobs", "BPSC", "BSSC", "Bihar Police"],
  },

  {
    slug: "bihar-sarkari-yojana-update",
    category: "Sarkari Yojana",
    title: "बिहार की योजनाओं से जुड़ी जरूरी जानकारी",
    description:
      "सरकारी योजना, आवेदन प्रक्रिया, पात्रता और जरूरी लिंक को सरल भाषा में समझें।",
    district: "All Bihar",
    date: "20 June 2026",
    source: "Yojana Desk",
    content:
      "बिहार में कई सरकारी योजनाएं छात्रों, किसानों, महिलाओं, युवाओं और आम नागरिकों के लिए चलाई जाती हैं। किसी भी योजना का लाभ लेने से पहले पात्रता, जरूरी दस्तावेज, आवेदन प्रक्रिया और official website की जानकारी जरूर जांचें।",
    imageTitle: "बिहार सरकारी योजना",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "Medium",
    isBreaking: false,
    tags: ["Sarkari Yojana", "Bihar Scheme"],
  },

  {
    slug: "patna-district-news-update",
    category: "District News",
    title: "पटना जिले से जुड़ी बड़ी अपडेट",
    description:
      "पटना जिले की जरूरी खबर, प्रशासनिक अपडेट और जनता से जुड़ी जानकारी।",
    district: "Patna",
    date: "20 June 2026",
    source: "District Desk",
    content:
      "पटना बिहार की राजधानी होने के कारण यहाँ की खबरें पूरे राज्य के लिए महत्वपूर्ण होती हैं। प्रशासनिक अपडेट, शिक्षा, यातायात, सरकारी योजना और जनता से जुड़ी जानकारी को सरल भाषा में प्रस्तुत करना News of Bihar का उद्देश्य है।",
    imageTitle: "पटना जिले की खबर",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "Medium",
    isBreaking: false,
    tags: ["Patna", "District News"],
  },

  {
    slug: "gaya-district-public-update",
    category: "District News",
    title: "गया जिले में जनता से जुड़ी जरूरी सूचना",
    description:
      "गया जिले से शिक्षा, सड़क, प्रशासन और आम लोगों से जुड़ी खबरें।",
    district: "Gaya",
    date: "20 June 2026",
    source: "District Desk",
    content:
      "गया जिले से आई यह सूचना आम लोगों के लिए महत्वपूर्ण है। जिला स्तर की खबरों में प्रशासनिक सूचना, शिक्षा, सड़क, स्वास्थ्य और स्थानीय समस्याओं से जुड़ी जानकारी शामिल होती है।",
    imageTitle: "गया जिले की खबर",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "Normal",
    isBreaking: false,
    tags: ["Gaya", "District News"],
  },

  {
    slug: "muzaffarpur-latest-district-news",
    category: "District News",
    title: "मुजफ्फरपुर जिले की ताजा खबर",
    description:
      "मुजफ्फरपुर जिले से आई जरूरी जानकारी को आसान भाषा में पढ़ें।",
    district: "Muzaffarpur",
    date: "20 June 2026",
    source: "District Desk",
    content:
      "मुजफ्फरपुर जिले से जुड़ी खबरें लोगों के लिए महत्वपूर्ण होती हैं। News of Bihar का प्रयास है कि जिले की जरूरी सूचना सरल भाषा में लोगों तक पहुँचे।",
    imageTitle: "मुजफ्फरपुर की ताजा खबर",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "Normal",
    isBreaking: false,
    tags: ["Muzaffarpur", "District News"],
  },

  {
    slug: "bpsc-candidates-important-update",
    category: "Education",
    title: "BPSC अभ्यर्थियों के लिए महत्वपूर्ण सूचना",
    description:
      "BPSC, Bihar SI, BSSC और अन्य प्रतियोगी परीक्षाओं से जुड़ी अपडेट।",
    district: "All Bihar",
    date: "20 June 2026",
    source: "Education Desk",
    content:
      "BPSC और अन्य प्रतियोगी परीक्षाओं की तैयारी करने वाले छात्रों के लिए सही समय पर सही जानकारी बहुत जरूरी होती है। आवेदन, सिलेबस, परीक्षा तिथि, एडमिट कार्ड और रिजल्ट से जुड़ी जानकारी को हमेशा official website से verify करना चाहिए।",
    imageTitle: "BPSC महत्वपूर्ण सूचना",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "High",
    isBreaking: false,
    tags: ["BPSC", "Bihar SI", "BSSC"],
  },

  {
    slug: "bihar-police-recruitment-news",
    category: "Government Jobs",
    title: "Bihar Police भर्ती से जुड़ी खबर",
    description:
      "बिहार पुलिस भर्ती, फिजिकल, परीक्षा और चयन प्रक्रिया से जुड़ी जानकारी।",
    district: "All Bihar",
    date: "20 June 2026",
    source: "Jobs Desk",
    content:
      "बिहार पुलिस भर्ती में आवेदन, परीक्षा, फिजिकल टेस्ट और चयन प्रक्रिया से जुड़ी जानकारी अभ्यर्थियों के लिए बहुत महत्वपूर्ण होती है। किसी भी भर्ती में आवेदन करने से पहले official notification जरूर पढ़ें।",
    imageTitle: "Bihar Police भर्ती अपडेट",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "High",
    isBreaking: false,
    tags: ["Bihar Police", "Government Jobs"],
  },

  {
    slug: "student-scholarship-yojana-update",
    category: "Sarkari Yojana",
    title: "छात्रों के लिए योजना और छात्रवृत्ति अपडेट",
    description:
      "बिहार के छात्रों के लिए छात्रवृत्ति, सहायता योजना और आवेदन की जानकारी।",
    district: "All Bihar",
    date: "20 June 2026",
    source: "Yojana Desk",
    content:
      "छात्रों के लिए चलाई जाने वाली छात्रवृत्ति और सहायता योजनाएं पढ़ाई में बड़ी मदद करती हैं। आवेदन करने से पहले पात्रता, दस्तावेज, अंतिम तिथि और official portal की जानकारी जरूर जांचें।",
    imageTitle: "छात्रवृत्ति योजना अपडेट",
    imageUrl: "",
    officialLink: "",
    sourceLink: "",
    priority: "Medium",
    isBreaking: false,
    tags: ["Scholarship", "Student Yojana"],
  },
];