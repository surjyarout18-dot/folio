export const site = {
  name: 'Surjya Sarathi Rout',
  role: 'Data Scientist | Analytics Engineer',
  tagline: 'Exploring the intersection of data, technology, and intelligent solutions.',
  email: 'surjyarout18@gmail.com',
  linkedin: 'https://www.linkedin.com/in/surjya-sarathi-rout-a5490327a/',
  github: 'https://github.com/Surjya123',
  resume: '/resume.pdf',
  location: 'India',
}

export type Project = {
  slug: string
  index: string
  title: string
  short: string
  description: string
  tags: string[]
  image: string
  problem: string
  solution: string
  insights: string[]
  link: string
  year: string
}

export const projects: Project[] = [
  {
    slug: 'mantri-real-estate-intelligence',
    index: '01',
    title: 'Mantri Real Estate Intelligence',
    short: 'Real estate analytics, Python, data modeling and business intelligence.',
    description:
      'An end-to-end analytics pipeline that turns fragmented property listings and sales records into a decision-ready intelligence layer for a real estate developer.',
    tags: ['Python', 'Pandas', 'Data Modeling', 'Power BI', 'SQL'],
    image: '/images/projects/mantri.png',
    problem:
      'Pricing, inventory and lead data lived in disconnected spreadsheets. Leadership had no single view of which micro-markets were converting, which unit types were stalling, or how pricing compared against competing projects.',
    solution:
      'Built a star-schema data model in Python and SQL, cleaned and geocoded listing data, engineered price-per-square-foot and absorption-rate metrics, and surfaced everything through an interactive Power BI intelligence dashboard with drill-downs by project, tower and unit configuration.',
    insights: [
      'Absorption velocity varied up to 3x between adjacent micro-markets, revealing mispriced inventory.',
      'Unit configurations with compact carpet areas cleared fastest once price bands were normalized.',
      'A lead-to-site-visit funnel view exposed the single stage where most drop-off occurred.',
    ],
    link: 'https://github.com/Surjya123',
    year: 'Analytics',
  },
  {
    slug: 'maven-market-analytics',
    index: '02',
    title: 'Maven Market Analytics',
    short: 'Retail performance, revenue insights, customer analytics and Power BI dashboards.',
    description:
      'A multi-page Power BI reporting suite analysing transactions, returns, product hierarchy and customer demographics for a multinational grocery chain.',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'Excel', 'Retail Analytics'],
    image: '/images/projects/maven.png',
    problem:
      'Store, region and product managers relied on static monthly exports. Return rates, profit margins and customer segments could not be explored interactively or compared against targets.',
    solution:
      'Designed a relational model connecting transactions, returns, products, stores and calendar tables; wrote DAX measures for revenue, profit margin, return rate and month-over-month growth; and built an executive dashboard with KPI cards, decomposition trees and target tracking.',
    insights: [
      'A small set of product brands drove a disproportionate share of returns, pointing to quality rather than demand issues.',
      'Weekend transactions carried higher basket values but lower margins across most regions.',
      'Customer segments by income and household size responded very differently to promotions.',
    ],
    link: 'https://github.com/Surjya123',
    year: 'Business Intelligence',
  },
  {
    slug: 'global-climate-index',
    index: '03',
    title: 'Global Climate Index',
    short: 'Exploratory data analysis and country-level climate risk visualization.',
    description:
      'Exploratory analysis of multi-decade climate indicators, culminating in a composite risk index and a visual atlas of country-level exposure.',
    tags: ['Python', 'EDA', 'Matplotlib', 'Statistics', 'Geospatial'],
    image: '/images/projects/climate.png',
    problem:
      'Public climate datasets are scattered across agencies, use inconsistent units and timeframes, and rarely communicate relative risk in a way non-specialists can read.',
    solution:
      'Harmonized temperature anomaly, precipitation variability, sea-level and emissions series; performed distribution and correlation analysis; built a weighted composite index with z-score normalisation; and visualised results as choropleths, small multiples and ranked charts.',
    insights: [
      'Countries with the lowest emissions per capita clustered among the highest composite exposure scores.',
      'Precipitation variability, not mean temperature, was the strongest discriminator of near-term risk.',
      'Index weighting sensitivity analysis showed rankings were stable for the top and bottom deciles.',
    ],
    link: 'https://github.com/Surjya123',
    year: 'Data Science',
  },
  {
    slug: 'icc-cricket-world-cup-2023',
    index: '04',
    title: 'ICC Cricket World Cup 2023',
    short: 'Sports data analysis and statistical insights using Python.',
    description:
      'A ball-by-ball statistical investigation of the 2023 tournament: batting tempo, bowling economy, venue effects and match-winning patterns.',
    tags: ['Python', 'Pandas', 'NumPy', 'Statistics', 'Matplotlib'],
    image: '/images/projects/cricket.png',
    problem:
      'Conventional scorecards hide the structure of a match. Questions about powerplay strategy, death-over economy and venue bias cannot be answered from aggregate totals.',
    solution:
      'Scraped and normalised match data into tidy tables, engineered phase-wise metrics (powerplay, middle, death), compared distributions across teams and venues, and visualised performance with worm charts, heatmaps and rolling averages.',
    insights: [
      'Teams that preserved wickets through the middle overs converted significantly more often at the death.',
      'Venue-adjusted par scores diverged from naive averages by double digits at several grounds.',
      'A handful of bowlers combined elite economy with wicket-taking across all three phases.',
    ],
    link: 'https://github.com/Surjya123',
    year: 'Sports Analytics',
  },
  {
    slug: 'gold-trading-bot',
    index: '05',
    title: 'Gold Trading Bot',
    short: 'Python automation, MetaTrader 5, EMA, RSI and Telegram alerts.',
    description:
      'An automated XAU/USD signal engine connected to MetaTrader 5 that evaluates trend and momentum conditions and pushes real-time alerts to Telegram.',
    tags: ['Python', 'MetaTrader 5', 'EMA / RSI', 'Automation', 'Telegram API'],
    image: '/images/projects/gold.png',
    problem:
      'Manual chart-watching is slow and emotionally biased. Signal rules that look obvious in hindsight are inconsistently applied in live markets.',
    solution:
      'Streamed OHLC candles from MT5, computed EMA crossovers and RSI thresholds on configurable timeframes, applied risk filters (spread, session, cooldown), and dispatched structured Telegram alerts with entry, stop and target levels along with a logged trade journal.',
    insights: [
      'Filtering signals by trading session removed most false positives during low-liquidity hours.',
      'Combining a slow EMA trend filter with RSI mean reversion outperformed either rule in isolation.',
      'Structured logging made it trivial to backtest rule changes against the recorded signal history.',
    ],
    link: 'https://github.com/Surjya123',
    year: 'Automation',
  },
  {
    slug: 'bridge-monitoring-system',
    index: '06',
    title: 'Bridge Monitoring System',
    short: 'IoT-based structural monitoring and alert generation.',
    description:
      'An IoT sensing system that monitors vibration, tilt and load on bridge structures and raises alerts when readings cross safety thresholds.',
    tags: ['IoT', 'Embedded', 'Python', 'Signal Processing', 'Alerting'],
    image: '/images/projects/bridge.png',
    problem:
      'Structural inspection is periodic and manual. Early warning signs between inspections go unnoticed until damage becomes visible.',
    solution:
      'Deployed accelerometer, strain and tilt sensors on a microcontroller node, streamed readings to a Python service that filtered noise and computed rolling statistics, and generated tiered alerts with a live dashboard for monitoring trends over time.',
    insights: [
      'Baseline vibration signatures varied with temperature, requiring adaptive rather than fixed thresholds.',
      'Sustained tilt drift was a more reliable early indicator than instantaneous vibration spikes.',
      'Edge-side filtering reduced transmitted data volume dramatically without losing alert fidelity.',
    ],
    link: 'https://github.com/Surjya123',
    year: 'IoT Systems',
  },
]

export type SkillCategory = {
  id: string
  name: string
  skills: { name: string; description: string }[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    skills: [
      { name: 'Python', description: 'Primary language for analysis, automation and modeling.' },
      { name: 'SQL', description: 'Window functions, CTEs and schema design for analytics.' },
    ],
  },
  {
    id: 'analysis',
    name: 'Data Analysis',
    skills: [
      { name: 'Pandas', description: 'Tidy data wrangling, joins and time-series reshaping.' },
      { name: 'NumPy', description: 'Vectorised numerical computing and array math.' },
      { name: 'Statistics', description: 'Distributions, hypothesis testing and inference.' },
      { name: 'EDA', description: 'Finding structure, outliers and signal before modeling.' },
    ],
  },
  {
    id: 'visualization',
    name: 'Visualization',
    skills: [
      { name: 'Power BI', description: 'Data models, DAX measures and executive dashboards.' },
      { name: 'Excel', description: 'Pivot analysis, modeling and quick what-if scenarios.' },
      { name: 'Matplotlib', description: 'Publication-quality statistical charts in Python.' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    skills: [
      { name: 'MySQL', description: 'Relational schemas, indexing and query optimisation.' },
      { name: 'MongoDB', description: 'Document stores and aggregation pipelines.' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    skills: [
      { name: 'Git', description: 'Version control, branching and collaborative workflows.' },
      { name: 'Jupyter', description: 'Reproducible, narrative-driven analysis notebooks.' },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    skills: [
      { name: 'Flask', description: 'Lightweight APIs and dashboards for models and data.' },
      { name: 'HTML', description: 'Semantic structure for data-facing web interfaces.' },
      { name: 'CSS', description: 'Layout and visual systems for clear presentation.' },
      { name: 'JavaScript', description: 'Interactive charts and front-end behaviour.' },
    ],
  },
]

export type TimelineItem = {
  phase: string
  title: string
  org: string
  type: 'Education' | 'Development' | 'Internship' | 'Certification' | 'Achievement'
  description: string
}

export const timeline: TimelineItem[] = [
  {
    phase: 'Foundation',
    title: 'B.E. Electronics & Communication Engineering',
    org: 'Engineering Degree',
    type: 'Education',
    description:
      'Built a rigorous base in signals, systems and mathematics, with a growing pull toward data, probability and the logic of decision-making.',
  },
  {
    phase: 'Discovery',
    title: 'Pivot into Data Science & Analytics',
    org: 'Self-directed Learning',
    type: 'Development',
    description:
      'Deep-dived into Python, SQL and statistics. Moved from coursework into real datasets: cleaning, exploring and visualising messy, incomplete information.',
  },
  {
    phase: 'Application',
    title: 'Analytics & Data Internship',
    org: 'Industry Experience',
    type: 'Internship',
    description:
      'Worked on real business questions: modeling data, building dashboards and translating analysis into recommendations stakeholders could act on.',
  },
  {
    phase: 'Validation',
    title: 'Data Analytics & BI Certifications',
    org: 'Professional Certification',
    type: 'Certification',
    description:
      'Formalised expertise across Python for data analysis, SQL, Power BI and machine learning fundamentals through structured certification programs.',
  },
  {
    phase: 'Momentum',
    title: 'Independent Projects & Systems',
    org: 'Portfolio Work',
    type: 'Achievement',
    description:
      'Shipped six end-to-end projects spanning BI, EDA, automation and IoT, each one framed around a real problem and a measurable insight.',
  },
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
