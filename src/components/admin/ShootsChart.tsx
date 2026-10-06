"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
    bookings: { date: string }[];
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ShootsChart({ bookings }: ShootsChartProps) {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const years = useMemo(() => {
        const bookingYears = bookings
            .map((booking) => Number(booking.date.slice(0, 4)))
            .filter((year) => Number.isInteger(year));

        return Array.from(new Set([currentYear, ...bookingYears])).sort((a, b) => b - a);
    }, [bookings, currentYear]);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const data = months.map((month, monthIndex) => ({
        month,
        monthIndex,
        shoots: bookings.filter((booking) => booking.date.startsWith(`${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}`)).length
    }));

    const openMonth = (monthIndex: number) => {
        router.push(`/admin/bookings?year=${selectedYear}&month=${String(monthIndex + 1).padStart(2, "0")}`);
    };

    return (
        <div className="w-full text-[12px] font-sans">
            <div className="flex justify-end mb-2">
                <label className="sr-only" htmlFor="shoots-year">Shoots year</label>
                <select
                    id="shoots-year"
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(Number(event.target.value))}
                    className="bg-transparent border border-[var(--color-border)] rounded-sm px-3 py-2 text-xs text-[var(--color-muted)] focus:outline-none focus:border-gold"
                >
                    {years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
            </div>
            <div className="w-full h-[270px]">
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
                                cursor="pointer"
                                onClick={() => openMonth(entry.monthIndex)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}
