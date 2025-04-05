
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStrategies, Strategy, assetTypes, riskLevels, strategyTypes } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';
import { ArrowDownIcon, ArrowUpIcon, AlertTriangle, Bell, TrendingUp, CircleDollarSign, PieChart, BarChart4 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PerformanceCard = ({ title, value, change, icon: Icon }: { title: string; value: string; change: number; icon: React.ElementType }) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              <span className={`flex items-center text-sm ${isPositive ? 'text-financial-up' : 'text-financial-down'}`}>
                {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                {Math.abs(change).toFixed(2)}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">vs. prev period</span>
            </div>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [userStrategies, setUserStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  
  useEffect(() => {
    // In a real app, we would fetch the user's strategies from the API
    // For now, we'll use the first 3 mock strategies
    setUserStrategies(mockStrategies.slice(0, 3));
    setSelectedStrategy(mockStrategies[0]);
  }, []);

  const toggleAssetType = (value: string) => {
    setSelectedAssets(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const filteredStrategies = mockStrategies.filter(strategy => {
    if (selectedAssets.length > 0) {
      const hasMatchingAsset = strategy.assets.some(asset => 
        selectedAssets.includes(asset.toLowerCase())
      );
      if (!hasMatchingAsset) return false;
    }
    
    if (selectedRisk && strategy.risk !== selectedRisk) return false;
    
    if (selectedType && !strategy.type.toLowerCase().includes(selectedType.toLowerCase())) return false;
    
    return true;
  });

  if (!selectedStrategy) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.username}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="mr-2">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            New Strategies
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PerformanceCard 
          title="Portfolio Value" 
          value="$124,758.23" 
          change={3.2} 
          icon={CircleDollarSign} 
        />
        <PerformanceCard 
          title="MTD Return" 
          value="5.83%" 
          change={1.2} 
          icon={TrendingUp} 
        />
        <PerformanceCard 
          title="YTD Return" 
          value="18.45%" 
          change={4.6} 
          icon={BarChart4} 
        />
        <PerformanceCard 
          title="Risk Score" 
          value="Medium" 
          change={-0.5} 
          icon={AlertTriangle} 
        />
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your portfolio performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={selectedStrategy.historicalData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A365D" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1A365D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                      tick={{ fontSize: 12 }}
                      tickCount={6}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Value']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1A365D" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current allocation by asset class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Allocation']}
                      />
                      <pie
                        data={[
                          { name: 'Stocks', value: 45, fill: '#1A365D' },
                          { name: 'Bonds', value: 25, fill: '#38A169' },
                          { name: 'Commodities', value: 15, fill: '#ECC94B' },
                          { name: 'Cash', value: 10, fill: '#9F7AEA' },
                          { name: 'Real Estate', value: 5, fill: '#F56565' },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Strategy Performance</CardTitle>
                <CardDescription>Performance by strategy type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Global Macro', value: 8.4 },
                        { name: 'Tech-Comm.', value: 12.7 },
                        { name: 'Fixed Income', value: 3.8 },
                        { name: 'Crypto Blend', value: 15.2 },
                        { name: 'Real Estate', value: 6.1 },
                      ]}
                      margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Return']}
                      />
                      <Bar dataKey="value" fill="#1A365D" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="strategies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Strategies</CardTitle>
              <CardDescription>Strategies you are currently subscribed to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userStrategies.map((strategy) => (
                  <div key={strategy.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-2 md:mb-0">
                        <h3 className="font-medium">{strategy.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="outline">{strategy.type}</Badge>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${strategy.risk === 'low' ? 'bg-green-50 text-green-700 border-green-200' : 
                                strategy.risk === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                'bg-red-50 text-red-700 border-red-200'}
                            `}
                          >
                            {strategy.risk === 'low' ? 'Low Risk' : 
                             strategy.risk === 'medium' ? 'Medium Risk' : 
                             'High Risk'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`text-sm font-medium ${strategy.performance.monthly >= 0 ? 'text-financial-up' : 'text-financial-down'}`}>
                          {strategy.performance.monthly >= 0 ? '+' : ''}{strategy.performance.monthly}% MTD
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {strategy.performance.yearly >= 0 ? '+' : ''}{strategy.performance.yearly}% YTD
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={strategy.historicalData.slice(-30)}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={strategy.performance.monthly >= 0 ? '#38A169' : '#E53E3E'} 
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discover New Strategies</CardTitle>
              <CardDescription>Find strategies that match your investment goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label className="mb-2 block">Asset Classes</Label>
                  <div className="space-y-2">
                    {assetTypes.map((asset) => (
                      <div key={asset.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`asset-${asset.value}`} 
                          checked={selectedAssets.includes(asset.value)}
                          onCheckedChange={() => toggleAssetType(asset.value)}
                        />
                        <label 
                          htmlFor={`asset-${asset.value}`}
                          className="text-sm cursor-pointer"
                        >
                          {asset.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Risk Tolerance</Label>
                  <Select 
                    value={selectedRisk} 
                    onValueChange={setSelectedRisk}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Risk Level</SelectItem>
                      {riskLevels.map((risk) => (
                        <SelectItem key={risk.value} value={risk.value}>{risk.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="mb-2 block">Strategy Type</Label>
                  <Select 
                    value={selectedType} 
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Strategy Type</SelectItem>
                      {strategyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredStrategies.length > 0 ? (
                  filteredStrategies.map((strategy) => (
                    <div key={strategy.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-2 md:mb-0">
                          <h3 className="font-medium">{strategy.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{strategy.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">{strategy.type}</Badge>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${strategy.risk === 'low' ? 'bg-green-50 text-green-700 border-green-200' : 
                                  strategy.risk === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                  'bg-red-50 text-red-700 border-red-200'}
                              `}
                            >
                              {strategy.risk === 'low' ? 'Low Risk' : 
                              strategy.risk === 'medium' ? 'Medium Risk' : 
                              'High Risk'}
                            </Badge>
                            {strategy.assets.slice(0, 2).map((asset, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {asset}
                              </Badge>
                            ))}
                            {strategy.assets.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{strategy.assets.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={`text-sm font-medium ${strategy.performance.monthly >= 0 ? 'text-financial-up' : 'text-financial-down'}`}>
                            {strategy.performance.monthly >= 0 ? '+' : ''}{strategy.performance.monthly}% MTD
                          </div>
                          <Button size="sm" className="mt-2">
                            Subscribe
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No strategies match your filters.</p>
                    <Button 
                      variant="link" 
                      className="mt-2"
                      onClick={() => {
                        setSelectedAssets([]);
                        setSelectedRisk("");
                        setSelectedType("");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>Important updates about your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Market Volatility Alert</h4>
                      <p className="text-sm text-muted-foreground">The market is experiencing increased volatility due to recent economic data. Consider reviewing your high-risk positions.</p>
                      <p className="text-xs text-muted-foreground mt-1">April 3, 2023 • 2:45 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-financial-up bg-green-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-financial-up mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">New Investment Opportunity</h4>
                      <p className="text-sm text-muted-foreground">A new diversified crypto strategy with enhanced risk management is now available. This aligns with your investment preferences.</p>
                      <p className="text-xs text-muted-foreground mt-1">April 2, 2023 • 11:20 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-financial-down bg-red-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <ArrowDownIcon className="h-5 w-5 text-financial-down mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Portfolio Risk Notification</h4>
                      <p className="text-sm text-muted-foreground">Your tech sector exposure has increased to 32% of your portfolio, which exceeds your diversification guidelines of 25%.</p>
                      <p className="text-xs text-muted-foreground mt-1">April 1, 2023 • 4:15 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <Bell className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Strategy Update</h4>
                      <p className="text-sm text-muted-foreground">The Global Macro Diversification strategy has been updated with enhanced allocation to emerging markets bonds.</p>
                      <p className="text-xs text-muted-foreground mt-1">March 30, 2023 • 10:05 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
