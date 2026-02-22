import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkIcon, QrCode, BarChart3, ArrowRight, Zap, Shield, Globe } from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-20 lg:pt-24 lg:pb-32 flex flex-col items-center text-center">
        <Badge variant="secondary" className="mb-6 px-3 py-1 font-medium bg-muted/50 border-border">
          <Zap className="h-3 w-3 mr-1.5 text-primary fill-primary" />
          The fastest way to share links
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-black font-semibold tracking-tight mb-6 max-w-4xl">
          Shorten. Share. <span className="text-primary">Track.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Transform long, complex URLs into powerful short links and QR codes. 
          Gain deep insights with real-time analytics.
        </p>

        <form
          onSubmit={handleShorten}
          className="w-full max-w-2xl flex flex-col sm:flex-row gap-2 p-1.5 bg-background border border-border rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-primary/20 transition-all"
        >
          <div className="flex-1 relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              value={longUrl}
              placeholder="Paste your long link here..."
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full border-none bg-transparent h-12 pl-11 text-base focus-visible:ring-0"
              required
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 rounded-lg font-semibold group"
          >
            Shorten Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </section>

      {/* Features Section */}
      <section className="w-full py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Lightning Fast",
              desc: "Redirects happen in milliseconds. Your users won't wait.",
            },
            {
              icon: <QrCode className="h-6 w-6" />,
              title: "Smart QR Codes",
              desc: "Every link comes with a customizable, high-quality QR code.",
            },
            {
              icon: <BarChart3 className="h-6 w-6" />,
              title: "Deep Analytics",
              desc: "Track clicks by location, device, and referrer in real-time.",
            },
          ].map((feature, idx) => (
            <Card key={idx} className="border-border bg-card/50 shadow-none">
              <CardContent className="p-8 flex flex-col items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/5 text-primary border border-primary/10">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl pt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm">Everything you need to know about ShortenX</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              {
                q: "How does URL shortening work?",
                a: "When you paste a long URL, we create a tiny path that maps to it. When someone clicks your ShortenX link, our server instantly directs them to the original destination."
              },
              {
                q: "Is it really free?",
                a: "Absolutely. Our core features are free for everyone. We believe in making the web more accessible for everyone."
              },
              {
                q: "What kind of analytics do I get?",
                a: "You can track total clicks, unique visitors, geographic location (country/city), device types (mobile/desktop), and even which websites sent traffic to your links."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border bg-card rounded-lg px-2 shadow-none data-[state=open]:border-primary/20 transition-all">
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-4 px-3">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-4 px-3">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      </section>
    </div>
  );
};

export default LandingPage;
