// src/data/newsData.js

// ==================================================
// LOCAL TEXTILE IMAGES — 20 ACTUAL IMAGE FILES
// Images must be inside: public/images/
// ==================================================

export const textileImages = [
  "/images/traditional-weaving.jpg",
  "/images/colourful-fabrics.jpg",
  "/images/garment-collection.png",
  "/images/textile-workers.webp",
  "/images/textile-worker.jpg",
  "/images/textile-export-container.webp",
  "/images/textile-shipping.jpg",
  "/images/textile-machinery.jpg",
  "/images/garment-packing.webp",
  "/images/textile-export.jpg",
  "/images/loom-production.avif",
  "/images/clothing-collection.webp",
  "/images/textile-packaging.jpg",
  "/images/textile-production-worker.jpg",
  "/images/textile-container.jpg",
  "/images/textile-export -2.jpg",
  "/images/clothing-collection-2.jpg",
  "/images/textile-machinery-2.jpg",
  "/images/textile-market-2.jpg",
  "/images/textile-packaging-2.jpg",
];

// ==================================================
// IMAGE COLLAGE GENERATOR
// Returns exactly 11 images for each article.
// ==================================================

export function createImageCollage(articleIndex = 0) {
  const imageCount = textileImages.length;

  if (imageCount === 0) {
    return [];
  }

  const startIndex =
    ((articleIndex * 3) % imageCount + imageCount) % imageCount;

  return Array.from({ length: 11 }, (_, index) => {
    return textileImages[(startIndex + index) % imageCount];
  });
}

// ==================================================
// DATE HELPERS
// Demo timestamps for testing the dashboard.
// These are not verified publication times.
// ==================================================

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfWeek() {
  const date = startOfToday();
  const day = (date.getDay() + 6) % 7;

  date.setDate(date.getDate() - day);

  return date;
}

function startOfMonth() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function getPublishedAt(timeType, index = 0) {
  const now = new Date();

  switch (timeType) {
    case "Just Now":
      return new Date(
        now.getTime() - (1 + (index % 4)) * 60 * 1000
      ).toISOString();

    case "1h Ago":
      return new Date(
        now.getTime() - (10 + (index % 5) * 10) * 60 * 1000
      ).toISOString();

    case "Today":
      return new Date(
        now.getTime() - (2 + (index % 5)) * 60 * 60 * 1000
      ).toISOString();

    case "Yesterday": {
      const date = new Date(now);
      date.setDate(date.getDate() - 1);
      date.setHours(12, 0, 0, 0);

      return date.toISOString();
    }

    case "This Week": {
      const weekStart = startOfWeek();
      const todayStart = startOfToday();

      const daysSinceMonday = Math.floor(
        (todayStart.getTime() - weekStart.getTime()) /
          (24 * 60 * 60 * 1000)
      );

      if (daysSinceMonday <= 0) {
        return new Date(
          now.getTime() - 8 * 60 * 60 * 1000
        ).toISOString();
      }

      const daysAgo = 2 + (index % Math.max(1, daysSinceMonday - 1));
      const date = new Date(now);

      date.setDate(date.getDate() - Math.min(daysAgo, daysSinceMonday));
      date.setHours(12, 0, 0, 0);

      return date.toISOString();
    }

    case "This Month": {
      const monthStart = startOfMonth();
      const todayStart = startOfToday();

      const daysSinceMonthStart = Math.floor(
        (todayStart.getTime() - monthStart.getTime()) /
          (24 * 60 * 60 * 1000)
      );

      if (daysSinceMonthStart <= 2) {
        return new Date(
          now.getTime() - 8 * 60 * 60 * 1000
        ).toISOString();
      }

      const daysAgo = Math.min(
        10 + index,
        daysSinceMonthStart
      );

      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      date.setHours(12, 0, 0, 0);

      return date.toISOString();
    }

    default:
      return now.toISOString();
  }
}

// ==================================================
// FORMAT NEWS-CARD POSTING TIME
//
// Just now  : less than 5 minutes ago
// 1h ago    : 5 to 59 minutes ago
// Nh ago    : today's or yesterday's news
// This Week : older than 2 days, within current week
// No label  : older than the current week
// ==================================================
export function getTimeAgo(publishedAt) {
  if (!publishedAt) return "";

  const publishedDate = new Date(publishedAt);

  if (Number.isNaN(publishedDate.getTime())) {
    return "";
  }

  const now = new Date();
  const difference = now.getTime() - publishedDate.getTime();

  if (difference < 0) return "";

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes < 5) return "Just now";

  if (minutes < 60) return `${minutes}m ago`;

  // Show 1d ago instead of 24h ago
  if (hours < 24) return `${hours}h ago`;

  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);

  return `${years}y ago`;
}
// ==================================================
// ADD PUBLICATION TIMESTAMPS TO ARTICLES
// ==================================================

function addPostingDate(article, index) {
  const publishedAt = getPublishedAt(article.timeType, index);

  return {
    ...article,
    publishedAt,
    timeAgo: getTimeAgo(publishedAt),
  };
}

// ==================================================
// FEATURED CAROUSEL — SET A
// Six featured articles.
// ==================================================

export const featuredNewsData = [
  {
    id: "featured-1",
    category: "TEXTILE EXPORTS",
    title: "India’s Textile Exports and Global Trade",
    description:
      "Textile exporters monitor overseas demand, sourcing trends and international trade conditions as they plan production and deliveries.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(0),
    timeType: "Just Now",
  },

  {
    id: "featured-2",
    category: "COTTON & FABRICS",
    title: "Cotton and Fabric Prices Shape Industry Decisions",
    description:
      "Raw-material prices can influence textile manufacturing costs, product pricing and purchasing decisions throughout the supply chain.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(1),
    timeType: "1h Ago",
  },

  {
    id: "featured-3",
    category: "MANUFACTURING",
    title: "Modern Production Methods in the Textile Industry",
    description:
      "Textile manufacturers evaluate machinery, production workflows and process improvements to support productivity and quality.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(2),
    timeType: "Today",
  },

  {
    id: "featured-4",
    category: "SUSTAINABILITY",
    title: "Sustainable Materials Attract Textile Businesses",
    description:
      "Manufacturers and apparel businesses are exploring material choices and production practices that may reduce resource use and waste.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(3),
    timeType: "Yesterday",
  },

  {
    id: "featured-5",
    category: "APPAREL INDUSTRY",
    title: "Apparel Producers Adapt to Changing Buyer Needs",
    description:
      "Garment producers respond to changing buyer preferences, order requirements and delivery schedules across domestic and international markets.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(4),
    timeType: "This Week",
  },

  {
    id: "featured-6",
    category: "TEXTILE TECHNOLOGY",
    title: "Technology and Machinery Transform Textile Production",
    description:
      "Manufacturing equipment and automation can help textile businesses improve process consistency and evaluate production efficiency.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(5),
    timeType: "This Month",
  },
].map((article, index) => addPostingDate(article, index));

// ==================================================
// REGULAR NEWS CARDS — SET B
// Six different articles.
// ==================================================

export const newsData = [
  {
    id: "news-1",
    category: "GLOBAL TRADE",
    title: "International Textile Trade and Sourcing Trends",
    description:
      "Textile businesses assess international sourcing options, buyer requirements and changing market conditions when planning trade activities.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(6),
    timeType: "Just Now",
  },

  {
    id: "news-2",
    category: "GARMENT EXPORTS",
    title: "Garment Exporters Focus on Orders and Delivery",
    description:
      "Export-oriented garment businesses coordinate production schedules, quality checks, packaging and shipping to meet buyer requirements.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(7),
    timeType: "1h Ago",
  },

  {
    id: "news-3",
    category: "TEXTILE MACHINERY",
    title: "Machinery Upgrades Support Manufacturing Operations",
    description:
      "Textile manufacturers assess equipment upgrades and maintenance needs to support production reliability and product quality.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(8),
    timeType: "Today",
  },

  {
    id: "news-4",
    category: "RETAIL & FASHION",
    title: "Retail Preferences Influence Fabric Selection",
    description:
      "Customer preferences and retail trends affect the fabrics, colours and apparel styles that businesses choose to produce and stock.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(9),
    timeType: "Yesterday",
  },

  {
    id: "news-5",
    category: "SUPPLY CHAIN",
    title: "Packaging and Shipping Remain Important to Textile Logistics",
    description:
      "Packaging, container availability and transportation planning all contribute to the movement of textile goods between manufacturers and buyers.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(10),
    timeType: "This Week",
  },

  {
    id: "news-6",
    category: "TEXTILE BUSINESS",
    title: "Textile Businesses Review Production and Market Demand",
    description:
      "Textile businesses review operating costs, inventory and customer demand when making production and purchasing decisions.",
    source: "Textile Industry News",
    url: "#",
    images: createImageCollage(11),
    timeType: "This Month",
  },
].map((article, index) => addPostingDate(article, index + 6));

// ==================================================
// ALL ARTICLES
// ==================================================

export const allNewsData = [
  ...featuredNewsData,
  ...newsData,
];

// ==================================================
// DEFAULT EXPORT
// ==================================================

export default newsData;