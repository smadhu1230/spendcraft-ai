// Charts using recharts
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, AreaChart, Area } from "recharts";
import type { Transaction } from "@/lib/types";
import { useMemo } from "react";

const CHART_COLORS = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6", "#06b6d4"];

function monthKey(d: string) {
  const date = new Date(d);
  return date.toLocaleString("en-US", { month: "short" });
}

export function MonthlySpendingChart({ transactions }: { transactions: Transaction[] }) {
  const data = useMemo(() => {
    const map = new Map<string, { month: string; income: number; expense: number }>();
    transactions.forEach((t) => {
      const m = monthKey(t.date || new Date().toISOString());
      const cur = map.get(m) || { month: m, income: 0, expense: 0 };
      if (t.type === "income") cur.income += Number(t.amount);
      else cur.expense += Number(t.amount);
      map.set(m, cur);
    });
    return Array.from(map.values());
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barGap={4}>
        <defs>
          <linearGradient id="g-income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="g-expense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip contentStyle={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--border))", borderRadius: 12, backdropFilter: "blur(8px)" }} />
        <Bar dataKey="income" fill="url(#g-income)" radius={[8, 8, 0, 0]} />
        <Bar dataKey="expense" fill="url(#g-expense)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ transactions }: { transactions: Transaction[] }) {
  const data = useMemo(() => {
    const map = new Map<string, number>();
    transactions.filter((t) => t.type === "expense").forEach((t) => {
      const c = t.category || "Other";
      map.set(c, (map.get(c) || 0) + Number(t.amount));
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (!data.length) return <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">No expenses yet</div>;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={4}>
          {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SavingsTrendChart({ transactions }: { transactions: Transaction[] }) {
  const data = useMemo(() => {
    const map = new Map<string, { month: string; savings: number }>();
    transactions.forEach((t) => {
      const m = monthKey(t.date || new Date().toISOString());
      const cur = map.get(m) || { month: m, savings: 0 };
      cur.savings += t.type === "income" ? Number(t.amount) : -Number(t.amount);
      map.set(m, cur);
    });
    return Array.from(map.values());
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="g-savings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip contentStyle={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
        <Area type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={3} fill="url(#g-savings)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function IncomeVsExpenseLine({ transactions }: { transactions: Transaction[] }) {
  const data = useMemo(() => {
    const map = new Map<string, { month: string; income: number; expense: number }>();
    transactions.forEach((t) => {
      const m = monthKey(t.date || new Date().toISOString());
      const cur = map.get(m) || { month: m, income: 0, expense: 0 };
      if (t.type === "income") cur.income += Number(t.amount);
      else cur.expense += Number(t.amount);
      map.set(m, cur);
    });
    return Array.from(map.values());
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip contentStyle={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
        <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
        <Line type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
