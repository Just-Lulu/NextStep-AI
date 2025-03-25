import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { LineChartIcon, BriefcaseIcon } from '@/components/ui/icons';
import type { MarketTrend } from '@shared/schema';

interface FormattedMarketTrend {
  month: string;
  [key: string]: string | number;
}

const MarketTrendsVisualization: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("12");
  
  const { data: marketTrends, isLoading } = useQuery<MarketTrend[]>({
    queryKey: ['/api/market-trends'],
  });

  const [formattedData, setFormattedData] = useState<FormattedMarketTrend[]>([]);

  useEffect(() => {
    if (marketTrends) {
      // Process the market trends data to format it for the chart
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      // Group data by month
      const groupedByMonth = months.map(month => {
        const monthData: FormattedMarketTrend = { month };
        
        // Find all careers for this month
        const monthTrends = marketTrends.filter(trend => trend.month === month);
        
        // Add each career's job count to the month data
        monthTrends.forEach(trend => {
          monthData[trend.careerTitle] = trend.jobCount;
        });
        
        return monthData;
      });
      
      // Filter based on selected time frame
      const filteredData = groupedByMonth.slice(-parseInt(timeFrame));
      
      setFormattedData(filteredData);
    }
  }, [marketTrends, timeFrame]);

  // Sample data when we don't have real data yet
  const sampleData = [
    { month: "Jan", "Data Science": 110, "UX Design": 95, "Product Management": 80 },
    { month: "Feb", "Data Science": 125, "UX Design": 100, "Product Management": 88 },
    { month: "Mar", "Data Science": 140, "UX Design": 108, "Product Management": 95 },
    { month: "Apr", "Data Science": 152, "UX Design": 115, "Product Management": 102 },
    { month: "May", "Data Science": 158, "UX Design": 122, "Product Management": 110 },
    { month: "Jun", "Data Science": 170, "UX Design": 130, "Product Management": 115 },
    { month: "Jul", "Data Science": 185, "UX Design": 135, "Product Management": 122 },
    { month: "Aug", "Data Science": 190, "UX Design": 142, "Product Management": 128 },
    { month: "Sep", "Data Science": 205, "UX Design": 148, "Product Management": 135 },
    { month: "Oct", "Data Science": 220, "UX Design": 155, "Product Management": 140 },
    { month: "Nov", "Data Science": 235, "UX Design": 160, "Product Management": 148 },
    { month: "Dec", "Data Science": 245, "UX Design": 168, "Product Management": 155 }
  ];

  // Filter sample data based on timeFrame
  const filteredSampleData = sampleData.slice(-parseInt(timeFrame));
  
  // Use real data if available, otherwise use sample data
  const displayData = formattedData.length > 0 ? formattedData : filteredSampleData;

  const colors = {
    "Data Science": "#3B82F6", // primary blue
    "UX Design": "#8B5CF6",    // purple
    "Product Management": "#10B981" // green
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Job Market Trends</h2>
        <Select
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">Last 12 Months</SelectItem>
            <SelectItem value="6">Last 6 Months</SelectItem>
            <SelectItem value="3">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-6 h-[220px]">
        {isLoading ? (
          <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Loading market trends...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={displayData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={false}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Data Science"
                stroke={colors["Data Science"]}
                activeDot={{ r: 6 }}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="UX Design"
                stroke={colors["UX Design"]}
                activeDot={{ r: 6 }}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Product Management"
                stroke={colors["Product Management"]}
                activeDot={{ r: 6 }}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 border border-gray-200 bg-gray-50">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">
              <LineChartIcon />
            </div>
            <h3 className="ml-2 text-sm font-medium text-gray-700">Fastest Growing</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Data Science</span>
              <span className="text-xs font-medium text-green-500">+24%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">AI Engineer</span>
              <span className="text-xs font-medium text-green-500">+18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Cloud Architect</span>
              <span className="text-xs font-medium text-green-500">+15%</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border border-gray-200 bg-gray-50">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-primary">
              <BriefcaseIcon />
            </div>
            <h3 className="ml-2 text-sm font-medium text-gray-700">Top Industries</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Technology</span>
              <span className="text-xs font-medium text-gray-800">42%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Healthcare</span>
              <span className="text-xs font-medium text-gray-800">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Financial Services</span>
              <span className="text-xs font-medium text-gray-800">15%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketTrendsVisualization;
