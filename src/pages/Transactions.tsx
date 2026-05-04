// Transactions page — searchable, filterable table
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit2, Trash2, ArrowUpDown } from "lucide-react";
import { useFinance } from "@/hooks/useFinance";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Transactions = () => {
  const { transactions, add, remove, loading } = useFinance();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (q) list = list.filter((t) => (t.description || "").toLowerCase().includes(q.toLowerCase()) || (t.category || "").toLowerCase().includes(q.toLowerCase()));
    if (typeFilter !== "all") list = list.filter((t) => t.type === typeFilter);
    if (catFilter !== "all") list = list.filter((t) => t.category === catFilter);
    list.sort((a, b) => sortBy === "amount" ? Number(b.amount) - Number(a.amount) : new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    return list;
  }, [transactions, q, typeFilter, catFilter, sortBy]);

  return (
    <PageLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">Every penny, perfectly organized.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-gradient-emerald text-white border-0 hover-lift">
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      <div className="glass-card p-5 mb-4 grid gap-3 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search description or category..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {["Food", "Travel", "Shopping", "Bills", "Salary", "Other"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4 cursor-pointer" onClick={() => setSortBy(sortBy === "amount" ? "date" : "amount")}>
                  <span className="inline-flex items-center gap-1">Amount <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? [...Array(6)].map((_, i) => (
                <tr key={i}><td colSpan={7} className="px-5 py-3"><div className="h-8 rounded bg-muted animate-pulse" /></td></tr>
              )) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-muted-foreground">No transactions match your filters</td></tr>
              ) : filtered.map((t) => (
                <tr key={t.id} className="border-b border-border/40 hover:bg-white/40 transition-colors">
                  <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">{t.date}</td>
                  <td className="px-5 py-4 font-medium">{t.description || "—"}</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium">{t.category}</span></td>
                  <td className="px-5 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold",
                      t.type === "income" ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose")}>
                      {t.type}
                    </span>
                  </td>
                  <td className={cn("px-5 py-4 font-display font-semibold tabular-nums", t.type === "income" ? "text-emerald" : "text-rose")}>
                    {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium",
                      t.status === "pending" ? "text-amber" : "text-emerald")}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", t.status === "pending" ? "bg-amber" : "bg-emerald")} />
                      {t.status || "completed"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toast("Edit coming soon")} className="p-2 rounded-lg hover:bg-secondary transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
                      <button onClick={() => { remove(t.id); toast.success("Transaction removed"); }} className="p-2 rounded-lg hover:bg-rose/10 hover:text-rose transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTransactionDialog open={open} onOpenChange={setOpen} onSubmit={add} />
    </PageLayout>
  );
};

export default Transactions;
