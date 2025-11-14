import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { DailyChallenge } from "@/components/DailyChallenge";
import { StatsDisplay } from "@/components/StatsDisplay";
import { CategoryCards } from "@/components/CategoryCards";
import { BadgeGallery } from "@/components/BadgeGallery";
import { AdsSidebar } from "@/components/AdsSidebar";
import { PromotedJobs } from "@/components/PromotedJobs";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Se încarcă...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - visible only on large screens */}
          <aside className="hidden lg:block lg:col-span-3">
            <AdsSidebar position="left" />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6 space-y-12">
            <Hero user={user} />
            <PromotedJobs />
            <DailyChallenge />
            <StatsDisplay />
            <CategoryCards />
            <BadgeGallery />
          </main>

          {/* Right Sidebar - visible only on large screens */}
          <aside className="hidden lg:block lg:col-span-3">
            <AdsSidebar position="right" />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;