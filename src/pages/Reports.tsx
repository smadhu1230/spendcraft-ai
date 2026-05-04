// Reports page
import { PageLayout } from "@/components/PageLayout";
import { useFinance } from "@/hooks/useFinance";
import { CategoryPieChart, IncomeVsExpenseLine, SavingsTrendChart } from "@/components/Charts";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingUp, PiggyBank } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { toast } from "sonner";

const Reports = () => {
  const { transactions, income, expense, balance, savingsRate } = useFinance();

  const exportPdf = () => {
    toast.success("Report generated — download starting...");
    setTimeout(() => window.print(), 300);
  };

  return (
    <PageLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your financial story.</p>
        </div>
        <Button onClick={exportPdf} className="bg-gradient-primary text-white border-0 hover-lift">
          <Download className="mr-2 h-4 w-4" /> Export PDF Report
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-4 mb-6">
        {[
          { label: "Income", value: income, icon: TrendingUp, color: "from-emerald to-mint" },
          { label: "Expense", value: expense, icon: FileText, color: "from-rose to-amber" },
          { label: "Net Savings", value: balance, icon: PiggyBank, color: "from-sky to-violet" },
          { label: "Savings Rate", value: savingsRate, icon: TrendingUp, color: "from-violet to-rose", suffix: "%", prefix: "" },
        ].map((c) => (
          <div key={c.label} className="glass-card p-5 hover-lift">
            <div className="text-xs font-semibold text-muted-foreground">{c.label.toUpperCase()}</div>
            <div className="mt-1 text-2xl font-display font-bold tabular-nums">
              <CountUp value={c.value} prefix={c.prefix ?? "₹"} />{c.suffix}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2 mb-6">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Income vs Expense</h3>
          <p className="text-xs text-muted-foreground mb-4">Trend over time</p>
          <IncomeVsExpenseLine transactions={transactions} />
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Category Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribution of expenses</p>
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      <section className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-1">Savings Trend</h3>
        <p className="text-xs text-muted-foreground mb-4">Cumulative savings flow</p>
        <SavingsTrendChart transactions={transactions} />
      </section>
    </PageLayout>
  );
};

export default Reports;
