import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, Lightbulb, Users, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  completedChallenges: number;
  totalChallenges: number;
  color: string;
  dbCategory: string;
}

const categoryMapping: Category[] = [
  {
    id: "recycle",
    name: "Reciclare",
    icon: <Recycle className="w-6 h-6" />,
    description: "Reduce, refolosește, reciclează",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-primary/10 text-primary",
    dbCategory: "reciclare"
  },
  {
    id: "energy",
    name: "Energie",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Economisește energie și resurse",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-accent/10 text-accent",
    dbCategory: "energie"
  },
  {
    id: "community",
    name: "Comunitate",
    icon: <Users className="w-6 h-6" />,
    description: "Implică-te în acțiuni locale",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-blue-500/10 text-blue-600",
    dbCategory: "comunitate"
  },
  {
    id: "wellness",
    name: "Echilibru Personal",
    icon: <Heart className="w-6 h-6" />,
    description: "Grija de tine și de natură",
    completedChallenges: 0,
    totalChallenges: 0,
    color: "bg-pink-500/10 text-pink-600",
    dbCategory: "wellness"
  }
];

export const CategoryCards = () => {
  const [categories, setCategories] = useState<Category[]>(categoryMapping);

  useEffect(() => {
    fetchCategoryProgress();
  }, []);

  const fetchCategoryProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: allChallenges } = await supabase
        .from('challenges')
        .select('id, category');

      const { data: completions } = await supabase
        .from('completions')
        .select('challenge_id, verified')
        .eq('user_id', user.id)
        .eq('verified', true);

      if (!allChallenges) return;

      const completedChallengeIds = new Set(completions?.map(c => c.challenge_id) || []);

      const updatedCategories = categoryMapping.map(category => {
        const categoryLower = category.dbCategory.toLowerCase();
        const totalInCategory = allChallenges.filter(
          c => c.category.toLowerCase() === categoryLower
        ).length;
        const completedInCategory = allChallenges.filter(
          c => c.category.toLowerCase() === categoryLower && completedChallengeIds.has(c.id)
        ).length;

        return {
          ...category,
          totalChallenges: totalInCategory,
          completedChallenges: completedInCategory
        };
      });

      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error fetching category progress:', error);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
        Categorii de Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card 
            key={category.id} 
            className="shadow-medium hover:shadow-strong transition-all cursor-pointer group hover:scale-105 duration-300 border-2 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            <CardHeader className="p-4">
              <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                {category.icon}
              </div>
              <CardTitle className="text-base group-hover:text-primary transition-colors">{category.name}</CardTitle>
              <CardDescription className="text-sm line-clamp-2">{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  Progres
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category.completedChallenges}/{category.totalChallenges}
                </Badge>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-700 group-hover:shadow-glow relative overflow-hidden"
                  style={{ 
                    width: `${category.totalChallenges > 0 ? (category.completedChallenges / category.totalChallenges) * 100 : 0}%` 
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
