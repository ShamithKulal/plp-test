"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface ShootsChartProps {
    data: { month: string, shoots: number }[];
}

export default function ShootsChart({ data }: ShootsChartProps) {
    return (
        <div className="w-full h-[300px] text-[12px] font-sans">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorShoots" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EAB308" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#EAB308" stopOpacity={0.3}/>
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
                        cursor={{ fill: 'rgba(234, 179, 8, 0.05)' }}
                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '4px' }}
                        itemStyle={{ color: '#EAB308' }}
                        labelStyle={{ color: '#888', marginBottom: '4px' }}
                    />
                    <Bar 
                        dataKey="shoots" 
                        radius={[2, 2, 0, 0]}
                        barSize={28}
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.shoots > 0 ? "url(#colorShoots)" : "#1a1a2e"} 
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
