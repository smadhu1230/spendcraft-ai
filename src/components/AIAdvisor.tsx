// AI Advisor — chatbot-style card with insights
import { useState } from "react";
import { Brain, Send, Sparkles, TrendingDown, Lightbulb, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/lib/types";

interface Props { transactions: Transaction[]; compact?: boolean; }

const QUICK_PROMPTS = [
  "How much did I spend this month?",
  "Suggest saving tips",
  "Where am I overspending?",
];

function generateReply(q: string, tx: Transaction[]) {
  const expenses = tx.filter((t) => t.type === "expense");
  const total = expenses.reduce((s, t) => s + Number(t.amount), 0);
  if (/spend|expense/i.test(q)) return `You've spent ₹${total.toLocaleString("en-IN")} across ${expenses.length} expenses. Your top category is ${topCategory(tx)}.`;
  if (/save|saving/i.test(q)) return `Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. You could save ₹${Math.round(total * 0.15).toLocaleString("en-IN")} more by trimming dining out.`;
  if (/over/i.test(q)) return `Your highest category is ${topCategory(tx)}. Consider setting a monthly cap of ₹${Math.round(total * 0.25).toLocaleString("en-IN")} on it.`;
  return "I can analyze your spending patterns, suggest savings, and forecast your monthly budget. Try one of the prompts above!";
}

function topCategory(tx: Transaction[]) {
  const map = new Map<string, number>();
  tx.filter((t) => t.type === "expense").forEach((t) => map.set(t.category || "Other", (map.get(t.category || "Other") || 0) + Number(t.amount)));
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || "Food";
}

export function AIAdvisor({ transactions, compact }: Props) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your SmartSpend AI advisor. Ask me anything about your finances. 🌱" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "ai", text: generateReply(text, transactions) }]);
    setInput("");
  };

  const insights = [
    { icon: TrendingDown, color: "text-rose bg-rose/10", title: "Food spending up 22%", desc: "Compared to last month" },
    { icon: Lightbulb, color: "text-amber bg-amber/10", title: "Reduce entertainment", desc: "Save ~₹2,000/mo" },
    { icon: Target, color: "text-emerald bg-emerald/10", title: "Savings potential", desc: "₹4,500 this month" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {!compact && (
        <div className="lg:col-span-2 space-y-3">
          {insights.map((i) => (
            <div key={i.title} className="glass-card p-4 hover-lift flex items-start gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${i.color}`}>
                <i.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{i.title}</div>
                <div className="text-xs text-muted-foreground">{i.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={compact ? "lg:col-span-5" : "lg:col-span-3"}>
        <div className="glass-card p-5 flex flex-col h-[420px]">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/60">
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-violet flex items-center justify-center text-white">
                <Brain className="h-5 w-5" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="font-display font-semibold text-sm">AI Financial Advisor</div>
              <div className="text-xs text-emerald">● Online · Personalized for you</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.role === "user" ? "bg-gradient-primary text-white rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 my-3">
            {QUICK_PROMPTS.map((p) => (
              <button key={p} onClick={() => send(p)} className="text-xs px-3 py-1.5 rounded-full bg-emerald/10 text-emerald hover:bg-emerald/20 transition-colors">
                <Sparkles className="inline h-3 w-3 mr-1" />{p}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <Input placeholder="Ask SmartSpend AI anything about your finances..." value={input} onChange={(e) => setInput(e.target.value)} />
            <Button type="submit" size="icon" className="bg-gradient-emerald text-white border-0 shrink-0"><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </div>
    </div>
  );
}
