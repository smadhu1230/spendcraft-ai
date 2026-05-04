// Stat card with gradient + animated counter
import { LucideIcon } from "lucide-react";
import { CountUp } from "./CountUp";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  prefix?: string;
  icon: LucideIcon;
  gradient: "emerald" | "sky" | "rose" | "violet";
  trend?: string;
  suffix?: string;
}

const gradientMap = {
  emerald: "bg-gradient-emerald",
  sky: "bg-gradient-sky",
  rose: "bg-gradient-rose",
  violet: "bg-gradient-violet",
};

export function StatCard({ label, value, prefix = "₹", icon: Icon, gradient, trend, suffix }: Props) {
  return (
    <div className="glass-card hover-lift p-6 relative overflow-hidden group">
      {/* glow blob */}
      <div className={cn("absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity", gradientMap[gradient])} />
      <div className="flex items-start justify-between mb-4 relative">
        <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-lg", gradientMap[gradient])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald/10 text-emerald">
            {trend}
          </span>
        )}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
      <div className="mt-1 text-3xl font-display font-bold tracking-tight">
        <CountUp value={value} prefix={prefix} />
        {suffix && <span className="text-xl ml-1">{suffix}</span>}
      </div>
    </div>
  );
}
