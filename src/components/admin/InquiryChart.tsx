"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface InquiryChartProps {
    data: { month: string, inquiries: number }[];
}

export default function InquiryChart({ data }: InquiryChartProps) {
    return (
        <div className="w-full h-[300px] text-[12px] font-sans">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                        dataKey="month" 
                        stroke="#666" 
                        tick={{ fill: '#888' }} 
                        axisLine={false} 
                        tickLine={false} 
                    />
                    <YAxis 
                        stroke="#666" 
                        tick={{ fill: '#888' }} 
                        axisLine={false} 
                        tickLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px' }}
                        itemStyle={{ color: '#EAB308' }}
                        labelStyle={{ color: '#888', marginBottom: '4px' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="inquiries" 
                        stroke="#EAB308" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorInquiries)" 
                        activeDot={{ r: 6, fill: '#EAB308', stroke: '#000', strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
