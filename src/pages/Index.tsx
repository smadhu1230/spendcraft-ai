// Dashboard / Landing page
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { StatCard } from "@/components/StatCard";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Plus, Brain, Download, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinance } from "@/hooks/useFinance";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { MonthlySpendingChart, CategoryPieChart } from "@/components/Charts";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { transactions, loading, usingMock, add, balance, income, expense, savingsRate } = useFinance();
  const [open, setOpen] = useState(false);
  const [defaultType, setDefaultType] = useState<"income" | "expense">("expense");

  const recent = [...transactions].slice(0, 5);

  const openDialog = (t: "income" | "expense") => { setDefaultType(t); setOpen(true); };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 border border-white/40">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-emerald/30 blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-emerald" />
            <span className="gradient-text-emerald">AI-Powered Finance · 2026</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Manage your money <br />
            <span className="gradient-text">intelligently with AI</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Track expenses, grow savings, and get personalized insights from your AI financial advisor — all in one beautifully designed dashboard.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => openDialog("expense")} size="lg" className="bg-gradient-emerald text-white border-0 shadow-lg hover:opacity-90 hover-lift">
              <Plus className="mr-2 h-5 w-5" /> Add Transaction
            </Button>
            <Link to="/insights">
              <Button size="lg" variant="outline" className="glass border-white/60 hover-lift">
                <Brain className="mr-2 h-5 w-5" /> View Insights
              </Button>
            </Link>
          </div>
          {usingMock && (
            <p className="mt-4 text-xs text-muted-foreground">
              ⚡ Using demo data — connect your Spring Boot API at <code className="px-1.5 py-0.5 rounded bg-muted">localhost:8085</code>
            </p>
          )}
        </div>
      </section>

      {/* Stat cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Balance" value={balance} icon={Wallet} gradient="emerald" trend="+12.5%" />
        <StatCard label="Total Income" value={income} icon={TrendingUp} gradient="sky" trend="+8.2%" />
        <StatCard label="Total Expense" value={expense} icon={TrendingDown} gradient="rose" trend="-3.1%" />
        <StatCard label="Savings Rate" value={savingsRate} prefix="" suffix="%" icon={PiggyBank} gradient="violet" trend="Healthy" />
      </section>

      {/* Charts */}
      <section className="grid gap-4 lg:grid-cols-3 mb-8">
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg">Monthly Cashflow</h3>
              <p className="text-xs text-muted-foreground">Income vs expenses by month</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald" />Income</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose" />Expense</span>
            </div>
          </div>
          <MonthlySpendingChart transactions={transactions} />
        </div>

        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg">By Category</h3>
          <p className="text-xs text-muted-foreground mb-4">Where your money goes</p>
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      {/* Recent + Quick Actions */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs font-semibold text-emerald hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />)}</div>
          ) : recent.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No transactions yet — add your first one!</div>
          ) : (
            <ul className="divide-y divide-border/60">
              {recent.map((t) => (
                <li key={t.id} className="flex items-center gap-4 py-3 group">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                    t.type === "income" ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose")}>
                    {t.type === "income" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{t.description || t.category}</div>
                    <div className="text-xs text-muted-foreground">{t.category} · {t.date}</div>
                  </div>
                  <div className={cn("font-display font-semibold tabular-nums", t.type === "income" ? "text-emerald" : "text-rose")}>
                    {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg">Quick Actions</h3>
          <button onClick={() => openDialog("income")} className="w-full glass-card hover-lift p-5 text-left flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-emerald flex items-center justify-center text-white"><TrendingUp className="h-5 w-5" /></div>
            <div>
              <div className="font-semibold">Add Income</div>
              <div className="text-xs text-muted-foreground">Record salary or earnings</div>
            </div>
          </button>
          <button onClick={() => openDialog("expense")} className="w-full glass-card hover-lift p-5 text-left flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-rose flex items-center justify-center text-white"><TrendingDown className="h-5 w-5" /></div>
            <div>
              <div className="font-semibold">Add Expense</div>
              <div className="text-xs text-muted-foreground">Log a purchase</div>
            </div>
          </button>
          <Link to="/reports" className="block">
            <div className="glass-card hover-lift p-5 flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-sky flex items-center justify-center text-white"><Download className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold">Download Report</div>
                <div className="text-xs text-muted-foreground">Export PDF analytics</div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <AddTransactionDialog open={open} onOpenChange={setOpen} onSubmit={add} defaultType={defaultType} />
    </PageLayout>
  );
};

export default Dashboard;
