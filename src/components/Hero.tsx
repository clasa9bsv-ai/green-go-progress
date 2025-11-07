import { Button } from "@/components/ui/button";
import { Leaf, Sparkles } from "lucide-react";

export const Hero = () => {
  const scrollToDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-bg">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMmM1NWUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMS4xMDUtLjg5NSAyLTIgMnMtMi0uODk1LTItMiAuODk1LTIgMi0yIDIgLjg5NSAyIDJ6bS0yIDZ2MTZoMlYyMmgtMnptMC0yMGMtMS4xMDUgMC0yIC44OTUtMiAycy44OTUgMiAyIDIgMi0uODk1IDItMi0uODk1LTItMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Schimbă lumea, o zi odată</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Green&Go
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-4 leading-relaxed">
            Transformă fiecare zi într-o provocare sustenabilă
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Adopță obiceiuri eco-friendly prin provocări zilnice simple. Câștigă puncte, 
            deblochează insigne și fii parte din comunitatea care schimbă lumea. 🌍
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToDashboard}
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-strong"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Începe Provocarea
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/5 text-lg px-8 py-6"
            >
              Descoperă Mai Mult
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
