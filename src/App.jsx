import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend, ScatterChart, Scatter, ReferenceLine
} from "recharts";

const analysts = [
  {
    id: 1, name: "Rohan Mehta", niche: "Tech & Startups", avatar: "RM", color: "#00c896",
    followers: "12.4K", rating: 4.8, joined: "2022", tags: ["IPO", "SaaS", "Growth"],
    sector: "Computer Services", description: "Ex-Goldman analyst. Covers emerging Indian tech, pre-IPO bets, and SaaS multiples.",
    longBio: "Rohan spent 6 years at Goldman Sachs before going independent. He specializes in identifying high-growth tech companies before they hit mainstream radar. His IPO call accuracy stands at 74% over the last 3 years.",
    cdiScore: 80, cdiLabel: "Stable Growth Prospects",
    cdiDesc: "Portfolio picks show stable financial performance and strategic partnerships. Negligible debt levels contribute to overall stability despite minor net income fluctuations.",
    tellFriend: "This analyst shows stable growth picks with a solid research foundation and relatively low risk appetite.",
    riskWarning: "Potential risks associated with net income fluctuations and dependence on strategic partnerships.",
    marketSnap: { "Mkt Cap": "₹400B", "P/E": "70–75×", "Fwd P/E": "50–55×", "P/B": "10–12×", "P/S": "8–10×", "ROE": "18–20%", "ROCE": "20–22%", "Debt/Eq": "0.1–0.2×", "Dividend": "0.5–0.7%" },
    stats: [{ label: "Accuracy", value: "74%" }, { label: "Calls", value: "138" }, { label: "Avg Rtn", value: "+22%" }],
    recentCalls: [
      { company: "Zepto", action: "BUY", note: "Quick commerce moat deepening" },
      { company: "Ola Electric", action: "HOLD", note: "Wait for Q2 margin data" },
      { company: "Zomato", action: "BUY", note: "Blinkit driving re-rating" },
    ],
    bull: [
      { title: "Debt Reduction", desc: "Covered companies reduced debt from 95.98 to near zero, improving financial flexibility." },
      { title: "Investor Engagement", desc: "Proactive stakeholder communication via recent investor meets and earnings calls." },
      { title: "Revenue Growth", desc: "Consistent 18% revenue CAGR across top picks over 3 years." },
    ],
    bear: [
      { title: "Net Income Volatility", desc: "Swings in net income raise concerns about profitability consistency." },
      { title: "Regulatory Exposure", desc: "Several covered companies face ongoing regulatory scrutiny and CCI investigations." },
      { title: "Negative Cash Flow", desc: "Multiple picks show negative free cash flow, limiting growth reinvestment." },
    ],
    financialPerf: [
      { year: "2020", revenue: 3100, netIncome: 420 }, { year: "2021", revenue: 3400, netIncome: 440 },
      { year: "2022", revenue: 3800, netIncome: 560 }, { year: "2023", revenue: 4414, netIncome: 624 },
      { year: "2024", revenue: 5117, netIncome: 679 }, { year: "2025", revenue: 5168, netIncome: 677 },
    ],
    cashFlow: [
      { year: "2020", fcf: 180, ocf: 310 }, { year: "2021", fcf: -20, ocf: 50 },
      { year: "2022", fcf: 420, ocf: 680 }, { year: "2023", fcf: 510, ocf: 790 },
      { year: "2024", fcf: 470, ocf: 720 }, { year: "2025", fcf: 600, ocf: 850 },
    ],
    netIncomeTrend: [
      { year: "2021", value: 440 }, { year: "2022", value: 560 }, { year: "2023", value: 624 },
      { year: "2024", value: 679 }, { year: "2025", value: 677 },
    ],
    epsGrowth: [
      { year: "2020", eps: 6.2 }, { year: "2021", eps: 5.9 }, { year: "2022", eps: 10.77 },
      { year: "2023", eps: 15.37 }, { year: "2024", eps: 16.72 }, { year: "2025", eps: 16.66 },
    ],
    assetsDebt: [
      { year: "2022", assets: 3200, debt: 320 }, { year: "2023", assets: 3900, debt: 280 },
      { year: "2024", assets: 4600, debt: 210 }, { year: "2025", assets: 5200, debt: 160 },
    ],
    income: [
      { label: "Revenue", "2025": "5,168.45", "2024": "5,117.2", "2023": "4,414.18", "2022": "3,529.57" },
      { label: "Gross Profit", "2025": "4,255.25", "2024": "4,221.87", "2023": "3,731.7", "2022": "2,836.07" },
      { label: "Operating Income", "2025": "815.24", "2024": "841.63", "2023": "728.18", "2022": "560.32" },
      { label: "Net Income", "2025": "676.95", "2024": "679.37", "2023": "624.03", "2022": "436.97" },
      { label: "Total Revenue", "2025": "5,168.45", "2024": "5,117.2", "2023": "4,414.18", "2022": "3,529.57" },
      { label: "Diluted Net Income", "2025": "676.95", "2024": "679.37", "2023": "624.03", "2022": "436.97" },
      { label: "SG&A Expenses", "2025": "480.2", "2024": "462.1", "2023": "390.5", "2022": "310.2" },
      { label: "Cost of Revenue", "2025": "913.2", "2024": "895.33", "2023": "682.48", "2022": "693.5" },
    ],
    peers: [
      { name: "Wipro", pb: 3.39, roe: 17.04, debtEq: 10.4, netMgn: 14.33, divYield: 3.54 },
      { name: "Info Edge", pb: 2.53, roe: 18.77, debtEq: 0.66, netMgn: 157.48, divYield: 0.44 },
      { name: "Eternal", pb: 8.52, roe: -2.66, debtEq: 5.46, netMgn: -4.67, divYield: 0 },
      { name: "Firstsource", pb: 5.89, roe: 15.44, debtEq: 28.04, netMgn: 8.04, divYield: 1.14 },
      { name: "eClerx", pb: 9.75, roe: 25.36, debtEq: 13.36, netMgn: 17.71, divYield: 0.02 },
    ],
    peerScatter: [
      { name: "Indegene", roe: 28, debtEq: 2 }, { name: "Urban Co", roe: 0, debtEq: 5 },
      { name: "BLS Intl", roe: 7, debtEq: 7 }, { name: "Delhivery", roe: -8, debtEq: 12 },
      { name: "Sagility", roe: 0, debtEq: 11 },
    ],
    shareholding: [
      { quarter: "Mar 25", promoter: 54, fii: 7, mf: 5, other: 34 },
      { quarter: "Jun 25", promoter: 54, fii: 6, mf: 7, other: 33 },
      { quarter: "Sep 25", promoter: 53, fii: 6, mf: 7, other: 34 },
      { quarter: "Dec 25", promoter: 53, fii: 6, mf: 9, other: 32 },
    ],
    announcements: [
      { title: "Analyst / Investor Meet — Non-deal roadshow Singapore", date: "4 Mar", desc: "Non-deal roadshow in Singapore on March 11–12, 2026; investor meetings; presentation online." },
      { title: "Press Release — Tech Partnership with WITTENSTEIN", date: "2 Mar", desc: "Partners with WITTENSTEIN to integrate SAFE RTOS into SDV software stack, announced March 2, 2026." },
      { title: "Allotment of ESOP / ESPS", date: "28 Feb", desc: "Allotment of 177622 equity shares under Long Term Incentive Scheme 2022." },
      { title: "Analyst / Investor Meet — Outcome", date: "27 Feb", desc: "Investor meetings on Feb 27, 2026 with multiple mutual funds; no UPSI shared." },
    ],
  },
  {
    id: 2, name: "Ananya Iyer", niche: "FMCG & Consumer", avatar: "AI", color: "#7c6af7",
    followers: "8.1K", rating: 4.6, joined: "2021", tags: ["FMCG", "Rural", "D2C"],
    sector: "Consumer Goods", description: "Deep dives into consumer staples, rural demand cycles, and D2C brand disruption.",
    longBio: "Ananya tracks consumer spending patterns across India's tier-2 and tier-3 cities. Her rural demand thesis predicted the FMCG rally 6 months early. Ground-up research lens on every report.",
    cdiScore: 65, cdiLabel: "Steady Consumer Play",
    cdiDesc: "Strong brand moat and rural penetration driving moderate upside. Watch commodity cost headwinds and urban premium slowdown.",
    tellFriend: "Solid consumer picks with rural tailwinds — good for patient long-term investors.",
    riskWarning: "Commodity inflation and rural income slowdowns pose near-term risk to margins.",
    marketSnap: { "Mkt Cap": "₹280B", "P/E": "45–50×", "Fwd P/E": "38–42×", "P/B": "6–8×", "P/S": "4–5×", "ROE": "20–24%", "ROCE": "22–26%", "Debt/Eq": "0.05×", "Dividend": "1.2–1.5%" },
    stats: [{ label: "Accuracy", value: "68%" }, { label: "Calls", value: "94" }, { label: "Avg Rtn", value: "+17%" }],
    recentCalls: [
      { company: "Dabur", action: "BUY", note: "Rural recovery play" },
      { company: "Nykaa", action: "SELL", note: "Premium segment slowing" },
      { company: "Tata Consumer", action: "BUY", note: "Salt + beverages synergy" },
    ],
    bull: [
      { title: "Rural Recovery", desc: "Rural income growth accelerating on back of good monsoon and government transfers." },
      { title: "D2C Moat", desc: "Covered brands building direct-to-consumer channels reducing distributor dependency." },
    ],
    bear: [
      { title: "Commodity Inflation", desc: "Palm oil and packaging costs eroding gross margins across FMCG picks." },
      { title: "Premium Slowdown", desc: "Urban premium category momentum waning post-COVID normalization." },
    ],
    financialPerf: [
      { year: "2020", revenue: 1200, netIncome: 180 }, { year: "2021", revenue: 1380, netIncome: 195 },
      { year: "2022", revenue: 1540, netIncome: 220 }, { year: "2023", revenue: 1780, netIncome: 245 },
      { year: "2024", revenue: 2010, netIncome: 270 }, { year: "2025", revenue: 2200, netIncome: 290 },
    ],
    cashFlow: [
      { year: "2020", fcf: 90, ocf: 140 }, { year: "2021", fcf: 110, ocf: 160 },
      { year: "2022", fcf: 140, ocf: 200 }, { year: "2023", fcf: 160, ocf: 230 },
      { year: "2024", fcf: 175, ocf: 250 }, { year: "2025", fcf: 200, ocf: 280 },
    ],
    netIncomeTrend: [
      { year: "2021", value: 195 }, { year: "2022", value: 220 }, { year: "2023", value: 245 },
      { year: "2024", value: 270 }, { year: "2025", value: 290 },
    ],
    epsGrowth: [
      { year: "2020", eps: 4.1 }, { year: "2021", eps: 4.8 }, { year: "2022", eps: 5.6 },
      { year: "2023", eps: 6.4 }, { year: "2024", eps: 7.1 }, { year: "2025", eps: 7.9 },
    ],
    assetsDebt: [
      { year: "2022", assets: 1800, debt: 90 }, { year: "2023", assets: 2100, debt: 80 },
      { year: "2024", assets: 2400, debt: 70 }, { year: "2025", assets: 2700, debt: 50 },
    ],
    income: [
      { label: "Revenue", "2025": "2,200", "2024": "2,010", "2023": "1,780", "2022": "1,540" },
      { label: "Gross Profit", "2025": "1,540", "2024": "1,407", "2023": "1,246", "2022": "1,078" },
      { label: "Operating Income", "2025": "352", "2024": "322", "2023": "285", "2022": "246" },
      { label: "Net Income", "2025": "290", "2024": "270", "2023": "245", "2022": "220" },
    ],
    peers: [
      { name: "Dabur", pb: 9.1, roe: 22.4, debtEq: 0.12, netMgn: 14.1, divYield: 1.4 },
      { name: "Marico", pb: 11.2, roe: 38.6, debtEq: 0.05, netMgn: 16.2, divYield: 1.8 },
      { name: "Godrej", pb: 7.8, roe: 19.3, debtEq: 0.8, netMgn: 12.4, divYield: 0.9 },
    ],
    peerScatter: [
      { name: "Dabur", roe: 22, debtEq: 0.1 }, { name: "Marico", roe: 38, debtEq: 0.05 },
      { name: "Godrej", roe: 19, debtEq: 0.8 },
    ],
    shareholding: [
      { quarter: "Mar 25", promoter: 62, fii: 12, mf: 8, other: 18 },
      { quarter: "Jun 25", promoter: 62, fii: 11, mf: 9, other: 18 },
      { quarter: "Sep 25", promoter: 61, fii: 11, mf: 10, other: 18 },
      { quarter: "Dec 25", promoter: 61, fii: 10, mf: 11, other: 18 },
    ],
    announcements: [
      { title: "Q3 Results — Revenue up 9.4% YoY", date: "15 Feb", desc: "Rural volumes up 7%; margins improved 40bps." },
      { title: "New Product Launch — Herbal Range", date: "3 Feb", desc: "Launched herbal skincare range targeting tier-2 cities." },
    ],
  },
  {
    id: 3, name: "Dev Kapoor", niche: "Banking & Finance", avatar: "DK", color: "#f59e0b",
    followers: "19.2K", rating: 4.9, joined: "2020", tags: ["PSU Banks", "NBFCs", "Credit"],
    sector: "Banking & Finance", description: "Top-rated banking analyst. Known for NPA cycle calls and credit cost projections.",
    longBio: "Dev has covered Indian banking for over 8 years. His NPA cycle framework called the bottom in PSU banks in 2021 with remarkable precision. Now focused on NBFC credit quality and digital lending risk.",
    cdiScore: 72, cdiLabel: "Credit Cycle Recovery",
    cdiDesc: "PSU bank picks riding NPA normalization wave. Credit costs declining sharply. Watch rate sensitivity and global credit events.",
    tellFriend: "Dev's banking calls have been market-beating. Best for medium-term investors comfortable with rate cycles.",
    riskWarning: "Rate cut cycles and global credit events could compress NIMs sharply across covered banks.",
    marketSnap: { "Mkt Cap": "₹1.2T", "P/E": "12–15×", "Fwd P/E": "10–12×", "P/B": "1.5–2×", "P/S": "2–3×", "ROE": "14–18%", "ROCE": "12–15%", "Debt/Eq": "8–10×", "Dividend": "2–3%" },
    stats: [{ label: "Accuracy", value: "81%" }, { label: "Calls", value: "212" }, { label: "Avg Rtn", value: "+31%" }],
    recentCalls: [
      { company: "SBI", action: "BUY", note: "Credit growth accelerating" },
      { company: "Bajaj Finance", action: "HOLD", note: "Valuation stretched" },
      { company: "Yes Bank", action: "AVOID", note: "Asset quality still weak" },
    ],
    bull: [
      { title: "NPA Normalization", desc: "Gross NPA ratio at decade lows, provisioning coverage robust across PSU picks." },
      { title: "Credit Growth", desc: "System credit growth at 14–16%, PSU banks gaining market share from private peers." },
    ],
    bear: [
      { title: "Rate Sensitivity", desc: "NIM compression risk if RBI cuts faster than market expectations." },
      { title: "Unsecured Lending", desc: "Rising stress in unsecured personal loans across NBFCs under coverage." },
    ],
    financialPerf: [
      { year: "2020", revenue: 8200, netIncome: 720 }, { year: "2021", revenue: 8600, netIncome: 380 },
      { year: "2022", revenue: 9100, netIncome: 810 }, { year: "2023", revenue: 10400, netIncome: 1420 },
      { year: "2024", revenue: 12100, netIncome: 1980 }, { year: "2025", revenue: 13800, netIncome: 2340 },
    ],
    cashFlow: [
      { year: "2020", fcf: 600, ocf: 900 }, { year: "2021", fcf: -200, ocf: 100 },
      { year: "2022", fcf: 700, ocf: 1100 }, { year: "2023", fcf: 1200, ocf: 1800 },
      { year: "2024", fcf: 1600, ocf: 2400 }, { year: "2025", fcf: 2000, ocf: 2900 },
    ],
    netIncomeTrend: [
      { year: "2021", value: 380 }, { year: "2022", value: 810 }, { year: "2023", value: 1420 },
      { year: "2024", value: 1980 }, { year: "2025", value: 2340 },
    ],
    epsGrowth: [
      { year: "2020", eps: 8.1 }, { year: "2021", eps: 4.2 }, { year: "2022", eps: 9.1 },
      { year: "2023", eps: 15.9 }, { year: "2024", eps: 22.1 }, { year: "2025", eps: 26.2 },
    ],
    assetsDebt: [
      { year: "2022", assets: 42000, debt: 38000 }, { year: "2023", assets: 49000, debt: 43000 },
      { year: "2024", assets: 58000, debt: 50000 }, { year: "2025", assets: 66000, debt: 56000 },
    ],
    income: [
      { label: "Net Interest Income", "2025": "13,800", "2024": "12,100", "2023": "10,400", "2022": "9,100" },
      { label: "Operating Profit", "2025": "4,200", "2024": "3,600", "2023": "2,800", "2022": "2,100" },
      { label: "Net Income", "2025": "2,340", "2024": "1,980", "2023": "1,420", "2022": "810" },
      { label: "Provisions", "2025": "900", "2024": "1,100", "2023": "1,400", "2022": "2,200" },
    ],
    peers: [
      { name: "SBI", pb: 1.8, roe: 17.2, debtEq: 9.1, netMgn: 17.0, divYield: 2.8 },
      { name: "HDFC Bank", pb: 2.8, roe: 16.1, debtEq: 8.4, netMgn: 22.3, divYield: 1.1 },
      { name: "Kotak", pb: 3.2, roe: 14.8, debtEq: 7.2, netMgn: 25.1, divYield: 0.1 },
    ],
    peerScatter: [
      { name: "SBI", roe: 17, debtEq: 9 }, { name: "HDFC", roe: 16, debtEq: 8 },
      { name: "Kotak", roe: 15, debtEq: 7 },
    ],
    shareholding: [
      { quarter: "Mar 25", promoter: 57, fii: 18, mf: 9, other: 16 },
      { quarter: "Jun 25", promoter: 57, fii: 17, mf: 10, other: 16 },
      { quarter: "Sep 25", promoter: 57, fii: 16, mf: 11, other: 16 },
      { quarter: "Dec 25", promoter: 56, fii: 16, mf: 12, other: 16 },
    ],
    announcements: [
      { title: "Q3 FY26 Results — NII up 12% YoY", date: "22 Jan", desc: "Gross NPA at 2.1%; PCR at 87%; credit growth at 15%." },
      { title: "RBI Compliance Report", date: "10 Jan", desc: "Compliance submission on digital lending guidelines filed." },
    ],
  },
  {
    id: 4, name: "Priya Nair", niche: "Pharma & Healthcare", avatar: "PN", color: "#ef4444",
    followers: "6.7K", rating: 4.5, joined: "2023", tags: ["API", "CDMO", "Hospitals"],
    sector: "Pharmaceuticals", description: "Pharma specialist tracking US FDA approvals, API supply chains, and hospital networks.",
    longBio: "Priya tracks the full pharma value chain from API manufacturers to hospital chains. Her US FDA approval watch has given subscribers early entry into several multi-baggers over the past two years.",
    cdiScore: 58, cdiLabel: "Moderate Upside, High Variance",
    cdiDesc: "FDA approval pipeline creates binary events. CDMO ramp slower than expected but hospital occupancy strong.",
    tellFriend: "High-conviction picks but binary FDA risk. Best for risk-tolerant investors with pharma knowledge.",
    riskWarning: "FDA import alerts and clinical trial failures can cause sharp 20–40% drawdowns in covered stocks.",
    marketSnap: { "Mkt Cap": "₹180B", "P/E": "28–35×", "Fwd P/E": "22–26×", "P/B": "4–6×", "P/S": "3–4×", "ROE": "15–20%", "ROCE": "18–22%", "Debt/Eq": "0.2–0.5×", "Dividend": "0.4–0.8%" },
    stats: [{ label: "Accuracy", value: "65%" }, { label: "Calls", value: "61" }, { label: "Avg Rtn", value: "+19%" }],
    recentCalls: [
      { company: "Sun Pharma", action: "BUY", note: "Specialty US pipeline strong" },
      { company: "Apollo Hospitals", action: "BUY", note: "Occupancy at all-time high" },
      { company: "Divi's Labs", action: "HOLD", note: "CDMO ramp slow" },
    ],
    bull: [
      { title: "US Specialty Pipeline", desc: "Multiple NDA filings with FDA expected to get approvals in next 12 months." },
      { title: "Hospital Occupancy", desc: "Apollo and Fortis at 70%+ occupancy, ARPU growing at 11% YoY." },
    ],
    bear: [
      { title: "FDA Risk", desc: "Any import alert on key manufacturing sites could trigger 20–40% decline." },
      { title: "CDMO Ramp Delay", desc: "Divi's CDMO facility utilization slower than guided, margins under pressure." },
    ],
    financialPerf: [
      { year: "2020", revenue: 2200, netIncome: 310 }, { year: "2021", revenue: 2600, netIncome: 380 },
      { year: "2022", revenue: 2900, netIncome: 420 }, { year: "2023", revenue: 3200, netIncome: 460 },
      { year: "2024", revenue: 3600, netIncome: 520 }, { year: "2025", revenue: 4100, netIncome: 590 },
    ],
    cashFlow: [
      { year: "2020", fcf: 120, ocf: 220 }, { year: "2021", fcf: 150, ocf: 270 },
      { year: "2022", fcf: 180, ocf: 310 }, { year: "2023", fcf: 200, ocf: 350 },
      { year: "2024", fcf: 240, ocf: 400 }, { year: "2025", fcf: 290, ocf: 460 },
    ],
    netIncomeTrend: [
      { year: "2021", value: 380 }, { year: "2022", value: 420 }, { year: "2023", value: 460 },
      { year: "2024", value: 520 }, { year: "2025", value: 590 },
    ],
    epsGrowth: [
      { year: "2020", eps: 3.1 }, { year: "2021", eps: 3.8 }, { year: "2022", eps: 4.2 },
      { year: "2023", eps: 4.6 }, { year: "2024", eps: 5.2 }, { year: "2025", eps: 5.9 },
    ],
    assetsDebt: [
      { year: "2022", assets: 4200, debt: 840 }, { year: "2023", assets: 4800, debt: 960 },
      { year: "2024", assets: 5600, debt: 1120 }, { year: "2025", assets: 6400, debt: 1280 },
    ],
    income: [
      { label: "Revenue", "2025": "4,100", "2024": "3,600", "2023": "3,200", "2022": "2,900" },
      { label: "Gross Profit", "2025": "2,870", "2024": "2,520", "2023": "2,240", "2022": "2,030" },
      { label: "Operating Income", "2025": "820", "2024": "720", "2023": "640", "2022": "580" },
      { label: "Net Income", "2025": "590", "2024": "520", "2023": "460", "2022": "420" },
    ],
    peers: [
      { name: "Sun Pharma", pb: 6.2, roe: 18.4, debtEq: 0.1, netMgn: 20.1, divYield: 0.8 },
      { name: "Cipla", pb: 4.8, roe: 15.6, debtEq: 0.2, netMgn: 15.3, divYield: 0.5 },
      { name: "Dr Reddy's", pb: 4.1, roe: 17.9, debtEq: 0.15, netMgn: 18.2, divYield: 0.6 },
    ],
    peerScatter: [
      { name: "Sun Pharma", roe: 18, debtEq: 0.1 }, { name: "Cipla", roe: 16, debtEq: 0.2 },
      { name: "Dr Reddy's", roe: 18, debtEq: 0.15 },
    ],
    shareholding: [
      { quarter: "Mar 25", promoter: 48, fii: 22, mf: 12, other: 18 },
      { quarter: "Jun 25", promoter: 48, fii: 21, mf: 13, other: 18 },
      { quarter: "Sep 25", promoter: 47, fii: 21, mf: 14, other: 18 },
      { quarter: "Dec 25", promoter: 47, fii: 20, mf: 15, other: 18 },
    ],
    announcements: [
      { title: "FDA Approval — Generic Drug ANDA", date: "18 Mar", desc: "ANDA approval received for generic formulation targeting $120M US market." },
      { title: "Q3 Results — US Specialty up 22%", date: "10 Feb", desc: "Revenue growth driven by specialty US filings; hospital occupancy at 72%." },
    ],
  },
  {
    id: 5, name: "Kabir Shah", niche: "Energy & EV", avatar: "KS", color: "#06b6d4",
    followers: "10.3K", rating: 4.7, joined: "2022", tags: ["Renewables", "EVs", "Oil & Gas"],
    sector: "Energy & Utilities", description: "Tracks India's energy transition — solar, wind, EV supply chain, and legacy O&G.",
    longBio: "Kabir follows India's energy transition with deep expertise in renewable capacity additions and EV penetration curves. Previously worked with a leading energy consultancy covering South Asia.",
    cdiScore: 71, cdiLabel: "Energy Transition Tailwinds",
    cdiDesc: "Renewable capacity additions running ahead of schedule. EV penetration curve steepening. Watch commodity cycle in O&G picks.",
    tellFriend: "Kabir's energy picks consistently outperform in the green transition wave. High conviction, long duration.",
    riskWarning: "Policy reversals, commodity price crashes, or grid infrastructure delays could hurt renewable picks significantly.",
    marketSnap: { "Mkt Cap": "₹650B", "P/E": "22–28×", "Fwd P/E": "18–22×", "P/B": "2–4×", "P/S": "1.5–2×", "ROE": "12–16%", "ROCE": "10–14%", "Debt/Eq": "1–3×", "Dividend": "0.5–1.5%" },
    stats: [{ label: "Accuracy", value: "71%" }, { label: "Calls", value: "107" }, { label: "Avg Rtn", value: "+26%" }],
    recentCalls: [
      { company: "Adani Green", action: "BUY", note: "Capacity pipeline strong" },
      { company: "ONGC", action: "HOLD", note: "Wait for oil price clarity" },
      { company: "Tata Motors", action: "BUY", note: "EV market share growing" },
    ],
    bull: [
      { title: "Capacity Addition", desc: "India's 500 GW renewable target by 2030 accelerating project pipeline dramatically." },
      { title: "EV Penetration", desc: "2-wheeler EV crossing 8%, 3-wheelers near 50% — structural transition underway." },
    ],
    bear: [
      { title: "O&G Price Risk", desc: "Legacy O&G picks exposed to oil price volatility amid OPEC+ supply decisions." },
      { title: "Grid Infrastructure", desc: "Transmission bottlenecks could delay renewable project monetization." },
    ],
    financialPerf: [
      { year: "2020", revenue: 4100, netIncome: 490 }, { year: "2021", revenue: 4600, netIncome: 530 },
      { year: "2022", revenue: 5800, netIncome: 680 }, { year: "2023", revenue: 7200, netIncome: 860 },
      { year: "2024", revenue: 8900, netIncome: 1060 }, { year: "2025", revenue: 10400, netIncome: 1240 },
    ],
    cashFlow: [
      { year: "2020", fcf: -200, ocf: 600 }, { year: "2021", fcf: -400, ocf: 800 },
      { year: "2022", fcf: -600, ocf: 1100 }, { year: "2023", fcf: -300, ocf: 1400 },
      { year: "2024", fcf: 200, ocf: 1800 }, { year: "2025", fcf: 600, ocf: 2200 },
    ],
    netIncomeTrend: [
      { year: "2021", value: 530 }, { year: "2022", value: 680 }, { year: "2023", value: 860 },
      { year: "2024", value: 1060 }, { year: "2025", value: 1240 },
    ],
    epsGrowth: [
      { year: "2020", eps: 5.5 }, { year: "2021", eps: 5.9 }, { year: "2022", eps: 7.6 },
      { year: "2023", eps: 9.6 }, { year: "2024", eps: 11.8 }, { year: "2025", eps: 13.8 },
    ],
    assetsDebt: [
      { year: "2022", assets: 18000, debt: 10000 }, { year: "2023", assets: 24000, debt: 12000 },
      { year: "2024", assets: 31000, debt: 14000 }, { year: "2025", assets: 38000, debt: 15000 },
    ],
    income: [
      { label: "Revenue", "2025": "10,400", "2024": "8,900", "2023": "7,200", "2022": "5,800" },
      { label: "Gross Profit", "2025": "6,240", "2024": "5,340", "2023": "4,320", "2022": "3,480" },
      { label: "EBITDA", "2025": "3,120", "2024": "2,670", "2023": "2,160", "2022": "1,740" },
      { label: "Net Income", "2025": "1,240", "2024": "1,060", "2023": "860", "2022": "680" },
    ],
    peers: [
      { name: "Adani Green", pb: 12.1, roe: 8.2, debtEq: 4.1, netMgn: 14.1, divYield: 0 },
      { name: "NTPC", pb: 1.8, roe: 13.4, debtEq: 2.1, netMgn: 12.8, divYield: 2.4 },
      { name: "Tata Power", pb: 4.2, roe: 11.8, debtEq: 2.8, netMgn: 7.2, divYield: 0.4 },
    ],
    peerScatter: [
      { name: "Adani Green", roe: 8, debtEq: 4 }, { name: "NTPC", roe: 13, debtEq: 2 },
      { name: "Tata Power", roe: 12, debtEq: 3 },
    ],
    shareholding: [
      { quarter: "Mar 25", promoter: 72, fii: 8, mf: 6, other: 14 },
      { quarter: "Jun 25", promoter: 72, fii: 8, mf: 7, other: 13 },
      { quarter: "Sep 25", promoter: 71, fii: 8, mf: 8, other: 13 },
      { quarter: "Dec 25", promoter: 71, fii: 7, mf: 9, other: 13 },
    ],
    announcements: [
      { title: "Capacity Addition — 1.2 GW Rajasthan Solar", date: "20 Mar", desc: "1.2 GW solar project commissioned ahead of schedule; PLF at 28%." },
      { title: "EV Infrastructure MoU", date: "5 Feb", desc: "MoU with state government for EV charging infrastructure in 200 cities." },
    ],
  },
];

const AC = { BUY: "#00c896", HOLD: "#f59e0b", SELL: "#ef4444", AVOID: "#ef4444" };
const niches = ["All", "Tech & Startups", "FMCG & Consumer", "Banking & Finance", "Pharma & Healthcare", "Energy & EV"];

function CDIRing({ score, color }) {
  const r = 40, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={r} fill="none" stroke="#1e1e1e" strokeWidth={8} />
      <circle cx={50} cy={50} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" transform="rotate(-90 50 50)" />
      <text x="50" y="56" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{score}</text>
    </svg>
  );
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <p style={{ color: "#777", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color || "#fff" }}>{p.name}: <b>{p.value?.toLocaleString()}</b></p>)}
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [selected, setSelected] = useState(null);
  const [followed, setFollowed] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = analysts.filter(a =>
    (filter === "All" || a.niche === filter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.niche.toLowerCase().includes(search.toLowerCase()))
  );
  const toggleFollow = id => setFollowed(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  return (
    <div style={S.root}>
      <style>{css}</style>
      {screen === "landing" && <Landing onStart={() => setScreen("list")} />}
      {screen === "list" && <ListScreen analysts={filtered} niches={niches} filter={filter} setFilter={setFilter}
        search={search} setSearch={setSearch} followed={followed}
        onSelect={a => { setSelected(a); setScreen("detail"); }} onBack={() => setScreen("landing")} />}
      {screen === "detail" && selected && <DetailScreen analyst={selected} followed={followed.includes(selected.id)}
        onFollow={() => toggleFollow(selected.id)} onBack={() => setScreen("list")} />}
    </div>
  );
}

function Landing({ onStart }) {
  return (
    <div style={S.screen} className="fade-in">
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,#00c89615 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "52px 24px 32px", minHeight: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#00c896", fontSize: 22 }}>◈</span>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>AnalystHub</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ color: "#00c896", fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>INDIA'S FIRST ANALYST TRACKING PLATFORM</p>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 14px" }}>
            Invest with Clarity.<br /><span style={{ color: "#00c896" }}>Backed by Credibility.</span>
          </h1>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Stop guessing. Follow India's sharpest independent analysts — their calls, conviction, and financial reasoning before the market catches on.
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[["200+", "Analysts"], ["74%", "Avg Accuracy"], ["50K+", "Subscribers"]].map(([v, l]) => (
              <div key={l} style={{ flex: 1, background: "#161616", border: "1px solid #222", borderRadius: 12, padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ color: "#00c896", fontWeight: 800, fontSize: 20 }}>{v}</span>
                <span style={{ color: "#555", fontSize: 11 }}>{l}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[["◎", "CDI Score", "AI credibility index for each analyst"],
              ["📊", "Deep Data", "Revenue, EPS, cash flow, peers"],
              ["✅", "Bull & Bear", "Pros and cons for every pick"],
              ["📋", "Announcements", "Latest corporate filings & events"],
            ].map(([ic, t, d]) => (
              <div key={t} style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 12, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 16 }}>{ic}</span>
                <span style={{ color: "#ddd", fontWeight: 700, fontSize: 12 }}>{t}</span>
                <span style={{ color: "#555", fontSize: 11, lineHeight: 1.4 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <button style={{ background: "#00c896", color: "#0a0a0a", fontWeight: 800, fontSize: 16, border: "none", borderRadius: 14, padding: "16px 0", cursor: "pointer" }} className="btn-hover" onClick={onStart}>
          Explore Analysts →
        </button>
        <p style={{ color: "#444", fontSize: 12, textAlign: "center", marginTop: 10 }}>Free to browse · No account needed</p>
      </div>
    </div>
  );
}

function ListScreen({ analysts, niches, filter, setFilter, search, setSearch, followed, onSelect, onBack }) {
  return (
    <div style={S.screen}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 16px 12px" }}>
        <button style={S.backBtn} onClick={onBack}>←</button>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>Analysts</span>
        <span style={{ background: "#00c896", color: "#0a0a0a", fontWeight: 700, fontSize: 12, borderRadius: 8, padding: "3px 9px" }}>{analysts.length}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", background: "#161616", border: "1px solid #222", borderRadius: 12, margin: "0 16px 12px", padding: "0 14px" }}>
        <span style={{ color: "#555", fontSize: 18, marginRight: 8 }}>⌕</span>
        <input style={{ background: "transparent", border: "none", outline: "none", color: "#ccc", fontSize: 14, flex: 1, padding: "13px 0", fontFamily: "inherit" }}
          placeholder="Search analysts..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px 12px", scrollbarWidth: "none" }}>
        {niches.map(n => (
          <button key={n} style={{ ...S.chip, ...(filter === n ? S.chipOn : {}) }} onClick={() => setFilter(n)}>{n}</button>
        ))}
      </div>
      <div style={{ padding: "0 16px 80px", overflowY: "auto", flex: 1 }}>
        {analysts.map((a, i) => (
          <div key={a.id} style={{ ...S.card, animationDelay: `${i * 0.06}s` }} className="card-in" onClick={() => onSelect(a)}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: a.color + "22", color: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{a.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{a.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ background: a.color + "18", borderRadius: 20, padding: "3px 10px" }}>
                      <span style={{ color: a.color, fontWeight: 800, fontSize: 12 }}>{a.cdiScore}</span>
                      <span style={{ color: "#555", fontSize: 9, marginLeft: 3 }}>CDI</span>
                    </div>
                    {followed.includes(a.id) && <span style={{ background: "#00c89618", color: "#00c896", fontSize: 10, fontWeight: 600, borderRadius: 6, padding: "2px 6px" }}>✓</span>}
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, border: `1px solid ${a.color}44`, color: a.color, borderRadius: 6, padding: "2px 7px", display: "inline-block", marginBottom: 6 }}>{a.niche}</span>
                <p style={{ color: "#777", fontSize: 12, lineHeight: 1.5, marginBottom: 7 }}>{a.description}</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 7 }}>
                  <span style={{ color: "#555", fontSize: 11 }}>⭐ {a.rating}</span>
                  <span style={{ color: "#555", fontSize: 11 }}>👥 {a.followers}</span>
                  <span style={{ color: "#00c896", fontSize: 11 }}>✓ {a.stats[0].value} accuracy</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {a.tags.map(t => <span key={t} style={{ background: "#1e1e1e", color: "#555", fontSize: 10, borderRadius: 6, padding: "2px 7px" }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailScreen({ analyst: a, followed, onFollow, onBack }) {
  const [tab, setTab] = useState("overview");
  const [stmtTab, setStmtTab] = useState("income");
  const TABS = [["overview", "Overview"], ["financials", "Financials"], ["peers", "Peers"], ["holdings", "Holdings"], ["statements", "Statements"]];

  return (
    <div style={S.screen} className="fade-in">
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#0d0d0d" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 16px 10px" }}>
          <button style={S.backBtn} onClick={onBack}>←</button>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{a.name}</span>
          <button onClick={onFollow} style={{ background: followed ? "#00c89622" : "#1a1a1a", color: followed ? "#00c896" : "#888", border: `1px solid ${followed ? "#00c896" : "#2a2a2a"}`, borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 12 }}>
            {followed ? "✓ Following" : "+ Follow"}
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px 10px" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: a.color + "22", color: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{a.avatar}</div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 10, fontWeight: 600, border: `1px solid ${a.color}44`, color: a.color, borderRadius: 6, padding: "2px 7px", display: "inline-block", marginBottom: 4 }}>{a.sector}</span>
            <div style={{ display: "flex", gap: 10 }}>
              {a.stats.map(s => (
                <div key={s.label}>
                  <span style={{ color: a.color, fontWeight: 800, fontSize: 13 }}>{s.value}</span>
                  <span style={{ color: "#555", fontSize: 9, marginLeft: 3 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <CDIRing score={a.cdiScore} color={a.color} />
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid #1e1e1e", overflowX: "auto", scrollbarWidth: "none" }}>
          {TABS.map(([t, l]) => (
            <button key={t} style={{ flex: "none", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? a.color : "transparent"}`, color: tab === t ? a.color : "#555", fontSize: 11, fontWeight: 600, padding: "10px 12px", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }} onClick={() => setTab(t)}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ overflowY: "auto", flex: 1, padding: "14px 14px 80px" }}>

        {/* OVERVIEW */}
        {tab === "overview" && <>
          <div style={S.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, display: "inline-block" }} />
              <span style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>CDI BREAKDOWN · <span style={{ color: "#444" }}>know what it is ⓘ</span></span>
            </div>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 20, margin: "6px 0 8px", letterSpacing: "-0.5px" }}>{a.cdiLabel}</h3>
            <p style={{ color: "#777", fontSize: 13, lineHeight: 1.6 }}>{a.cdiDesc}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ ...S.card, background: "#0d1a14", borderColor: "#00c89622" }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>👍</div>
              <p style={{ color: "#00c896", fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TELL A FRIEND</p>
              <p style={{ color: "#aaa", fontSize: 12, lineHeight: 1.5 }}>"{a.tellFriend}"</p>
            </div>
            <div style={{ ...S.card, background: "#1a1100", borderColor: "#f59e0b22" }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>🛡️</div>
              <p style={{ color: "#f59e0b", fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>RISK WARNING</p>
              <p style={{ color: "#aaa", fontSize: 12, lineHeight: 1.5 }}>"{a.riskWarning}"</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div style={{ ...S.card, borderLeft: "3px solid #00c896" }}>
              <p style={{ color: "#00c896", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>✅ BULL (PROS)</p>
              {a.bull.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <span style={{ background: "#00c89222", color: "#00c896", borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>{i + 1}</span>
                  <div>
                    <p style={{ color: "#ddd", fontWeight: 700, fontSize: 11 }}>{b.title}</p>
                    <p style={{ color: "#666", fontSize: 10, lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...S.card, borderLeft: "3px solid #ef4444" }}>
              <p style={{ color: "#ef4444", fontSize: 10, fontWeight: 700, marginBottom: 8 }}>⊗ BEAR (CONS)</p>
              {a.bear.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <span style={{ background: "#ef444422", color: "#ef4444", borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>{i + 1}</span>
                  <div>
                    <p style={{ color: "#ddd", fontWeight: 700, fontSize: 11 }}>{b.title}</p>
                    <p style={{ color: "#666", fontSize: 10, lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>RECENT CALLS</p>
            {a.recentCalls.map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < a.recentCalls.length - 1 ? "1px solid #1e1e1e" : "none" }}>
                <div>
                  <p style={{ color: "#ddd", fontWeight: 700, fontSize: 13 }}>{c.company}</p>
                  <p style={{ color: "#666", fontSize: 11 }}>{c.note}</p>
                </div>
                <span style={{ background: AC[c.action] + "22", color: AC[c.action], fontWeight: 800, fontSize: 11, borderRadius: 8, padding: "5px 12px" }}>{c.action}</span>
              </div>
            ))}
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>ABOUT</p>
            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7 }}>{a.longBio}</p>
          </div>
        </>}

        {/* FINANCIALS */}
        {tab === "financials" && <>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>REVENUE SNAPSHOT (FY25 ₹ Cr)</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <div style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <p style={{ color: "#666", fontSize: 9, letterSpacing: 0.5 }}>REVENUE</p>
                <p style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>₹{a.financialPerf.at(-1).revenue.toLocaleString()}</p>
              </div>
              <div style={{ background: "#0d1a14", border: "1px solid #00c89622", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <p style={{ color: "#555", fontSize: 9 }}>NET PROFIT <span style={{ color: "#00c896" }}>13%</span></p>
                <p style={{ color: "#00c896", fontWeight: 800, fontSize: 15 }}>₹{a.financialPerf.at(-1).netIncome.toLocaleString()}</p>
              </div>
              <div style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <p style={{ color: "#666", fontSize: 9 }}>EPS (FY25)</p>
                <p style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{a.epsGrowth.at(-1).eps}</p>
              </div>
            </div>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📈 FINANCIAL PERFORMANCE</p>
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={a.financialPerf}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#666" }} />
                <Line type="monotone" dataKey="revenue" stroke={a.color} strokeWidth={2} dot={{ r: 3 }} name="Revenue" />
                <Line type="monotone" dataKey="netIncome" stroke="#7c6af7" strokeWidth={2} dot={{ r: 3 }} name="Net Income" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📊 CASH FLOW FACTSHEET</p>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={a.cashFlow} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine y={0} stroke="#333" />
                <Bar dataKey="fcf" fill={a.color} name="Free Cash Flow" radius={[3, 3, 0, 0]} />
                <Bar dataKey="ocf" fill="#1e3a5f" name="Operating Cash" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>ASSETS VS DEBT GROWTH (5Y)</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={a.assetsDebt}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="assets" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Assets" />
                <Line type="monotone" dataKey="debt" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Debt" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>NET INCOME TREND (₹ Cr)</p>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={a.netIncomeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="value" fill={a.color} name="Net Income" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>EPS GROWTH (HEATMAP)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={a.epsGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="eps" fill={a.color} name="EPS (₹)" radius={[4, 4, 0, 0]} label={{ position: "top", fill: "#777", fontSize: 9 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>SHAREHOLDING PATTERN</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={a.shareholding} stackOffset="expand" barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="quarter" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `${(v * 100).toFixed(0)}%`} tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="promoter" stackId="a" fill={a.color} name="Promoter" />
                <Bar dataKey="fii" stackId="a" fill="#3b82f6" name="FII" />
                <Bar dataKey="mf" stackId="a" fill="#7c6af7" name="MF" />
                <Bar dataKey="other" stackId="a" fill="#374151" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>}

        {/* PEERS */}
        {tab === "peers" && <>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>SECTOR COMPARISON</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>{["Company", "P/B", "ROE%", "D/E", "Net Mgn%", "Div%"].map(h => (
                    <th key={h} style={{ color: "#555", fontWeight: 600, padding: "6px 6px", textAlign: h === "Company" ? "left" : "right", borderBottom: "1px solid #1e1e1e", whiteSpace: "nowrap" }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>{a.peers.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ color: "#ddd", padding: "9px 6px", fontWeight: 600 }}>{p.name}</td>
                    <td style={{ color: "#aaa", padding: "9px 6px", textAlign: "right" }}>{p.pb}</td>
                    <td style={{ color: p.roe > 0 ? "#00c896" : "#ef4444", padding: "9px 6px", textAlign: "right", fontWeight: 700 }}>{p.roe}%</td>
                    <td style={{ color: "#aaa", padding: "9px 6px", textAlign: "right" }}>{p.debtEq}</td>
                    <td style={{ color: p.netMgn > 0 ? "#00c896" : "#ef4444", padding: "9px 6px", textAlign: "right" }}>{p.netMgn}%</td>
                    <td style={{ color: p.divYield > 0 ? "#00c896" : "#555", padding: "9px 6px", textAlign: "right" }}>{p.divYield > 0 ? `${p.divYield}%` : "—"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>METRIC CORRELATION: EFFICIENCY VS DEBT</p>
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                <XAxis dataKey="debtEq" name="Debt/Equity" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "Debt / Equity", fill: "#555", fontSize: 10, position: "insideBottom", offset: -5 }} />
                <YAxis dataKey="roe" name="ROE%" tick={{ fill: "#555", fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "ROE (5yr) %", fill: "#555", fontSize: 10, angle: -90, position: "insideLeft" }} />
                <Tooltip cursor={false} content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
                    <p style={{ color: "#fff", fontWeight: 700 }}>{d?.name}</p>
                    <p style={{ color: "#00c896" }}>ROE: {d?.roe}%</p>
                    <p style={{ color: "#ef4444" }}>D/E: {d?.debtEq}</p>
                  </div>;
                }} />
                <Scatter data={a.peerScatter} fill={a.color} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </>}

        {/* HOLDINGS */}
        {tab === "holdings" && <>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>MARKET SNAPSHOT</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.entries(a.marketSnap).map(([k, v]) => (
                <div key={k} style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, padding: "10px 10px" }}>
                  <p style={{ color: "#555", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</p>
                  <p style={{ color: "#ddd", fontWeight: 700, fontSize: 14, marginTop: 2 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={S.card}>
            <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>📋 LATEST ANNOUNCEMENTS</p>
            {a.announcements.map((ann, i) => (
              <div key={i} style={{ borderBottom: i < a.announcements.length - 1 ? "1px solid #1e1e1e" : "none", padding: "11px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ color: "#ddd", fontWeight: 600, fontSize: 12, flex: 1, paddingRight: 8 }}>{ann.title}</p>
                  <span style={{ color: "#555", fontSize: 10, whiteSpace: "nowrap" }}>{ann.date}</span>
                </div>
                <p style={{ color: "#666", fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>{ann.desc}</p>
              </div>
            ))}
          </div>
        </>}

        {/* STATEMENTS */}
        {tab === "statements" && <>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["income", "cash"].map(t => (
              <button key={t} style={{ ...S.chip, ...(stmtTab === t ? S.chipOn : {}), flex: 1 }} onClick={() => setStmtTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p style={{ color: "#555", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{stmtTab} Statement</p>
              <span style={{ color: "#444", fontSize: 11 }}>₹ CR.</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>
                    <th style={{ color: "#555", padding: "6px 6px", textAlign: "left", borderBottom: "1px solid #1e1e1e" }}>Metric</th>
                    {["2025", "2024", "2023", "2022"].map(y => <th key={y} style={{ color: "#555", padding: "6px 6px", textAlign: "right", borderBottom: "1px solid #1e1e1e" }}>{y}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {(stmtTab === "income" ? a.income : [
                    { label: "Operating Cash", "2025": String(a.cashFlow.at(-1).ocf), "2024": String(a.cashFlow.at(-2).ocf), "2023": String(a.cashFlow.at(-3).ocf), "2022": String(a.cashFlow.at(-4).ocf) },
                    { label: "Free Cash Flow", "2025": String(a.cashFlow.at(-1).fcf), "2024": String(a.cashFlow.at(-2).fcf), "2023": String(a.cashFlow.at(-3).fcf), "2022": String(a.cashFlow.at(-4).fcf) },
                  ]).map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #141414" }}>
                      <td style={{ color: "#ccc", padding: "9px 6px" }}>{row.label}</td>
                      {["2025", "2024", "2023", "2022"].map(y => (
                        <td key={y} style={{ color: String(row[y]).startsWith("-") ? "#ef4444" : "#aaa", padding: "9px 6px", textAlign: "right" }}>{row[y]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}

const S = {
  root: { fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#0a0a0a", minHeight: "100vh", display: "flex", justifyContent: "center" },
  screen: { width: "100%", maxWidth: 480, minHeight: "100vh", background: "#0d0d0d", display: "flex", flexDirection: "column", position: "relative" },
  backBtn: { background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#ccc", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  chip: { background: "#161616", border: "1px solid #222", color: "#666", fontSize: 11, borderRadius: 20, padding: "7px 12px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" },
  chipOn: { background: "#00c89622", border: "1px solid #00c896", color: "#00c896" },
  card: { background: "#141414", border: "1px solid #1e1e1e", borderRadius: 14, padding: "12px", marginBottom: 10 },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  body{background:#0a0a0a}
  ::-webkit-scrollbar{display:none}
  .fade-in{animation:fadeIn .35s ease}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .card-in{animation:cardIn .4s ease both}
  @keyframes cardIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  .card-in:hover{background:#181818!important;border-color:#2a2a2a!important;transition:all .2s}
  .btn-hover:hover{opacity:.88;transform:scale(.98);transition:all .15s}
  input::placeholder{color:#444}
  button{transition:all .15s}
`;
