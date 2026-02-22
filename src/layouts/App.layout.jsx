import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <Outlet />
        </div>
      </main>

      <footer className="w-full border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            <h2 className="text-xl font-black font-semibold tracking-tighter">ShortenX</h2>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              High-performance URL shortening for modern teams and creators.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end">
            <div className="flex gap-2">
              <a href="https://x.com/Bh20291Kartikey" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://github.com/kartikey2004-git/URL-Shortener" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/kartikey-bhatnagar-2702a4337" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Made by <span className="text-foreground font-bold italic">Kartikey</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 py-4 text-center bg-muted/30">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            © {new Date().getFullYear()} ShortenX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;


