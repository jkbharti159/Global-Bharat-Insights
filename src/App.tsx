/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Bookmark, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Clock, 
  Search, 
  Loader2, 
  Trash2, 
  ChevronLeft,
  ChevronRight, 
  Check, 
  Compass, 
  Layers, 
  ArrowUpRight,
  Share2,
  QrCode,
  Linkedin,
  ExternalLink,
  Image,
  Maximize2,
  RefreshCw,
  X
} from "lucide-react";

import { Category, Source, NewsArticle } from "./types";
import { PRESEEDED_NEWS } from "./data/preseededNews";
import NewsVisualization from "./components/NewsVisualization";

// Premium staggered layout transitions for detailed reports
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14
    }
  }
};

function ArticleSkeleton() {
  return (
    <div className="space-y-6 animate-pulse text-left h-full">
      {/* Label and read time lines */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-4">
        <div className="h-5 w-20 bg-white/10 rounded" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-4 w-16 bg-white/10 rounded" />
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="h-4 w-28 bg-white/10 rounded" />
      </div>

      {/* Title block */}
      <div className="space-y-3">
        <div className="h-8 bg-white/10 rounded-lg w-11/12 animate-pulse [animation-delay:0.1s]" />
        <div className="h-8 bg-white/10 rounded-lg w-2/3 animate-pulse [animation-delay:0.15s]" />
      </div>

      {/* Summary lines */}
      <div className="space-y-2.5 pt-2">
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-11/12" />
      </div>

      {/* Bullet points section */}
      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="h-4 bg-white/10 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-4 w-5 bg-rose-600/20 rounded shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 bg-white/5 rounded w-full" />
                <div className="h-3.5 bg-white/5 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visualization area block */}
      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-5 mt-8 space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="space-y-1">
            <div className="h-3.5 w-16 bg-white/10 rounded" />
            <div className="h-4 w-40 bg-white/15 rounded" />
          </div>
          <div className="h-6 w-6 bg-white/10 rounded-lg" />
        </div>
        <div className="h-32 bg-white/5 rounded-lg flex items-end justify-between p-4 space-x-3">
          {[40, 75, 55, 95, 80, 45].map((h, i) => (
            <div key={i} className="bg-white/10 rounded-t w-full" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const PRESEEDED_PATRIOTIC_IMAGES = [
  {
    name: "Golden Temple Freedom",
    url: "https://raw.githubusercontent.com/jkbharti159/Patriotic-images/main/IMG-20260613-WA0007.jpg"
  },
  {
    name: "Tricolour Heritage",
    url: "https://raw.githubusercontent.com/jkbharti159/Patriotic-images/main/IMG-20260613-WA0008.jpg"
  },
  {
    name: "Monuments Glory",
    url: "https://raw.githubusercontent.com/jkbharti159/Patriotic-images/main/IMG-20260613-WA0009.jpg"
  },
  {
    name: "Freedom & Unity",
    url: "https://raw.githubusercontent.com/jkbharti159/Patriotic-images/main/IMG-20260613-WA0010.jpg"
  },
  {
    name: "Tricolour Pride",
    url: "https://raw.githubusercontent.com/jkbharti159/Patriotic-images/main/IMG-20260613-WA0011.jpg"
  },
  {
    name: "Vibrant India",
    url: "https://raw.githubusercontent.com/jkbharti159/Patriotic-images/main/IMG-20260613-WA0012.jpg"
  }
];

const aspectRatios = ["aspect-video", "aspect-[4/3]", "aspect-[16/10]", "aspect-[3/2]"];
const getAspectRatio = (id: string | number) => {
  const str = String(id);
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i);
  }
  return aspectRatios[num % aspectRatios.length];
};

const getRelativePreseededNews = (preseeded: NewsArticle[]): NewsArticle[] => {
  const now = new Date();
  return preseeded.map((article) => {
    const relativeDate = new Date(now);
    if (article.id === "seed-1" || article.id === "seed-2") {
      // Today: seed-1 at 06:30 AM, seed-2 at 04:15 AM
      relativeDate.setHours(article.id === "seed-1" ? 6 : 4, article.id === "seed-1" ? 30 : 15, 0, 0);
    } else if (article.id === "seed-3" || article.id === "seed-4" || article.id === "seed-5") {
      // Yesterday: seed-3 at 08:00 AM, seed-4 at 02:00 AM, seed-5 at 11:45 AM
      relativeDate.setDate(now.getDate() - 1);
      relativeDate.setHours(article.id === "seed-3" ? 8 : (article.id === "seed-4" ? 2 : 11), article.id === "seed-3" ? 0 : (article.id === "seed-4" ? 0 : 45), 0, 0);
    } else if (article.id === "seed-6") {
      // 2 days ago: 09:20 AM
      relativeDate.setDate(now.getDate() - 2);
      relativeDate.setHours(9, 20, 0, 0);
    } else if (article.id === "seed-7") {
      // 3 days ago: 14:30 PM
      relativeDate.setDate(now.getDate() - 3);
      relativeDate.setHours(14, 30, 0, 0);
    }
    return {
      ...article,
      publishedTime: relativeDate.toISOString()
    };
  });
};

interface EnrichedTimelineEvent {
  date: string;
  title: string;
  description: string;
  stakeholders: string[];
  impactLevel: string;
  actionMeasures: string;
  expertAnalysis: string;
  keyMetricLabel: string;
  keyMetricValue: number;
}

// Custom timeline expander & high-fidelity context decorator
function getEnrichedTimeline(article: NewsArticle | null): EnrichedTimelineEvent[] {
  if (!article) return [];
  const sourceTimeline = article.timeline || [];

  // Stable seeded random based on article ID and title
  const seedString = `${article.id}-${article.title}`;
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const nextRand = (itemSeed: number) => {
    let t = (hash + itemSeed * 987654) | 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const getEventDateOffset = (offsetDays: number) => {
    const refDate = article.publishedTime ? new Date(article.publishedTime) : new Date();
    const d = new Date(refDate);
    d.setDate(d.getDate() - offsetDays);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const baseEvents = [...sourceTimeline];
  
  // Custom templates to pad short timelines to 6 distinct events
  const preStagedMilestoneTemplates = [
    {
      title: "Inter-Ministerial Strategic Briefing",
      description: "Working groups convene an extraordinary review panel to assess structural readiness across related domains."
    },
    {
      title: "Preliminary Intelligence Sourcing",
      description: "Data-gathering nodes across commercial and geographic coordinates compile primary risk index markers."
    },
    {
      title: "Bilateral Risk Alignment Mapping",
      description: "Trade and developmental representatives map secondary impacts to prevent upstream resource slippages."
    },
    {
      title: "Policy Feasibility Draft Circulated",
      description: "Regulatory authorities distribute a confidential framework draft for inter-agency coordination."
    }
  ];

  let filledEvents = [...baseEvents];
  if (filledEvents.length < 6) {
    const paddingCount = 6 - filledEvents.length;
    for (let i = 0; i < paddingCount; i++) {
      const templateIdx = Math.floor(nextRand(i * 105) * preStagedMilestoneTemplates.length);
      const template = preStagedMilestoneTemplates[templateIdx];
      const offsetDays = 30 + (i + 1) * 7;
      
      filledEvents.unshift({
        date: getEventDateOffset(offsetDays),
        title: template.title,
        description: template.description
      });
    }
  }

  // Define pools for high-fidelity detailing
  const listStakeholders = (category: string, randVal: number) => {
    const indiaStakeholders = [
      ["NITI Aayog", "Ministry of Commerce", "RBI Planning Desk"],
      ["National Grid Authority", "ISRO Telemetry Cells", "IIT Research Bureau"],
      ["Bilateral Trade Desk", "Customs Inspection Wing", "State Board Officers"],
      ["NABARD Rural Bureau", "Water Resource Directorate", "Krishi Cooperation Group"]
    ];
    const globalStakeholders = [
      ["IMF Sovereign Policy Desk", "World Trade Board", "Federal Reserve Board"],
      ["European Commission DG Connect", "Phoenix Tech Labs", "Saxony Fab Management"],
      ["Indo-Pacific Trade Alliance", "Customs Maritime Registry", "Cargo Telemetry Corps"],
      ["Global Climate Syndicate", "Met Directorate", "Agricultural Cooperative Advisory"]
    ];
    const pools = category === "India Focus" ? indiaStakeholders : globalStakeholders;
    const poolIdx = Math.floor(randVal * pools.length);
    return pools[poolIdx];
  };

  const impactLevels = [
    "Sovereign Strategic Alliance Priority",
    "High Governance Regulatory Standard",
    "Critical Supply Chain Corridor Safety Buffer",
    "Primary Fiscal Stability Guardrail"
  ];

  const actionMeasuresList = [
    "Logistical shipping and pipeline corridors authorized under priority status.",
    "Bilateral liquidity reserves cleared and dispatched to central buffer hubs.",
    "Remote sensor arrays and telemetry monitoring authorized across primary deployment nodes.",
    "Comprehensive compliance standards ratified and published for sector coordination.",
    "Sub-surface resources conservation parameters officially integrated into local district directives."
  ];

  const expertAnalysisPool = [
    "This milestone establishes key structural safety buffers, insulating the underlying asset class from macro volatility.",
    "National planners noted that securing this benchmark guarantees raw manufacturing material flows for coming semesters.",
    "The institutional ratification effectively resolves multi-year logistical disputes, lowering friction by 15-20%.",
    "Coordinated rate freezes or allocations will remain active to buffer the regional markets from volatile secondary adjustments."
  ];

  const keyMetricLabels = ["Strategic Alignment", "Operational Readiness", "Sector Security Value", "Mitigative Cushion Factor"];

  return filledEvents.map((evt, idx) => {
    const r1 = nextRand(idx + 12);
    const r2 = nextRand(idx * 7 + 15);
    const r3 = nextRand(idx * 13 + 7);
    const r4 = nextRand(idx * 19 + 9);

    const stakeholders = listStakeholders(article.category, r1);
    const impactLevel = impactLevels[Math.floor(r2 * impactLevels.length)];
    const actionMeasures = actionMeasuresList[Math.floor(r3 * actionMeasuresList.length)];
    const expertAnalysis = expertAnalysisPool[Math.floor(r4 * expertAnalysisPool.length)];
    const keyMetricLabel = keyMetricLabels[Math.floor(r1 * keyMetricLabels.length)];
    const keyMetricValue = Math.round(75 + r2 * 21); // 75 to 96%

    return {
      date: evt.date,
      title: evt.title,
      description: evt.description,
      stakeholders,
      impactLevel,
      actionMeasures,
      expertAnalysis,
      keyMetricLabel,
      keyMetricValue
    };
  });
}

// Convert dynamic human/calendar dates into standard YYYY-MM-DD for HTML date inputs
function convertToInputDate(dateStr: string): string {
  try {
    const monthMap: { [key: string]: string } = {
      jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
      jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
    };
    
    const cleaned = dateStr.trim().replace(/,/g, "");
    const parts = cleaned.split(" ");
    
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const monthLabel = parts[1].toLowerCase().slice(0, 3);
      const month = monthMap[monthLabel];
      const year = parts[2];
      if (month && year && !isNaN(Number(year)) && !isNaN(Number(day))) {
        return `${year}-${month}-${day}`;
      }
    }
    
    // Check if it's relative
    const now = new Date();
    const lstr = dateStr.toLowerCase();
    if (lstr.includes("yesterday")) {
      now.setDate(now.getDate() - 1);
    } else if (lstr.includes("today") || lstr.includes("this morning") || lstr.includes("this afternoon")) {
      // Keep today
    } else if (lstr.includes("week ago") || lstr.includes("weeks ago")) {
      const weeks = parseInt(dateStr, 10) || 1;
      now.setDate(now.getDate() - (weeks * 7));
    } else if (lstr.includes("day ago") || lstr.includes("days ago")) {
      const days = parseInt(dateStr, 10) || 1;
      now.setDate(now.getDate() - days);
    }
    
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    return new Date().toISOString().split("T")[0];
  }
}

function extractBaseTopic(title: string): string {
  if (!title) return "";
  let current = title.trim();
  
  const prefixes = [
    "Historic Analysis:",
    "Realities of:",
    "Dynamic Bulletin:",
    "Breaking:",
    "Analysis of:",
    "Report on:",
    "Policy Commitments Authorized:",
    "Early Indicator Divergence:",
    "Sovereign Framework Drafted:",
    "Inter-Ministerial Strategic Briefing:",
    "Historic Realities Recorded:",
    "Historic Analysis: Realities of",
    "Realities of",
    "Historic Analysis"
  ];

  let modified = true;
  while (modified) {
    modified = false;
    
    // 1. Remove standard prefixes
    for (const prefix of prefixes) {
      if (current.toLowerCase().startsWith(prefix.toLowerCase())) {
        current = current.substring(prefix.length).trim();
        // Skip leading colon or quotes right after the prefix
        if (current.startsWith(":") || current.startsWith("'") || current.startsWith('"')) {
          current = current.substring(1).trim();
        }
        modified = true;
      }
    }

    // 2. Strip quotes from the beginning and end if matching
    if (
      (current.startsWith("'") && current.endsWith("'")) ||
      (current.startsWith('"') && current.endsWith('"')) ||
      (current.startsWith('“') && current.endsWith('”'))
    ) {
      current = current.substring(1, current.length - 1).trim();
      modified = true;
    }

    // 3. Remove any "as of [Date]" suffixes
    const asOfRegex = /\s+as of\s+.*$/i;
    if (asOfRegex.test(current)) {
      current = current.replace(asOfRegex, "").trim();
      modified = true;
    }
  }

  // Clean outer single/double quotes recursive check
  while (
    (current.startsWith("'") && current.endsWith("'")) ||
    (current.startsWith('"') && current.endsWith('"')) ||
    (current.startsWith('“') && current.endsWith('”'))
  ) {
    current = current.substring(1, current.length - 1).trim();
  }

  return current.trim();
}

export const OFFICIAL_CHANNELS_URLS: Record<Source, string> = {
  "Times of India": "https://timesofindia.indiatimes.com/",
  "The Hindu": "https://www.thehindu.com/",
  "The Indian Express": "https://indianexpress.com/",
  "Reuters": "https://www.reuters.com/",
  "BBC World News": "https://www.bbc.com/news/world"
};

export default function App() {
  // State
  const [news, setNews] = useState<NewsArticle[]>(() => getRelativePreseededNews(PRESEEDED_NEWS));
  const [selectedCategory, setSelectedCategory] = useState<Category>("India Focus");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isComfortMode, setIsComfortMode] = useState<boolean>(false);
  
  // Twice-daily automatic update synchronization states
  const [syncStatus, setSyncStatus] = useState<{
    lastSyncTime: string;
    nextSyncTime: string;
    scheduleInterval: string;
    status: string;
    timezone: string;
    trustedChannels: string[];
    customSyncedCount: number;
  } | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  
  // URL share clipboard and toast notification state
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showDevModal, setShowDevModal] = useState<boolean>(false);
  const [selectedPatrioticImage, setSelectedPatrioticImage] = useState<string | null>(null);
  const [patrioticImages, setPatrioticImages] = useState<{name: string, url: string}[]>(PRESEEDED_PATRIOTIC_IMAGES);
  const [loadingPatrioticImages, setLoadingPatrioticImages] = useState<boolean>(false);
  const [currentPatrioticIndex, setCurrentPatrioticIndex] = useState<number>(0);

  // Auto-play/auto-slide effect for the patriotic image gallery
  useEffect(() => {
    if (patrioticImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPatrioticIndex((prev) => (prev + 1) % patrioticImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [patrioticImages.length]);

  useEffect(() => {
    const fetchPatrioticImages = async () => {
      try {
        setLoadingPatrioticImages(true);
        const res = await fetch("https://api.github.com/repos/jkbharti159/Patriotic-images/contents");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const imageFiles = data
              .filter((file: any) => 
                file.type === "file" && 
                /\.(jpe?g|png|webp|gif|svg)$/i.test(file.name)
              )
              .map((file: any) => ({
                name: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                url: file.download_url
              }));
            if (imageFiles.length > 0) {
              setPatrioticImages(imageFiles);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching patriotic images dynamically from GitHub:", err);
      } finally {
        setLoadingPatrioticImages(false);
      }
    };
    fetchPatrioticImages();
  }, []);

  const handleShareArticle = (article: NewsArticle, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    // Construct a specific article query link
    const shareUrl = `${window.location.origin}?articleId=${article.id}`;
    
    // Attempt standard clipboard interaction
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setToastMessage(`"${article.title.substring(0, 35)}..." link copied!`);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      }).catch((err) => {
        console.error("Standard copy failed, using fallback", err);
        fallbackCopyText(shareUrl, article.title);
      });
    } else {
      fallbackCopyText(shareUrl, article.title);
    }
  };

  const fallbackCopyText = (text: string, title: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; 
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      
      setToastMessage(`"${title.substring(0, 35)}..." link copied!`);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (e) {
      console.error("All clipboard fallbacks failed", e);
    }
  };
  
  // Staging state parameters for UX animations
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isTabChanging, setIsTabChanging] = useState<boolean>(false);

  // Trigger brief simulation loader upon switching tabs
  useEffect(() => {
    setIsTabChanging(true);
    const timer = setTimeout(() => {
      setIsTabChanging(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Reset scroll progress when current article changes
  useEffect(() => {
    setScrollProgress(0);
  }, [selectedCategory, selectedArticleId]);

  // Update scroll bar calculation
  const handleScroll = (e: any) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((target.scrollTop / totalHeight) * 100);
    }
  };
  
  // Custom smart news analyzer state
  const [topicQuery, setTopicQuery] = useState("");
  const [customSource, setCustomSource] = useState<Source>("The Hindu");
  const [customCategory, setCustomCategory] = useState<Category>("India Focus");
  const [analysisDate, setAnalysisDate] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [demoBannerMessage, setDemoBannerMessage] = useState<string | null>(null);

  // Selected timeline event index state
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number>(0);

  // Visible page index in the "Other Category Reports" carousel feed (one at a time)
  const [feedIndex, setFeedIndex] = useState<number>(0);

  // Reset selected timeline index and feed page index on article or tab shift
  useEffect(() => {
    setSelectedTimelineIndex(0);
    setFeedIndex(0);
  }, [selectedArticleId, selectedCategory]);

  // Fetch news data on demand or automatically twice daily
  const fetchNewsAndStatus = async () => {
    try {
      const newsRes = await fetch("/api/news");
      let currentServerNews: NewsArticle[] = [];
      if (newsRes.ok) {
        const newsData = await newsRes.json();
        if (newsData.success && newsData.data) {
          currentServerNews = newsData.data;
        }
      }

      // Load custom analyzed local stories from indexed history
      const storedCustomNews = localStorage.getItem("custom_news_articles");
      let finalNews = currentServerNews.length > 0 ? [...currentServerNews] : [...getRelativePreseededNews(PRESEEDED_NEWS)];
      
      if (storedCustomNews) {
        try {
          const parsedCustom = JSON.parse(storedCustomNews) as NewsArticle[];
          const filteredCustom = parsedCustom.filter(
            (item) => !finalNews.some((svrItem) => svrItem.id === item.id)
          );
          finalNews = [...filteredCustom, ...finalNews];
        } catch (err) {
          console.error("Local database parse failure", err);
        }
      }
      
      setNews(finalNews);

      // Check for deep-linked query parameter
      const params = new URLSearchParams(window.location.search);
      const paramArticleId = params.get("articleId");
      if (paramArticleId) {
        const match = finalNews.find((a) => a.id === paramArticleId);
        if (match) {
          setSelectedCategory(match.category);
          setSelectedArticleId(match.id);
        }
      }

      const statusRes = await fetch("/api/news/sync-status");
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (statusData.success) {
          setSyncStatus(statusData);
        }
      }
    } catch (err) {
      console.error("Sync telemetry failure", err);
    }
  };

  const triggerManualSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/news/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        await fetchNewsAndStatus();
        setToastMessage(data.message || "Twice-daily live feeds successfully synchronized!");
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 4500);
      }
    } catch (err) {
      console.error("Sync trigger failure", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Initialize data on mount and handle shared article deep-linking
  useEffect(() => {
    // Load Bookmarks from local storage
    const storedBookmarks = localStorage.getItem("news_bookmarks_v1");
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (err) {
        console.error("Failed to parse stored bookmarks", err);
      }
    }

    fetchNewsAndStatus();

    // Auto-update check every 5 minutes
    const interval = setInterval(() => {
      fetchNewsAndStatus();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Save Bookmarks
  const toggleBookmark = (id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    let updatedBookmarks: string[];
    if (bookmarks.includes(id)) {
      updatedBookmarks = bookmarks.filter((bId) => bId !== id);
    } else {
      updatedBookmarks = [...bookmarks, id];
    }
    setBookmarks(updatedBookmarks);
    localStorage.setItem("news_bookmarks_v1", JSON.stringify(updatedBookmarks));
  };

  // Remove all bookmarks safely
  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("news_bookmarks_v1");
  };

  // Filter current news items by active Category Tab
  const categoryArticles = news.filter((item) => item.category === selectedCategory);

  // Determine Focused Article
  // If we selected one specific article, put that in focus. Otherwise, check if there's any article in the current category and select the first one.
  const activeArticle = 
    news.find((item) => item.id === selectedArticleId) || 
    categoryArticles[0] || 
    news[0];

  // Set default article selection if state gets out of sync
  useEffect(() => {
    if (categoryArticles.length > 0 && !categoryArticles.some(a => a.id === selectedArticleId)) {
      // Don't auto-switch if the active article belongs to a different tab, unless no match is active.
      const currentActiveBelongsToCurrentTab = categoryArticles.some(a => a.id === activeArticle?.id);
      if (!currentActiveBelongsToCurrentTab) {
        setSelectedArticleId(categoryArticles[0].id);
      }
    }
  }, [selectedCategory, news]);

  // Request real-time analysis
  const handleAnalyzeQuery = async (
    e?: FormEvent,
    overrideTopic?: string,
    overrideDate?: string,
    overrideSource?: Source,
    overrideCategory?: Category
  ) => {
    if (e) e.preventDefault();
    const activeTopic = (overrideTopic || topicQuery).trim();
    if (!activeTopic) return;

    const activeDate = overrideDate !== undefined ? overrideDate : analysisDate;
    const activeSource = overrideSource || customSource;
    const activeCategory = overrideCategory || customCategory;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setDemoBannerMessage(null);

    try {
      const response = await fetch("/api/analyze-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: activeTopic,
          source: activeSource,
          category: activeCategory,
          analysisDate: activeDate || undefined,
        }),
      });

      const result = await response.json();
      if (result.success && result.data) {
        const newStory: NewsArticle = result.data;
        
        // Feed into top of list
        const updatedList = [newStory, ...news];
        setNews(updatedList);
        
        // Save to local custom storage so it persists over refreshes
        const storedCustomNews = localStorage.getItem("custom_news_articles");
        let customNewsArray: NewsArticle[] = [];
        if (storedCustomNews) {
          try {
            customNewsArray = JSON.parse(storedCustomNews);
          } catch (e) {
            customNewsArray = [];
          }
        }
        localStorage.setItem("custom_news_articles", JSON.stringify([newStory, ...customNewsArray]));

        // Select the newly loaded story and focus appropriate Category tab
        setSelectedCategory(newStory.category);
        setSelectedArticleId(newStory.id);
        
        if (!overrideTopic) {
          setTopicQuery("");
        }

        if (result.message) {
          setDemoBannerMessage(result.message);
        }
      } else {
        throw new Error(result.message || "Failed to generate dynamic news insights.");
      }
    } catch (error: any) {
      console.error(error);
      setAnalysisError(error.message || "Network exception. Please retry analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSourceBadgeColor = (source: Source) => {
    switch (source) {
      case "The Hindu":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "The Indian Express":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Times of India":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Reuters":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "BBC World News":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-slate-500/15 text-slate-300 border-slate-500/20";
    }
  };

  return (
    <div className={`h-full min-h-screen flex flex-col bg-[#0A0A0B] text-slate-200 overflow-x-hidden font-sans ${isComfortMode ? "selection:bg-amber-900/50" : "selection:bg-rose-600/30"}`}>
      
      {/* Dynamic Demo Notification */}
      {demoBannerMessage && (
        <div className="bg-gradient-to-r from-amber-600/20 to-rose-600/20 border-b border-amber-500/30 py-2.5 px-6 text-center text-xs text-amber-300 flex items-center justify-center gap-2 animate-fade-in" id="demo-banner">
          <Sparkles size={14} className="text-amber-400 animate-spin" />
          <span>{demoBannerMessage}</span>
          <button 
            onClick={() => setDemoBannerMessage(null)} 
            className="ml-3 font-mono font-bold hover:text-white px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Header Section */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-white/10 bg-[#0F0F12] shrink-0 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => {
            setSelectedCategory("India Focus");
            setSelectedArticleId(null);
          }}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-[1.5px] shadow-md shadow-orange-950/20">
              <div className="w-full h-full rounded-[6px] bg-[#0F0F12] flex items-center justify-center font-black text-[11px] tracking-tighter">
                <span className="text-[#FF9933]">G</span>
                <span className="text-white">B</span>
                <span className="text-[#138808]">I</span>
              </div>
            </div>
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight uppercase font-sans flex items-center gap-1.5 select-none">
              <span className="text-[#FF9933] drop-shadow-sm">Global</span>
              <span className="text-white drop-shadow-sm">Bharat</span>
              <span className="text-[#138808] text-[10px] sm:text-xs tracking-widest px-1.5 py-0.5 bg-[#138808]/10 border border-[#138808]/20 rounded font-mono font-semibold shadow-sm ml-0.5">Insights</span>
            </span>
          </div>

          {/* Core Categories Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 text-sm font-medium h-16 items-center">
            {(["India Focus", "Global Affairs", "Geopolitics"] as Category[]).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 h-full relative transition-all duration-300 ${
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                  id={`tab-${cat.replace(" ", "-").toLowerCase()}`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-500 to-amber-500"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Header Controls */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1.5 text-[10px] tracking-wider font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 uppercase font-mono tracking-widest text-[9px]">Live Data Stream</span>
          </div>

          {/* Reading Comfort Mode Toggle */}
          <button 
            onClick={() => setIsComfortMode(!isComfortMode)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              isComfortMode 
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400" 
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
            }`}
            title="Toggle Warm Reading Glow"
            id="comfort-mode-toggle"
          >
            <BookOpen size={14} />
            <span className="hidden xs:inline">{isComfortMode ? "Warm Glow" : "Dark Minimal"}</span>
          </button>
        </div>
      </header>

      {/* Scroll Progress Bar */}
      <div className="sticky top-16 left-0 right-0 h-[3px] bg-white/5 z-50 pointer-events-none shrink-0 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500" 
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>

      {/* Main Layout containing content + asymmetric layout */}
      <div className={`flex flex-1 overflow-hidden transition-all duration-300 ${isComfortMode ? "bg-[#0E0B09]" : "bg-[#0A0A0B]"}`}>
        
        {/* Left Side: Mobile Tab Toggle & Main Story Column */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Main Focused Analysis Panel (70%) */}
          <section onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 border-r border-white/10 relative scrollbar-thin">
            
            {/* Small Categories Header for Mobile viewport */}
            <div className="md:hidden flex p-1 bg-white/5 rounded-lg border border-white/10 mb-4 relative overflow-hidden shrink-0">
              {(["India Focus", "Global Affairs", "Geopolitics"] as Category[]).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all relative z-10 outline-none"
                  >
                    <span className={isActive ? "text-white font-bold transition-colors duration-200" : "text-slate-400 hover:text-slate-200"}>
                      {cat}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderlineMobile"
                        className="absolute inset-0 bg-rose-600 rounded-md z-[-1] shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Smart News Analyzer Generator Panel */}
            <div id="custom-modeling-card" className="bg-gradient-to-r from-rose-950/20 to-amber-950/20 border border-white/10 rounded-xl p-5 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                <div className="text-left">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                    <Sparkles className="text-rose-500 animate-pulse" size={16} />
                    Run Custom News Analytical Modeling
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span>Input any core market, technical, political or climatological topic to parse real-time insights or simulated projections.</span>
                    {analysisDate && (
                      <span className="text-[#FF9933] font-mono bg-[#FF9933]/10 border border-[#FF9933]/25 rounded px-1.5 py-0.5 text-[10px] inline-flex items-center gap-1 animate-pulse">
                        <Calendar size={10} /> Modeled Date: {new Date(analysisDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <form onSubmit={handleAnalyzeQuery} className="space-y-3.5">
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={topicQuery}
                      onChange={(e) => setTopicQuery(e.target.value)}
                      placeholder="e.g., India-Australia lithium alliances, global cargo container rates, agricultural wheat buffers..."
                      className="w-full bg-[#141418] border border-white/15 focus:border-[#FF9933] rounded-lg py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 outline-none transition-all"
                      id="news-analyzer-input"
                    />
                    <Search className="absolute left-3.5 top-3 text-slate-500" size={15} />
                    {topicQuery && (
                      <button
                        type="button"
                        onClick={() => setTopicQuery("")}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition-colors"
                        title="Clear search topic"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 bg-[#141418] border border-white/15 hover:border-slate-500 rounded-lg px-2.5 py-1.5 text-slate-300 transition-all font-mono" title="Choose custom date for analysis (Optional)">
                      <Calendar size={13} className="text-[#FF9933] shrink-0" />
                      <input
                        type="date"
                        value={analysisDate}
                        onChange={(e) => setAnalysisDate(e.target.value)}
                        className="bg-transparent text-xs text-slate-300 border-none outline-none focus:ring-0 leading-none cursor-pointer p-0 w-[110px]"
                        max={new Date().toISOString().split("T")[0]}
                        id="analysis-date-picker"
                      />
                      {analysisDate && (
                        <button
                          type="button"
                          onClick={() => setAnalysisDate("")}
                          className="text-slate-400 hover:text-rose-400 font-mono font-bold hover:scale-105 active:scale-95 text-xs px-0.5"
                          title="Reset to current time"
                        >
                          ×
                        </button>
                      )}
                    </div>

                    <select
                      value={customSource}
                      onChange={(e) => setCustomSource(e.target.value as Source)}
                      className="bg-[#141418] border border-white/15 text-xs text-slate-300 rounded-lg px-2.5 py-2 hover:border-slate-500 outline-none cursor-pointer"
                    >
                      <option value="The Hindu">The Hindu</option>
                      <option value="The Indian Express">The Indian Express</option>
                      <option value="Times of India">Times of India</option>
                      <option value="Reuters">Reuters</option>
                      <option value="BBC World News">BBC World; Global</option>
                    </select>

                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value as Category)}
                      className="bg-[#141418] border border-white/15 text-xs text-slate-300 rounded-lg px-2.5 py-2 hover:border-slate-500 outline-none cursor-pointer"
                    >
                      <option value="India Focus">India Focus</option>
                      <option value="Global Affairs">Global Affairs</option>
                      <option value="Geopolitics">Geopolitics</option>
                    </select>

                    <button
                      type="submit"
                      disabled={isAnalyzing || !topicQuery.trim()}
                      className="bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800/50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-rose-600/10 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                      id="trigger-analysis-btn"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>Parsing...</span>
                        </>
                      ) : (
                        <>
                          <Compass size={13} />
                          <span>Analyze</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instant Tomorrow's Prediction Feeds */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] sm:text-[11px] uppercase font-mono font-bold text-slate-500 tracking-wider">Tomorrow's Forecasts:</span>
                  {[
                    "Tomorrow's Semiconductor Outlook",
                    "Tomorrow's RBI Food Inflation Target",
                    "Tomorrow's Maritime Patrol Accords"
                  ].map((quickTopic) => (
                    <button
                      key={quickTopic}
                      type="button"
                      onClick={() => {
                        setTopicQuery(quickTopic);
                        // Also auto-select matching category to make the flow beautiful
                        if (quickTopic.includes("Semiconductor")) {
                          setCustomCategory("India Focus");
                        } else if (quickTopic.includes("RBI")) {
                          setCustomCategory("India Focus");
                        } else if (quickTopic.includes("Maritime")) {
                          setCustomCategory("Geopolitics");
                        }
                      }}
                      className="text-[10px] font-medium bg-white/[0.04] hover:bg-[#FF9933]/15 hover:text-[#FF9933] text-slate-400 px-2.5 py-1 rounded-full border border-white/5 hover:border-[#FF9933]/35 active:scale-95 transition-all duration-200"
                    >
                      🔮 {quickTopic}
                    </button>
                  ))}
                </div>

                {analysisError && (
                  <p className="text-xs text-rose-400 font-mono mt-1 text-left">
                    ⚠️ {analysisError}
                  </p>
                )}
              </form>
            </div>

            {/* Focused Active Article Output Grid */}
            <AnimatePresence mode="wait">
              {isTabChanging || isAnalyzing ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ArticleSkeleton />
                </motion.div>
              ) : activeArticle ? (
                <motion.div
                  key={activeArticle.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Article Label Metadata */}
                  <motion.div variants={childVariants} className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 border-b border-white/5 pb-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider border ${getSourceBadgeColor(activeArticle.source)}`}>
                      {activeArticle.source}
                    </span>
                    {OFFICIAL_CHANNELS_URLS[activeArticle.source] && (
                      <a 
                        href={OFFICIAL_CHANNELS_URLS[activeArticle.source]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9.5px] font-mono text-slate-400 bg-white/5 hover:bg-[#FF9933]/15 hover:text-[#FF9933] border border-white/5 hover:border-[#FF9933]/30 rounded-md transition-all shadow-sm"
                        title={`Open official ${activeArticle.source} website`}
                      >
                        <ExternalLink size={10} />
                        Official Site
                      </a>
                    )}
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                    <span className="flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400">
                      <Clock size={12} className="text-rose-500" />
                      {activeArticle.readingTime} min read
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {new Date(activeArticle.publishedTime).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                    {activeArticle.isAIResult && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                        <span className="px-1.5 py-0.5 bg-rose-600/20 text-rose-300 border border-rose-500/20 rounded text-[9px] font-bold font-mono tracking-wider uppercase inline-flex items-center gap-1 animate-pulse">
                          <Sparkles size={9} /> Analyst Model Generated
                        </span>
                      </>
                    )}
                  </motion.div>

                  {/* Dynamic Cover Image with subtle zoom and border glow */}
                  {activeArticle.imageUrl && (
                    <motion.div 
                      variants={childVariants} 
                      className="w-full h-48 sm:h-64 md:h-72 overflow-hidden rounded-xl border border-white/10 relative group bg-neutral-900 shadow-lg"
                    >
                      <img 
                        src={activeArticle.imageUrl} 
                        alt={activeArticle.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 text-[9px] text-slate-400 rounded-md font-mono border border-white/5 uppercase tracking-wider">
                        Live Visual Feed
                      </div>
                    </motion.div>
                  )}
                  
                  {/* High-Impact Headline */}
                  <motion.div variants={childVariants} className="space-y-3.5 text-left">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white leading-tight" id="article-main-title">
                      {activeArticle.title}
                    </h1>
                    <p className={`text-base leading-relaxed ${isComfortMode ? "text-slate-300/90 font-serif" : "text-slate-300"}`} id="article-main-summary">
                      {activeArticle.summary}
                    </p>
                  </motion.div>

                  {/* Component 1: High-Impact Bullet Points (Why It Matters) - Strict Cap < 4 bullets */}
                  <motion.div variants={childVariants} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 sm:p-6 space-y-4 text-left" id="why-it-matters-box">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <TrendingUp size={14} className="text-rose-500" />
                        Why It Matters — Strategic Synthesis
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500">Cap: 4 Core Bullets</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeArticle.whyItMatters.slice(0, 4).map((bullet, index) => (
                        <div key={index} className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                          <span className="text-rose-500 font-mono font-extrabold text-sm select-none">
                            0{index + 1}.
                          </span>
                          <span className="text-xs lg:text-sm text-slate-300 leading-relaxed">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Component 3: Visualizations */}
                  <motion.div key={activeArticle.id} variants={childVariants} className="relative">
                    <NewsVisualization visualization={activeArticle.visualization} />
                  </motion.div>

                  {/* Article Footer Controls */}
                  <motion.div variants={childVariants} className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {activeArticle.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold font-mono bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={(e) => handleShareArticle(activeArticle, e)}
                        className="text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-all duration-200 border flex items-center gap-1.5 bg-white/5 border-white/10 text-slate-300 hover:bg-rose-600/10 hover:border-rose-500/40 hover:text-rose-400"
                        id="share-article-btn"
                      >
                        <Share2 size={13} />
                        Share Analysis
                      </button>

                      <button
                        onClick={() => toggleBookmark(activeArticle.id)}
                        className={`text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-all duration-200 border flex items-center gap-1.5 ${
                          bookmarks.includes(activeArticle.id)
                            ? "bg-rose-600/10 border-rose-500/40 text-rose-400 shadow-sm"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                        }`}
                        id="bookmark-focused-btn"
                      >
                        <Bookmark size={13} className={bookmarks.includes(activeArticle.id) ? "fill-rose-500" : ""} />
                        {bookmarks.includes(activeArticle.id) ? "Bookmarked" : "Bookmark Analysis"}
                      </button>
                    </div>
                  </motion.div>

                </motion.div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500 p-8">
                  <Layers size={36} className="text-slate-600 mb-2.5" />
                  <p className="text-sm font-medium">No Focused Analysis Selected</p>
                  <p className="text-xs max-w-xs mt-1">Select an article from the sidebar feed or run a query to start modeling.</p>
                </div>
              )}
            </AnimatePresence>

            {/* Secondary category articles strip in current tab - SHOWS ONE NEWS AT A TIME IN THE FEED */}
            <div className="pt-10 border-t border-white/5 text-left">
              {(() => {
                const otherArticles = categoryArticles.filter(item => item.id !== activeArticle?.id);
                
                if (otherArticles.length === 0) {
                  return (
                    <div className="p-6 bg-white/[0.01] border border-white/5 rounded-xl text-center text-slate-500">
                      <Layers size={18} className="mx-auto text-slate-600 mb-2" />
                      <p className="text-xs font-semibold">Currently viewing the only available publication in this category.</p>
                      <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1">Use the analytical modeling module at the top to draft more articles.</p>
                    </div>
                  );
                }

                // Protect indexing bounds
                const currentIndex = Math.min(Math.max(0, feedIndex), otherArticles.length - 1);
                const story = otherArticles[currentIndex];
                
                return (
                  <div className="space-y-4">
                    {/* Header with quick info and switcher pagination controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-white/[0.05]">
                      <div className="text-left">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF9933] flex items-center gap-2">
                          <Layers size={14} />
                          Browse Other Category Reports
                        </h3>
                        <p className="text-slate-500 text-[11px] mt-0.5 font-mono">
                          Explore dynamic historic summaries one-by-one
                        </p>
                      </div>

                      {otherArticles.length > 1 && (
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          {/* Slide Navigation Buttons */}
                          <button
                            type="button"
                            onClick={() => setFeedIndex((prev) => (prev - 1 + otherArticles.length) % otherArticles.length)}
                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 flex items-center justify-center transition-all duration-200"
                            title="Previous Publication"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          <span className="text-xs font-mono font-bold text-slate-300 bg-[#FF9933]/10 border border-[#FF9933]/25 px-2.5 py-1 rounded">
                            Report {currentIndex + 1} of {otherArticles.length}
                          </span>

                          <button
                            type="button"
                            onClick={() => setFeedIndex((prev) => (prev + 1) % otherArticles.length)}
                            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 flex items-center justify-center transition-all duration-200"
                            title="Next Publication"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Single feed card layout - responsive 2-column on md/lg, solid single-card focus */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="bg-white/[0.02] border border-white/10 hover:border-[#FF9933]/30 rounded-xl overflow-hidden transition-all duration-300 group shadow-md shadow-black/20 flex flex-col md:flex-row"
                      >
                        {story.imageUrl && (
                          <div className="w-full md:w-2/5 relative overflow-hidden bg-slate-930/60 border-b md:border-b-0 md:border-r border-white/5 shrink-0 select-none">
                            <img 
                              src={story.imageUrl} 
                              alt={story.title} 
                              referrerPolicy="no-referrer"
                              className="w-full h-48 md:h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
                          </div>
                        )}
                        
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${getSourceBadgeColor(story.source)}`}>
                                {story.source}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                <Clock size={11} className="text-slate-600" />
                                {story.readingTime} min read
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-white leading-snug group-hover:text-[#FF9933] transition-colors duration-200">
                              {story.title}
                            </h4>

                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 md:line-clamp-4">
                              {story.summary}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
                            {/* Slide indicators / pagination dots */}
                            <div className="flex items-center gap-1.5 order-2 sm:order-1 select-none flex-wrap">
                              {otherArticles.map((_, dIdx) => (
                                <button
                                  key={dIdx}
                                  type="button"
                                  onClick={() => setFeedIndex(dIdx)}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    currentIndex === dIdx 
                                      ? "w-4.5 bg-[#FF9933]" 
                                      : "w-1.5 bg-slate-700 hover:bg-slate-500"
                                  }`}
                                  title={`Go to report #${dIdx + 1}`}
                                />
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedArticleId(story.id);
                                // Raise customized toast notice
                                setToastMessage(`Focused view updated: "${story.title.substring(0, 35)}..." selected.`);
                                setShowShareToast(true);
                                setTimeout(() => setShowShareToast(false), 3000);

                                // Smooth-scroll up to the main title
                                setTimeout(() => {
                                  document.getElementById("article-main-title")?.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              }}
                              className="w-full sm:w-auto px-4 py-2 bg-[#FF9933]/10 hover:bg-[#FF9933]/20 border border-[#FF9933]/20 hover:border-[#FF9933]/45 text-slate-200 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 group-hover:scale-[1.01] active:scale-[0.99] order-1 sm:order-2"
                            >
                              <span>Unlock & Focus Report</span>
                              <ArrowUpRight size={13} className="text-slate-400 group-hover:text-white" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>

            {/* Bottom Trusted Brands Static Scroller / Metadata alignment */}
            <div className="pt-10 pb-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-widest font-bold text-slate-500 uppercase">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-slate-600 font-mono tracking-wider text-left block">Grounded Daily Sync Hubs:</span>
                <div className="flex flex-wrap gap-4 items-center">
                  <a 
                    href="https://www.reuters.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#FF9933] transition-colors flex items-center gap-1"
                  >
                    REUTERS <ExternalLink size={8} />
                  </a>
                  <a 
                    href="https://www.thehindu.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#FF9933] transition-colors flex items-center gap-1"
                  >
                    THE HINDU <ExternalLink size={8} />
                  </a>
                  <a 
                    href="https://www.bbc.com/news/world" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#FF9933] transition-colors flex items-center gap-1"
                  >
                    BBC WORLD NEWS <ExternalLink size={8} />
                  </a>
                  <a 
                    href="https://indianexpress.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#FF9933] transition-colors flex items-center gap-1"
                  >
                    THE INDIAN EXPRESS <ExternalLink size={8} />
                  </a>
                  <a 
                    href="https://timesofindia.indiatimes.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#FF9933] transition-colors flex items-center gap-1"
                  >
                    TIMES OF INDIA <ExternalLink size={8} />
                  </a>
                </div>
              </div>
              <div className="text-right text-slate-500 font-mono font-medium">
                Analysis Suite V1.2 • 2026 Edition
              </div>
            </div>

          </section>

          {/* Right Sidebar Panel (30% width) - Contextual Timeline & Bookmarks */}
          <aside className="w-full md:w-[320px] lg:w-[360px] bg-[#0F0F12] flex flex-col shrink-0 overflow-y-auto divide-y divide-white/5 scrollbar-thin">
            
            {/* Component 2: Event Timeline Component */}
            <div className="p-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#FF9933] flex items-center gap-1.5">
                  <Calendar size={14} />
                  Contextual Event Timeline
                </h3>
                <span className="px-2 py-0.5 bg-[#FF9933]/10 border border-[#FF9933]/20 rounded text-[9px] font-mono text-[#FF9933] uppercase tracking-wider animate-pulse">
                  Interactive Log
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-5 leading-normal">
                Select any historical milestone below to unlock high-fidelity geostrategic insights, operations metrics, and analysis parameters of that specific date.
              </p>

              {(() => {
                const enrichedEvents = getEnrichedTimeline(activeArticle);
                if (enrichedEvents.length === 0) {
                  return (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      Select a reports article to view its detailed timeline records.
                    </div>
                  );
                }

                const selectedEvt = enrichedEvents[selectedTimelineIndex] || enrichedEvents[0];

                return (
                  <div className="space-y-6">
                    {/* Event Timeline Vertical Rail */}
                    <div className="relative border-l border-white/10 ml-2 space-y-4">
                      {enrichedEvents.map((evt, idx) => {
                        const isSelected = selectedTimelineIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedTimelineIndex(idx)}
                            className="w-full text-left relative pl-5 outline-none block group transition-all"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                          >
                            {/* Bullet point nodes */}
                            <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              isSelected 
                                ? "bg-[#FF9933] shadow-[0_0_8px_rgba(255,153,51,0.8)] scale-110" 
                                : "bg-slate-700/80 group-hover:bg-[#FF9933]/60 group-hover:scale-105"
                            }`} />
                            
                            <div className={`p-2.5 rounded-lg border transition-all duration-300 ${
                              isSelected 
                                ? "bg-[#FF9933]/10 border-[#FF9933]/35 shadow-[inset_0_1px_2px_rgba(255,153,51,0.05)]" 
                                : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5"
                            }`}>
                              <span className={`text-[9px] font-mono font-bold block ${
                                isSelected ? "text-[#FF9933]" : "text-slate-500"
                              }`}>
                                {evt.date}
                              </span>
                              <h4 className={`text-xs font-semibold leading-snug mt-0.5 transition-colors duration-200 ${
                                isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                              }`}>
                                {evt.title}
                              </h4>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Milestone Intelligence Detail Card */}
                    <AnimatePresence mode="wait">
                      {selectedEvt && (
                        <motion.div
                          key={selectedTimelineIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="bg-[#141418] border border-white/10 rounded-xl p-4.5 space-y-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                            <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#FF9933] bg-[#FF9933]/10 px-1.5 py-0.5 rounded border border-[#FF9933]/25">
                              Sovereign Impact Node
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">
                              Data Match #0{selectedTimelineIndex + 1}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 block">{selectedEvt.date}</span>
                            <h5 className="text-xs font-bold text-white leading-snug">{selectedEvt.title}</h5>
                            <p className="text-xs text-slate-400 leading-relaxed pt-1">{selectedEvt.description}</p>
                          </div>

                          {/* Impact Metrics and Progress bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-[10px] font-mono">
                              <span className="text-slate-500">{selectedEvt.keyMetricLabel}</span>
                              <span className="text-[#FF9933] font-bold">{selectedEvt.keyMetricValue}%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-[#FF9933] to-amber-500 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${selectedEvt.keyMetricValue}%` }}
                              />
                            </div>
                          </div>

                          {/* Active Stakeholders */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">Stakeholders</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedEvt.stakeholders.map((org, oIdx) => (
                                <span key={oIdx} className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-300 px-1.5 py-0.5 rounded">
                                  {org}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Directive */}
                          <div className="bg-black/15 p-2.5 rounded-lg border border-white/[0.04] space-y-1">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">Security Directive</span>
                            <p className="text-[11px] text-slate-300 leading-relaxed italic">{selectedEvt.actionMeasures}</p>
                          </div>

                          {/* Expert Quotation analysis */}
                          <div className="space-y-1 text-left">
                            <span className="text-[9px] font-mono uppercase tracking-wider text-rose-500 font-bold block">Geopolitical Briefing</span>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{selectedEvt.expertAnalysis}</p>
                          </div>

                          {/* Interactive Trigger Button to analyze this event specifically */}
                          <button
                            type="button"
                            onClick={() => {
                              if (!activeArticle) return;
                              const targetYyyyMmDd = convertToInputDate(selectedEvt.date);
                              
                              // Create highly focused event topic
                              const cleanBaseTopic = extractBaseTopic(activeArticle.title);
                              const eventFocusedTopic = `${selectedEvt.title}: ${cleanBaseTopic}`;
                              
                              // Align UI settings to match the modeled data
                              setAnalysisDate(targetYyyyMmDd);
                              setTopicQuery(eventFocusedTopic);
                              setCustomSource(activeArticle.source);
                              setCustomCategory(activeArticle.category);
                              
                              // Trigger UI scroll
                              setTimeout(() => {
                                document.getElementById("custom-modeling-card")?.scrollIntoView({ behavior: "smooth" });
                              }, 100);

                              // Raise custom toast notice
                              setToastMessage(`Initiating deep modeling for event: "${selectedEvt.title}" on ${selectedEvt.date}...`);
                              setShowShareToast(true);
                              setTimeout(() => setShowShareToast(false), 4500);

                              // Fire active analysis request immediately
                              handleAnalyzeQuery(
                                undefined,
                                eventFocusedTopic,
                                targetYyyyMmDd,
                                activeArticle.source,
                                activeArticle.category
                              );
                            }}
                            className="w-full text-center py-2 bg-gradient-to-r from-[#FF9933] to-amber-600 hover:from-[#FF9911] hover:to-amber-500 text-black text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Sparkles size={11} className="text-black" />
                            Model News For This Date
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}
            </div>

            {/* Read Later Bookmarked Items Sidebar Compartment */}
            <div className="p-6 text-left bg-black/15">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Bookmark size={13} className="text-rose-500" />
                  Read Later Bookmarks ({bookmarks.length})
                </h3>
                {bookmarks.length > 0 && (
                  <button
                    onClick={clearAllBookmarks}
                    className="text-[9px] font-mono tracking-wider text-slate-500 hover:text-rose-400 flex items-center gap-0.5 bg-white/5 px-2 py-1 rounded"
                    title="Clear All Bookmarks"
                  >
                    <Trash2 size={10} /> Clear
                  </button>
                )}
              </div>

              {bookmarks.length > 0 ? (
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1" id="bookmarks-scroller">
                  {bookmarks.map((bId) => {
                    const savedArticle = news.find((item) => item.id === bId);
                    if (!savedArticle) return null;
                    return (
                      <div
                        key={savedArticle.id}
                        onClick={() => setSelectedArticleId(savedArticle.id)}
                        className="group flex gap-3 p-2.5 rounded-lg bg-[#141418] border border-white/5 hover:border-rose-500/20 cursor-pointer transition-all hover:translate-x-1"
                      >
                        {savedArticle.imageUrl && (
                          <div className="w-10 h-10 rounded border border-white/10 overflow-hidden shrink-0 self-center bg-slate-950">
                            <img 
                              src={savedArticle.imageUrl} 
                              alt="thumbnail" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[8px] font-mono font-bold tracking-wider text-slate-500 uppercase truncate">
                              {savedArticle.source}
                            </span>
                            <span className="text-[8px] font-mono text-rose-400 shrink-0">
                              {savedArticle.category}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-slate-300 group-hover:text-rose-400 transition-colors line-clamp-2">
                            {savedArticle.title}
                          </p>
                        </div>
                        <button
                          onClick={(e) => toggleBookmark(savedArticle.id, e)}
                          className="text-slate-500 hover:text-rose-400 self-center p-1 hover:bg-white/5 rounded shrink-0"
                          title="Remove Bookmark"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500/85">
                  <Bookmark className="mx-auto text-slate-700/60 mb-2" size={24} />
                  <p className="font-semibold">Your Reading Shelf is Empty</p>
                  <p className="text-[10px] max-w-[200px] mx-auto mt-0.5">
                    Click "Bookmark Analysis" on the active story to save it securely for reference.
                  </p>
                </div>
              )}
            </div>
 
            {/* Twice Daily Automatic Update telemetry card */}
            <div className="p-6 text-left space-y-4 bg-gradient-to-b from-[#111115] to-[#0A0A0C] border-t border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[10px] flex items-center gap-1.5 font-mono">
                  <Clock size={11} className="text-[#FF9933]" />
                  Auto-update (twice daily)
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Active</span>
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-slate-400 font-mono">
                <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-slate-500">Schedule</span>
                  <span className="text-slate-200 text-right">08:30 AM & 07:15 PM</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-slate-500">Zone</span>
                  <span className="text-slate-200">Asia/Kolkata (IST)</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-slate-500">Sources</span>
                  <span className="text-slate-200 truncate max-w-[170px]" title="The Hindu, Reuters, Times of India, Indian Express, BBC">The Hindu, Reuters, BBC, IE</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-slate-500">Last Sync</span>
                  <span className="text-slate-300">
                    {syncStatus?.lastSyncTime ? new Date(syncStatus.lastSyncTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "08:30 AM"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Next Sync</span>
                  <span className="text-[#FF9933] font-bold">
                    {syncStatus?.nextSyncTime ? new Date(syncStatus.nextSyncTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "07:15 PM"}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={triggerManualSync}
                  disabled={isSyncing}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.07] disabled:bg-white/[0.01] text-slate-300 disabled:text-slate-600 border border-white/10 hover:border-white/20 px-3 py-2 rounded-md font-semibold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 size={12} className="animate-spin text-[#FF9933]" />
                      <span>Synchronizing Feeds...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw size={12} className="text-[#FF9933]" />
                      <span>Synchronize Feeds Now</span>
                    </>
                  )}
                </button>
                <p className="text-[9px] text-slate-500/80 font-mono text-center mt-1.5">
                  *Automatically processes feed changes in the background twice daily or instantly on user request.
                </p>
              </div>
            </div>

            {/* Quick Analytics Summary card */}
            <div className="p-6 text-left space-y-3 text-xs bg-[#09090B] border-t border-white/5">
              <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
                <Layers size={11} className="text-amber-500" />
                Active Database Index
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                  <span className="text-[10px] font-semibold text-slate-500 block">Total Reports</span>
                  <span className="text-sm font-bold text-slate-200">{news.length}</span>
                </div>
                <div className="bg-white/[0.02] p-2 rounded border border-white/5">
                  <span className="text-[10px] font-semibold text-slate-500 block">Read Later</span>
                  <span className="text-sm font-bold text-rose-500">{bookmarks.length}</span>
                </div>
              </div>
            </div>

            {/* Patriotic Gallery Section */}
            <div className="p-6 text-left space-y-4 text-xs bg-[#09090B] border-t border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-1.5 font-mono">
                  <Image size={11} className="text-[#FF9933]" />
                  Patriotic Bharat Gallery
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#138808]" />
                </div>
              </div>
              
              {loadingPatrioticImages ? (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-[10px] text-slate-500 font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                  <span>Loading Gallery...</span>
                </div>
              ) : patrioticImages.length > 0 ? (
                <div className="space-y-3.5 pt-1">
                  {/* Big Active Image Display */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group cursor-pointer hover:border-amber-500/30 transition-all duration-300">
                    <img
                      src={patrioticImages[currentPatrioticIndex]?.url}
                      alt={patrioticImages[currentPatrioticIndex]?.name || "Patriotic Slide"}
                      referrerPolicy="no-referrer"
                      onClick={() => setSelectedPatrioticImage(patrioticImages[currentPatrioticIndex].url)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-auto"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1532375811409-905115cd1b58?auto=format&fit=crop&w=400&q=85";
                      }}
                    />
                    
                    {/* Dark gradient base inside image for high-contrast tag overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none flex flex-col justify-end p-3" />
                    
                    {/* Manual Navigation Chevrons inside the image display */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPatrioticIndex((prev) => (prev > 0 ? prev - 1 : patrioticImages.length - 1));
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-[#FF9933] border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 z-10 hover:scale-105 active:scale-95"
                      title="Previous Image"
                    >
                      <ChevronLeft size={14} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPatrioticIndex((prev) => (prev + 1) % patrioticImages.length);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-[#138808] border border-white/10 flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 z-10 hover:scale-105 active:scale-95"
                      title="Next Image"
                    >
                      <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                    
                    {/* Title and Scale Info Overlay inside the image bottom-left */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between pointer-events-none z-10">
                      <p className="text-[11px] font-semibold text-white tracking-wide font-sans truncate drop-shadow-md pr-6">
                        {patrioticImages[currentPatrioticIndex]?.name}
                      </p>
                      <span className="text-[9px] font-mono font-bold text-white/60 bg-black/40 backdrop-blur-[2px] px-1.5 py-0.5 rounded tracking-widest shrink-0">
                        {currentPatrioticIndex + 1}/{patrioticImages.length}
                      </span>
                    </div>

                    {/* Magnify hover hint on top right corner */}
                    <div className="absolute top-2.5 right-2.5 text-white/70 bg-black/40 hover:bg-black/60 p-1.5 rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <Maximize2 size={11} />
                    </div>
                  </div>

                  {/* indicator row of thumbs for easy select */}
                  <div className="grid grid-cols-6 gap-1 pt-0.5">
                    {patrioticImages.map((img, idx) => {
                      const isSelected = idx === currentPatrioticIndex;
                      return (
                        <div
                          key={idx}
                          onClick={() => setCurrentPatrioticIndex(idx)}
                          className={`relative aspect-square rounded-md overflow-hidden bg-slate-900 border cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? "border-amber-500 scale-105 ring-1 ring-amber-500/30" 
                              : "border-white/5 hover:border-white/20 hover:scale-[1.02]"
                          }`}
                          title={`Select ${img.name}`}
                        >
                          <img
                            src={img.url}
                            alt={img.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover select-none"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1532375811409-905115cd1b58?auto=format&fit=crop&w=80&q=85";
                            }}
                          />
                          {/* Inner selected indicator dot */}
                          {isSelected && (
                            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#FF9933] shadow" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-slate-500 text-xs font-mono">
                  No images found.
                </div>
              )}
              <p className="text-[9px] font-mono text-slate-500 leading-normal text-center mt-1">
                Click the image card to expand in high definition.
              </p>
            </div>

            {/* Footer removed from inside sidebar as it is now in the persistent bottom viewport footer row */}

          </aside>

        </main>

      </div>

      {/* Full-width elegant bottom row footer */}
      <footer className="w-full bg-[#0E0E11] border-t border-white/10 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans z-40 shrink-0 select-none shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full border border-white/20 overflow-hidden shrink-0 bg-slate-900 shadow-sm">
            <img 
              src="https://github.com/jkbharti159.png" 
              alt="Jitendra Bharti Avatar" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-mono text-[11px] text-slate-500 leading-none">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/jkbharti159/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 font-semibold hover:text-rose-400 transition-colors inline-flex items-center gap-1 hover:underline decoration-rose-500/30"
            >
              Jitendra Bharti
              <Linkedin size={10} className="text-[#0077b5] shrink-0" />
            </a>{" "}
            &copy; 2026 (copyright)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400 text-[11px] font-mono">
          <a
            href="https://www.linkedin.com/in/jkbharti159/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-all duration-200 inline-flex items-center gap-1.5 font-medium border-b border-transparent hover:border-rose-500/30 pb-0.5"
          >
            <Linkedin size={12} className="text-[#0077b5] shrink-0" />
            <span>LinkedIn Profile</span>
          </a>

          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline" />

          <a
            href="https://jitendra-bharti.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rose-400 transition-all duration-200 inline-flex items-center gap-1.5 font-medium border-b border-transparent hover:border-rose-500/30 pb-0.5"
          >
            <span className="text-amber-500 font-bold shrink-0">⚡</span>
            <span>Portfolio Website</span>
            <ExternalLink size={10} className="opacity-50" />
          </a>

          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:inline" />

          <button
            onClick={() => setShowDevModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-[10px] font-mono font-medium rounded-lg border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300 cursor-pointer shadow-md shadow-rose-950/20 active:scale-95 animate-fade-in"
          >
            <QrCode size={11} className="text-rose-400 shrink-0" />
            <span>Scan QR Code</span>
          </button>
        </div>
      </footer>

      {/* Floating share notification toast */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#141418] border border-emerald-500/30 shadow-[0_10px_35px_-8px_rgba(16,185,129,0.3)] rounded-xl p-4 flex items-start gap-3"
            id="share-notification-toast"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Check size={16} />
            </div>
            <div className="flex-1 min-w-0 text-left font-sans">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Shared Link Copied!</h5>
              <p className="text-xs text-slate-400 mt-1">
                {toastMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developer Profile Informational Modal */}
      <AnimatePresence>
        {showDevModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDevModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-[#141418] to-[#0A0A0C] border border-rose-500/30 rounded-2xl shadow-[0_20px_50px_rgba(244,63,94,0.15)] p-6 overflow-hidden text-center z-10"
              id="dev-profile-modal"
            >
              {/* Floating aesthetic glows */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Dismiss button */}
              <button
                onClick={() => setShowDevModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Profile Avatar & Header */}
              <div className="flex flex-col items-center gap-2 mb-5">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 overflow-hidden shadow-lg border border-white/10 shrink-0">
                  <img
                    src="https://github.com/jkbharti159.png"
                    alt="Jitendra Bharti"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback container directly underneath */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-black tracking-tighter bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500">
                    JB
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Jitendra Bharti</h3>
                  <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-rose-500 mt-0.5">Author & Engineer</p>
                </div>
              </div>

              {/* Developer QR Code container */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 inline-block w-full mb-5 shadow-inner">
                <p className="text-[9px] font-mono text-slate-400 mb-2.5 uppercase tracking-wider">Web Portfolio Website QR Code</p>
                
                <div className="w-36 h-36 mx-auto rounded-lg bg-white p-2.5 shadow-md flex items-center justify-center relative group overflow-hidden">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=0f172a&data=https://jitendra-bharti.vercel.app/"
                    alt="Developer Web Portfolio QR"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="mt-3 inline-flex items-center gap-1.5 text-rose-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Scan to open: jitendra-bharti.vercel.app</span>
                </div>
              </div>

              {/* Connect Profiles list */}
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/in/jkbharti159/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 hover:border-[#0077b5]/50 text-[#0077b5] rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Linkedin size={13} className="fill-[#0077b5]/20 text-[#0077b5]" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink size={11} className="opacity-70 ml-auto" />
                </a>

                <a
                  href="https://jitendra-bharti.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-slate-200 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode size={13} className="text-rose-500/80" />
                  <span>Visit Web Portfolio</span>
                  <ExternalLink size={11} className="opacity-70 ml-auto" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Patriotic Gallery Image Expanded Modal */}
      <AnimatePresence>
        {selectedPatrioticImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 select-none">
            {/* Dark blurred background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatrioticImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Display Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30 }}
              className="relative max-w-4xl w-full max-h-[85vh] z-10 flex flex-col items-center justify-center pointer-events-auto"
            >
              {/* Outer image frame with custom tricolour border glowing shadow */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 p-1.5 border border-white/10 shadow-[0_30px_60px_-15px_rgba(255,153,51,0.25),0_30px_60px_-15px_rgba(19,136,8,0.25)] max-h-[75vh] flex items-center justify-center">
                <img
                  src={selectedPatrioticImage}
                  alt="Expanded Patriotic Bharat"
                  referrerPolicy="no-referrer"
                  className="max-h-[72vh] md:max-h-[70vh] rounded-xl object-contain shadow-2xl transition-all duration-300 pointer-events-auto"
                />

                {/* Nice bottom gradient strip for a professional film frame aesthetic */}
                <div className="absolute bottom-1.5 left-1.5 right-1.5 h-16 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-end justify-center pb-4 px-4 overflow-hidden rounded-b-xl">
                  <p className="text-white font-mono text-[11px] uppercase tracking-widest font-semibold flex items-center gap-2 drop-shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#138808]" />
                    <span>Pride of Bharat</span>
                  </p>
                </div>
              </div>

              {/* Close Button on top right */}
              <button
                onClick={() => setSelectedPatrioticImage(null)}
                className="absolute -top-12 right-0 md:top-4 md:-right-14 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-2 md:p-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-md border border-white/5 active:scale-95"
                title="Close Image Viewer"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
