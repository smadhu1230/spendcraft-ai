// Top navigation with glassmorphism
import { Link, useLocation } from "react-router-dom";
import { Sparkles, LayoutDashboard, ArrowLeftRight, Brain, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Brain },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
];

export function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-white/40">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-emerald blur-md opacity-60 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className="relative h-9 w-9 rounded-xl bg-gradient-emerald flex items-center justify-center text-white">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg gradient-text">SmartSpend AI</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">Track smarter. Spend wiser.</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    active
                      ? "text-white bg-gradient-primary shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20">
              <div className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-xs font-medium text-emerald">AI Online</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-violet flex items-center justify-center text-white text-sm font-semibold shadow-lg">
              SS
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center justify-around border-t border-white/40 px-2 py-2">
          {links.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} className={cn("flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px]", active ? "text-emerald" : "text-muted-foreground")}>
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
