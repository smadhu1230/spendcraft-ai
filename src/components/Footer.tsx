// Footer
import { Sparkles, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-white/40 backdrop-blur">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-emerald flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display font-bold gradient-text">SmartSpend AI</span>
          </div>
          <p className="text-sm text-muted-foreground">Your AI-powered companion for intelligent personal finance.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-emerald transition-colors">About</a></li>
            <li><a href="#" className="hover:text-emerald transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-emerald transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-emerald transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-emerald transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald transition-colors">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Connect</h4>
          <a href="#" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald transition-colors">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © 2026 SmartSpend AI · Built with intelligence
      </div>
    </footer>
  );
}
