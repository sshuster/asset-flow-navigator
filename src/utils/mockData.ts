
import { subDays, format } from 'date-fns';

// Types
export interface Strategy {
  id: number;
  name: string;
  type: string;
  assets: string[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  risk: 'low' | 'medium' | 'high';
  creator: string;
  description: string;
  historicalData: HistoricalDataPoint[];
}

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  strategies: number[];
}

// Generate historical data for strategies
const generateHistoricalData = (days: number, initialValue: number, volatility: number): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  let currentValue = initialValue;
  
  for (let i = days; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    // Random walk with some trend
    const change = (Math.random() - 0.45) * volatility;
    currentValue = Math.max(currentValue * (1 + change), 0.1);
    data.push({ date, value: Number(currentValue.toFixed(2)) });
  }
  
  return data;
};

// Mock strategies
export const mockStrategies: Strategy[] = [
  {
    id: 1,
    name: "Global Macro Diversification",
    type: "Multi-Asset",
    assets: ["Stocks", "Bonds", "Commodities", "FX"],
    performance: {
      daily: 0.3,
      weekly: 1.7,
      monthly: 5.2,
      yearly: 24.8
    },
    risk: "medium",
    creator: "Quant Team Alpha",
    description: "A global macro strategy that allocates across different asset classes based on economic indicators and market trends.",
    historicalData: generateHistoricalData(365, 100, 0.015)
  },
  {
    id: 2,
    name: "Tech-Commodities Rotation",
    type: "Sector Rotation",
    assets: ["Tech Stocks", "Energy Commodities", "Precious Metals"],
    performance: {
      daily: -0.2,
      weekly: 2.1,
      monthly: 6.7,
      yearly: 31.2
    },
    risk: "high",
    creator: "Sector Specialists",
    description: "Rotates between technology stocks and commodities based on economic cycles and inflation expectations.",
    historicalData: generateHistoricalData(365, 100, 0.025)
  },
  {
    id: 3,
    name: "Fixed Income Fortress",
    type: "Income",
    assets: ["Government Bonds", "Corporate Bonds", "High-Yield Bonds"],
    performance: {
      daily: 0.1,
      weekly: 0.5,
      monthly: 1.8,
      yearly: 8.7
    },
    risk: "low",
    creator: "Bond Masters",
    description: "A conservative strategy focused on generating stable income through a diversified bond portfolio.",
    historicalData: generateHistoricalData(365, 100, 0.007)
  },
  {
    id: 4,
    name: "Crypto-Traditional Blend",
    type: "Alternative",
    assets: ["Bitcoin", "Ethereum", "Blue-Chip Stocks", "Gold"],
    performance: {
      daily: 1.2,
      weekly: 3.9,
      monthly: 12.3,
      yearly: 42.6
    },
    risk: "high",
    creator: "Digital Assets Team",
    description: "Combines cryptocurrency exposure with traditional safe-haven assets for a balanced approach to digital and physical assets.",
    historicalData: generateHistoricalData(365, 100, 0.035)
  },
  {
    id: 5,
    name: "Real Estate Income Plus",
    type: "Real Estate",
    assets: ["REITs", "Real Estate Stocks", "Infrastructure"],
    performance: {
      daily: 0.2,
      weekly: 1.1,
      monthly: 3.6,
      yearly: 15.4
    },
    risk: "medium",
    creator: "Property Experts",
    description: "Focuses on generating income and capital appreciation through real estate investments across different sectors.",
    historicalData: generateHistoricalData(365, 100, 0.012)
  }
];

// Mock user data for admin dashboard
export const mockUsers: User[] = [
  {
    id: 1,
    username: "muser",
    email: "muser@example.com",
    registrationDate: "2023-01-15",
    lastLogin: "2023-04-04",
    status: "active",
    strategies: [1, 3, 5]
  },
  {
    id: 2,
    username: "mvc",
    email: "mvc@example.com",
    registrationDate: "2023-01-01",
    lastLogin: "2023-04-05",
    status: "active",
    strategies: [1, 2, 3, 4, 5]
  },
  {
    id: 3,
    username: "johndoe",
    email: "john@example.com",
    registrationDate: "2023-02-10",
    lastLogin: "2023-03-28",
    status: "active",
    strategies: [2, 4]
  },
  {
    id: 4,
    username: "janesmith",
    email: "jane@example.com",
    registrationDate: "2023-02-15",
    lastLogin: "2023-04-01",
    status: "active",
    strategies: [1, 5]
  },
  {
    id: 5,
    username: "robertbrown",
    email: "robert@example.com",
    registrationDate: "2023-03-05",
    lastLogin: "2023-03-25",
    status: "inactive",
    strategies: [3]
  }
];

// Asset type preferences
export const assetTypes = [
  { value: "stocks", label: "Stocks" },
  { value: "bonds", label: "Bonds" },
  { value: "commodities", label: "Commodities" },
  { value: "forex", label: "Foreign Exchange (FX)" },
  { value: "crypto", label: "Cryptocurrencies" },
  { value: "realestate", label: "Real Estate" }
];

// Risk tolerance levels
export const riskLevels = [
  { value: "low", label: "Conservative (Low Risk)" },
  { value: "medium", label: "Balanced (Medium Risk)" },
  { value: "high", label: "Aggressive (High Risk)" }
];

// Strategy types
export const strategyTypes = [
  { value: "multi-asset", label: "Multi-Asset Allocation" },
  { value: "sector-rotation", label: "Sector Rotation" },
  { value: "trend-following", label: "Trend Following" },
  { value: "value", label: "Value Investing" },
  { value: "growth", label: "Growth Investing" },
  { value: "income", label: "Income Generation" },
  { value: "alternative", label: "Alternative Investments" }
];

// Pricing tiers
export const pricingTiers = [
  {
    title: "Basic",
    price: 29,
    period: "month",
    description: "Perfect for individual investors starting their journey",
    features: [
      "5 strategy recommendations per month",
      "Basic performance tracking",
      "Weekly market updates",
      "Email notifications",
      "Basic asset classes (Stocks & Bonds)"
    ],
    buttonText: "Get Started",
    highlighted: false
  },
  {
    title: "Professional",
    price: 79,
    period: "month",
    description: "Ideal for serious investors seeking comprehensive insights",
    features: [
      "15 strategy recommendations per month",
      "Advanced performance analytics",
      "Daily market updates",
      "Real-time notifications",
      "All asset classes",
      "Risk assessment tools",
      "Portfolio optimization"
    ],
    buttonText: "Subscribe Now",
    highlighted: true
  },
  {
    title: "Enterprise",
    price: 199,
    period: "month",
    description: "For institutions and professional portfolio managers",
    features: [
      "Unlimited strategy recommendations",
      "Institutional-grade analytics",
      "Real-time market data & alerts",
      "Custom strategy development",
      "All asset classes with detailed analysis",
      "Advanced risk modeling",
      "API access",
      "Dedicated account manager"
    ],
    buttonText: "Contact Sales",
    highlighted: false
  }
];
