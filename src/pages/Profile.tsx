// Profile page
import { PageLayout } from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Mail, User, Target, Bell, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("Sahil Sharma");
  const [email, setEmail] = useState("sahil@smartspend.ai");
  const [budget, setBudget] = useState("50000");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [aiTips, setAiTips] = useState(true);

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-card p-6 text-center lg:col-span-1">
          <div className="relative inline-block">
            <div className="h-24 w-24 rounded-full bg-gradient-violet flex items-center justify-center text-white text-3xl font-display font-bold shadow-xl mx-auto">SS</div>
            <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-emerald border-4 border-background flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
          <h2 className="mt-4 font-display font-bold text-xl">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/10 text-emerald text-xs font-semibold">
            <Shield className="h-3 w-3" /> Premium Member
          </div>

          <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-2 gap-4 text-left">
            <div>
              <div className="text-xs text-muted-foreground">Joined</div>
              <div className="font-semibold text-sm">Jan 2026</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Streak</div>
              <div className="font-semibold text-sm">42 days 🔥</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name"><User className="inline h-3.5 w-3.5 mr-1" /> Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email"><Mail className="inline h-3.5 w-3.5 mr-1" /> Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="budget"><Target className="inline h-3.5 w-3.5 mr-1" /> Monthly Budget Goal (₹)</Label>
                <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1.5" />
              </div>
              <Button onClick={() => toast.success("Profile saved!")} className="bg-gradient-emerald text-white border-0">Save Changes</Button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</h3>
            <div className="space-y-4">
              {[
                { label: "Email notifications", desc: "Weekly spending summaries", value: emailNotif, set: setEmailNotif },
                { label: "Push notifications", desc: "Real-time transaction alerts", value: pushNotif, set: setPushNotif },
                { label: "AI tips & insights", desc: "Personalized recommendations", value: aiTips, set: setAiTips },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                  <Switch checked={p.value} onCheckedChange={p.set} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
