import { Hero } from "@/components/Hero";
import { DailyChallenge } from "@/components/DailyChallenge";
import { StatsDisplay } from "@/components/StatsDisplay";
import { CategoryCards } from "@/components/CategoryCards";
import { BadgeGallery } from "@/components/BadgeGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Hero />
      
      <main id="dashboard" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
            Dashboard-ul Tău
          </h2>
          
          <StatsDisplay />
          
          <div className="mb-12">
            <DailyChallenge />
          </div>
          
          <CategoryCards />
          
          <BadgeGallery />
        </div>
      </main>

      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Green&Go • Transformă grija față de mediu într-o experiență plăcută 🌎</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
