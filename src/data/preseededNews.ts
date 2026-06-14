/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsArticle } from "../types";

export const PRESEEDED_NEWS: NewsArticle[] = [
  {
    id: "seed-1",
    title: "India's Semi-conductor Corridors: Multi-Billion Dollar Assembly Lines Solidify in Gujarat and Assam",
    source: "The Hindu",
    category: "India Focus",
    whyItMatters: [
      "Secures critical technology hardware supply chains, reducing defense and luxury sector import dependencies.",
      "Positions India as a major regional silicon fabrication hub, challenging East Asian manufacturing duopoly.",
      "Catalyzes high-skill engineering hubs and specialized vocational jobs across secondary and tertiary sectors.",
      "Attracts foreign direct investment (FDI) with central-state infrastructure incentives bridging localized gaps."
    ],
    summary: "India is accelerating its semiconductor manufacturing roadmap with major joint ventures breaking ground in Dholera, Gujarat, and Morigaon, Assam. The initiatives, backed by the Central Government's $10 billion Incentive Scheme, aim to establish India's footprint in advanced microchip packaging, assembly, and test operations. Tech giants and domestic industrial conglomerates are collaborating to resolve past infrastructural issues, ensuring high-purity water grids and ultra-stable electrical feeds required for silicon production. Analysts expect first-phase production yields by late next year, opening a major buffer for domestic automotive and consumer electronics hubs.",
    timeline: [
      {
        date: "3 weeks ago",
        title: "Bilateral Silicon Partnership signed",
        description: "India and Global Foundry consortia ratify capital flow roadmap of $2.4B."
      },
      {
        date: "2 weeks ago",
        title: "Dholera Water Pipeline Completed",
        description: "Dedicated supply lines for ultra-pure industry water pass critical environmental standards."
      },
      {
        date: "1 week ago",
        title: "Assam Tooling Center Initiated",
        description: "Assam state government breaks ground on a semiconductor-focused skill development nursery."
      },
      {
        date: "Yesterday",
        title: "Equipment Delivery Handshake",
        description: "Advanced precision photolithography machinery clears local Customs for installation."
      }
    ],
    visualization: {
      type: "bar",
      title: "Planned Semiconductor FDI Allocation (USD Millions)",
      description: "Distribution of committed infrastructure capital across key technological segments.",
      data: [
        { label: "Fabrication Plants", value: 4500 },
        { label: "Testing & Assembly", value: 2800 },
        { label: "R&D Design Hubs", value: 1200 },
        { label: "Supply Utilities", value: 1500 }
      ]
    },
    readingTime: 4,
    publishedTime: "2026-06-13T06:30:00Z",
    tags: ["Technology", "Economy", "Infrastructure"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "seed-2",
    title: "RBI Repo Rate Stance: Prioritizing Food Inflation Buffers Amid Strong GDP Outgrowth Metrics",
    source: "The Indian Express",
    category: "India Focus",
    whyItMatters: [
      "Preserves retail credit stability, preventing overheating in the urban housing and luxury sectors.",
      "Addresses persistent vegetable and pulse price volatility driven by unseasonal regional macroclimates.",
      "Maintains the foreign exchange reserve cushion, insulating the Rupee from global rate differentials.",
      "Signals continued commitment to steady, structural fiscal consolidation over speculative market easing."
    ],
    summary: "The Reserve Bank of India (RBI) Monetary Policy Committee (MPC) has voted to keep the policy Repo Rate unchanged at 6.50% for the subsequent session. This neutral stance reflects a delicate dance: while structural real GDP growth scales a robust 7.2% trajectory, core consumer price indicators remain sensitive to volatile food crop yields. The Central Bank highlighted that while industrial indices show healthy domestic demand, early monsoon erraticism demands retail caution. The decision prevents sudden capital flights while allowing commercial banks to run balanced credit-to-deposit expansions.",
    timeline: [
      {
        date: "4 weeks ago",
        title: "Retail Food Inflation spikes",
        description: "Pulses and onion prices experience a brief 8.4% supply-shock spike due to transport delays."
      },
      {
        date: "2 weeks ago",
        title: "Industrial Output Data Released",
        description: "Manufacturing Index records solid 5.6% year-on-year growth, reducing ease pressures."
      },
      {
        date: "3 days ago",
        title: "MPC Convening begins",
        description: "Six-member committee debates core policy buffers, opting for inflation containment."
      },
      {
        date: "Today",
        title: "Stance Announced",
        description: "Governor Shaktikanta Das ratifies Repo Rate static hold, keeping financial yields intact."
      }
    ],
    visualization: {
      type: "line",
      title: "India Core Consumer Price Index vs Policy Repo Rate (%)",
      description: "How policy rates have moved relative to primary core inflation benchmarks over past quarters.",
      data: [
        { label: "Q3 - Prev Year", value: 6.2 },
        { label: "Q4 - Prev Year", value: 5.8 },
        { label: "Q1 - Current", value: 5.0 },
        { label: "Q2 - Current", value: 4.8 },
        { label: "Current Policy", value: 6.5 }
      ]
    },
    readingTime: 3,
    publishedTime: "2026-06-13T04:15:00Z",
    tags: ["Finance", "Economy", "Policy"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "seed-3",
    title: "Gangetic Plains Climate Pivot: Farmers Adopt Smart Short-Duration Rice Seed Varietals",
    source: "Times of India",
    category: "India Focus",
    whyItMatters: [
      "Reduces water intake needs by 25%, conserving critical aquifer reserves in northern India.",
      "Shortens crop cycles, enabling clean sowing of wheat without resorting to residual stubble burning.",
      "Guarantees minimum yield safety against sudden late-season dry spells or sudden heavy downpours.",
      "Boosts average farm incomes through lower inputs and improved sub-surface root resilience."
    ],
    summary: "Amid shifting monsoon cycles and rising summer temperatures, agricultural regions across Uttar Pradesh, Bihar, and Punjab are undergoing a massive grass-roots transition. Cooperative bodies have scaled the distribution of climate-resilient, short-duration rice seeds, such as the Pusa-1509 and Pusa-2090. These strains mature 20 to 30 days earlier than traditional varieties, meaning they require fewer irrigation cycles. The accelerated harvesting cycle is proving to be a game-changer for regional air quality: farmers can now cleanly harvest crops and prepare fields with seed-drill machines, almost entirely bypassing the contentious stubble stub burning window.",
    timeline: [
      {
        date: "6 weeks ago",
        title: "Monsoon Erraticism Forecast",
        description: "IMD predicts localized rainfall shifts with temporary dry spells across middle basins."
      },
      {
        date: "4 weeks ago",
        title: "Cooperative Seed Distribution Campaign",
        description: "Over 400 specialized grain-bank distribution cells are activated across rural blocks."
      },
      {
        date: "2 weeks ago",
        title: "Acreage Data Logged",
        description: "Satellite analytics indicate early climate-smart rice adoption exceeds 42% threshold."
      },
      {
        date: "This Morning",
        title: "Water Conservation Audit",
        description: "Micro-tubewell consumption drops are recorded positively by Central Ground Water Board."
      }
    ],
    visualization: {
      type: "donut",
      title: "Acreage Rice Cultivation by Seed Variety (%)",
      description: "Vast market share reallocation from old long-duration seeds to modern smart hybrids.",
      data: [
        { label: "Smart Hybrids (Pusa-2090)", value: 45 },
        { label: "Traditional Varieties", value: 35 },
        { label: "Basmati Strains", value: 15 },
        { label: "Direct Sown Rice (DSR)", value: 5 }
      ]
    },
    readingTime: 5,
    publishedTime: "2026-06-12T08:00:00Z",
    tags: ["Agriculture", "Climate", "Technology"],
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "seed-4",
    title: "Global Microchip Cartography: US and Europe Enact Advanced Guardrail Subsidies",
    source: "Reuters",
    category: "Global Affairs",
    whyItMatters: [
      "Spurs regional chip independence, mitigating geographic chokepoints in East Asian straits.",
      "Drains global tech talent pools into concentrated Western mega-facilities in Arizona and Saxony.",
      "Increases deep high-tech capital expenditures, causing transient equipment price hikes.",
      "Forces diplomatic recalibrations across third-party consumer manufacturing economies."
    ],
    summary: "In a bid to safeguard high-tech autonomy, Western trade authorities are doubling down on localized wafer fabrication. The European Chips Act and the US CHIPS and Science Act are channeling over $80 billion in state subsidies to global semiconductor majors. The objective is to build cutting-edge physical nodes sub-5nm on sovereign soil. While construction on new assembly hubs is progressing in Arizona, Ohio, and Dresden, major supply challenges have emerged—ranging from domestic skilled operator deficits to long procurement lead times for EUV lithography lasers. This macro-shift is reorganizing the complex geostrategic roadmap of tech manufacturing.",
    timeline: [
      {
        date: "5 weeks ago",
        title: "EU Subsidy Allocation Ratified",
        description: "Saxony assembly hubs secure first $8.5B in structural state assistance grants."
      },
      {
        date: "3 weeks ago",
        title: "Intel/TSMC Talent Mobility Accords",
        description: "Global universities initiate fast-tracked wafer engineering curriculums."
      },
      {
        date: "1 week ago",
        title: "Cleanroom Construction milestones",
        description: "Arizona Fab 12 achieves advanced environmental pressure sealing validation."
      },
      {
        date: "Yesterday",
        title: "Supply Chain Warning Issued",
        description: "Specialized gas providers signal localized neon and helium supply tightening."
      }
    ],
    visualization: {
      type: "gauge",
      title: "Regional Share of Advanced Fabrication Nodes (%)",
      description: "Projected global share of sub-7nm foundry capacities by the end of 2028.",
      data: [
        { label: "East Asia (TSMC/Samsung)", value: 65 },
        { label: "Europe (Saxony Hubs)", value: 12 },
        { label: "North America (US fabs)", value: 18 },
        { label: "Rest of World", value: 5 }
      ]
    },
    readingTime: 4,
    publishedTime: "2026-06-13T02:00:00Z",
    tags: ["Technology", "Geopolitics", "Trade"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "seed-5",
    title: "Central Banks Synchronized Dilemma: Inflation Drift Meets High Public Debt Service Costs",
    source: "BBC World News",
    category: "Global Affairs",
    whyItMatters: [
      "Squeezes government budgets, forcing hard choices between social welfare and sovereign interest feeds.",
      "Creates volatile currency market swings as Western rate actions deviate from developing spaces.",
      "Suppresses long-term capital investments, raising borrowing costs for medium enterprises.",
      "Elevates banking liquidity risks under massive government-bound bond valuations."
    ],
    summary: "Major central banking institutions—including the Federal Reserve, the ECB, and the Bank of England—are navigating a highly volatile monetary plateau. While headline consumer inflation indices show slow normalization, sticky wage demands and energy transition bottlenecks prevent quick interest rate cuts. Simultaneously, global public debt-to-GDP levels remain near record highs, forcing treasury offices to expend a staggering portion of tax revenues simply servicing outstanding bonds. Economists warn that locking borrowing costs at elevated baselines for too long could trigger stagflationary bottlenecks, reducing national fiscal flexibility across G7 economies.",
    timeline: [
      {
        date: "4 weeks ago",
        title: "IMF Public Debt Warning",
        description: "International Monetary Fund warns global public debt levels are pressing past $98 Trillion."
      },
      {
        date: "2 weeks ago",
        title: "ECB Rate Hold announced",
        description: "European Central Bank opts for static status, expressing wage growth persistence caution."
      },
      {
        date: "5 days ago",
        title: "US Treasury auction yields rise",
        description: "High-volume 10-year Treasury note auctions settle at elevated rates, indicating premium demands."
      },
      {
        date: "Today",
        title: "Macro-Policy Panel Convenes",
        description: "Central bank chairs acknowledge tightening limits, requesting fiscal support."
      }
    ],
    visualization: {
      type: "radar",
      title: "Sovereign Debt-to-GDP vs Debt Service Stress Metric",
      description: "Comparative stress levels mapping absolute debt size versus the cost of interest payments.",
      data: [
        { label: "United States", value: 85 },
        { label: "Japan", value: 95 },
        { label: "Eurozone", value: 65 },
        { label: "Developing Nations", value: 50 },
        { label: "Emerging Markets", value: 40 }
      ]
    },
    readingTime: 5,
    publishedTime: "2026-06-12T11:45:00Z",
    tags: ["Finance", "Economy", "Sovereign"],
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "seed-6",
    title: "Maritime Corridors: Tri-Lateral Maritime Security Accords Solidified in the Indian Ocean Rim",
    source: "The Hindu",
    category: "Geopolitics",
    whyItMatters: [
      "Secures oil and dry-bulk shipping lanes navigating the Malacca Strait and Bab el-Mandeb bottlenecks.",
      "Aggregates real-time transponder data feed arrays, suppressing commercial piracy and smuggling routes.",
      "Fosters integrated maritime domain intelligence sharing, bypassing slow bilateral approvals.",
      "Ensures freedom of movement for deep under-sea telecommunication fiber arrays crossing the floor."
    ],
    summary: "Amid rising security concerns across key global trade chokepoints, India, Sri Lanka, and the Maldives have formalized their latest Maritime Security framework, establishing integrated coordination centers along major shipping lines. The accords, ratified under the Colombo Security Conclave umbrella, establish standardized rules for joint deep-sea patrol runs, high-volume search and rescue practices, and instant telemetry sharing. This institutionalized link is designed to safeguard the absolute integrity of crucial trade corridors—through which over 70% of global resource shipments travel daily.",
    timeline: [
      {
        date: "5 weeks ago",
        title: "Chokepoint Piracy incident",
        description: "Dual commercial cargo freighters foil boarding attempts with rapid escort support."
      },
      {
        date: "3 weeks ago",
        title: "Security Convoy Talks begin",
        description: "Delegations draft operational protocols for shared naval communications."
      },
      {
        date: "1 week ago",
        title: "Shared Telemetry Base activated",
        description: "Real-time satellite and radar transponder integration centers are booted."
      },
      {
        date: "Today",
        title: "Tri-Lateral Sign-Off",
        description: "Joint maritime defense accord is executed by regional military representatives."
      }
    ],
    visualization: {
      type: "line",
      title: "Weekly Shipping Transit Volume (Million Tons)",
      description: "Stability of maritime trade volume traversing regional deep-water channels over last quarters.",
      data: [
        { label: "July", value: 52 },
        { label: "October", value: 54 },
        { label: "January", value: 48 },
        { label: "April", value: 55 },
        { label: "May", value: 56 }
      ]
    },
    readingTime: 4,
    publishedTime: "2026-06-12T09:20:00Z",
    tags: ["Geopolitics", "Defense", "Trade"],
    imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "seed-7",
    title: "Critical Mineral Pathways: Central Asian Routes Gain Multi-Lateral Infrastructure Backing",
    source: "Reuters",
    category: "Geopolitics",
    whyItMatters: [
      "Circumvents maritime chokepoints by developing reliable overland transit trade routes.",
      "Secures lithium, cobalt, and rare-earth element pipelines vital for battery gigafactories.",
      "Diversifies Central Asian economic portfolios away from traditional reliance on regional hegemony.",
      "Promotes inter-continental high-volume rail networks linking Western markets with Asian producers."
    ],
    summary: "As industrial nations compete for raw inputs to fuel their green energy transitions, landlocked Central Asian states are emerging as crucial geopolitical axes. A consortium of Eurasian and multi-national development banks has pledged $6.2 billion to modernize freight rail networks and custom facilities spanning Uzbekistan, Kazakhstan, and Kyrgyzstan. Dubbed the 'Trans-Eurasian Mineral Corridor,' this massive infrastructure project aims to resolve long-standing transit delays. By reducing Customs bottlenecks and standardizing rail-gauge transition links, the corridor will provide an uninterrupted overland delivery pipeline for critical technological materials, bypassing traditional supply risks.",
    timeline: [
      {
        date: "8 weeks ago",
        title: "Mineral Deposit Survey completed",
        description: "High-grade lithium reserves mapped across eastern valleys show immense potential."
      },
      {
        date: "5 weeks ago",
        title: "Consortium Funding Round concluded",
        description: "Multilateral development banks confirm green-transit infrastructure bonds."
      },
      {
        date: "2 weeks ago",
        title: "Freight Rail Trial run",
        description: "First experimental container train completes route transit 4 days ahead of schedule."
      },
      {
        date: "Yesterday",
        title: "Customs Alignment Signed",
        description: "Three nations formally adopt digitized fast-track custom stamps for transit minerals."
      }
    ],
    visualization: {
      type: "bar",
      title: "Projected Critical Mineral Supply Capacity (Tons/Year)",
      description: "Expected annual export capacities for critical manufacturing components post-completion.",
      data: [
        { label: "Lithium Carbonate", value: 18000 },
        { label: "Refined Cobalt", value: 6500 },
        { label: "Rare Earth Oxides", value: 12000 },
        { label: "High-Purity Silicon", value: 45000 }
      ]
    },
    readingTime: 4,
    publishedTime: "2026-06-11T14:30:00Z",
    tags: ["Geopolitics", "Resources", "Infrastructure"],
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85"
  }
];
