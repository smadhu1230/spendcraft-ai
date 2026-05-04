// Add Transaction modal — POST /api/add
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import type { AddTransactionPayload, TransactionType, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (p: AddTransactionPayload) => Promise<void> | void;
  defaultType?: TransactionType;
}

const CATEGORIES: Category[] = ["Food", "Travel", "Shopping", "Bills", "Salary", "Other"];

export function AddTransactionDialog({ open, onOpenChange, onSubmit, defaultType = "expense" }: Props) {
  const [type, setType] = useState<TransactionType>(defaultType);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Category>("Food");
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setType(defaultType); setAmount(""); setDescription(""); setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) { toast.error("Please enter a valid amount"); return; }
    setSubmitting(true);
    try {
      await onSubmit({ type, amount: amt, description, category, date });
      toast.success(`✨ ${type === "income" ? "Income" : "Expense"} of ₹${amt.toLocaleString("en-IN")} added!`);
      reset();
      onOpenChange(false);
    } catch {
      toast.error("Failed to add transaction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-white/40">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Sparkles className="h-5 w-5 text-emerald" />
            Add Transaction
          </DialogTitle>
          <DialogDescription>Track your money — every rupee counts.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-muted">
            <button type="button" onClick={() => setType("income")}
              className={cn("flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
                type === "income" ? "bg-gradient-emerald text-white shadow-lg" : "text-muted-foreground")}>
              <TrendingUp className="h-4 w-4" /> Income
            </button>
            <button type="button" onClick={() => setType("expense")}
              className={cn("flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
                type === "expense" ? "bg-gradient-rose text-white shadow-lg" : "text-muted-foreground")}>
              <TrendingDown className="h-4 w-4" /> Expense
            </button>
          </div>

          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input id="amount" type="number" inputMode="decimal" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1.5 text-lg font-semibold h-12" autoFocus />
          </div>

          <div>
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" placeholder="What was it for?" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={reset} className="flex-1">Reset</Button>
            <Button type="submit" disabled={submitting} className="flex-1 bg-gradient-emerald hover:opacity-90 text-white border-0">
              {submitting ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
