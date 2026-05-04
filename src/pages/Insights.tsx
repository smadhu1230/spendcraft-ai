// AI Insights page
import { PageLayout } from "@/components/PageLayout";
import { AIAdvisor } from "@/components/AIAdvisor";
import { useFinance } from "@/hooks/useFinance";
import { TrendingUp, Target, Brain } from "lucide-react";
import { CountUp } from "@/components/CountUp";

const Insights = () => {
  const { transactions, expense, savingsRate } = useFinance();
  const goal = 50000;
  const progress = Math.min(100, Math.round((expense / goal) * 100));
  const predicted = Math.round(expense * 1.08);

  return (
    <PageLayout>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-3 text-xs font-semibold">
          <Brain className="h-3.5 w-3.5 text-violet" />
          <span className="gradient-text-emerald">Powered by AI</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">AI Financial Advisor</h1>
        <p className="text-muted-foreground mt-1">Personalized insights, predictions, and recommendations — just for you.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet mb-2">
            <TrendingUp className="h-4 w-4" /> EXPENSE PREDICTION
          </div>
          <div className="text-3xl font-display font-bold gradient-text">
            <CountUp value={predicted} prefix="₹" />
          </div>
          <div className="text-xs text-muted-foreground mt-1">Forecasted next month spending</div>
        </div>

        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald mb-2">
            <Target className="h-4 w-4" /> MONTHLY SAVINGS GOAL
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-display font-bold"><CountUp value={savingsRate} suffix="%" /></div>
            <div className="text-xs text-muted-foreground">of 30%</div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-gradient-emerald rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (savingsRate / 30) * 100)}%` }} />
          </div>
        </div>

        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber mb-2">
            <Target className="h-4 w-4" /> BUDGET USAGE
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-display font-bold"><CountUp value={progress} suffix="%" /></div>
            <div className="text-xs text-muted-foreground">of ₹{goal.toLocaleString("en-IN")}</div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-gradient-rose rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <AIAdvisor transactions={transactions} />
    </PageLayout>
  );
};

export default Insights;
