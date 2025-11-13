import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, Lightbulb, Users, Heart } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  completedChallenges: number;
  totalChallenges: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "recycle",
    name: "Reciclare",
    icon: <Recycle className="w-6 h-6" />,
    description: "Reduce, refolosește, reciclează",
    completedChallenges: 5,
    totalChallenges: 10,
    color: "bg-primary/10 text-primary"
  },
  {
    id: "energy",
    name: "Energie",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Economisește energie și resurse",
    completedChallenges: 3,
    totalChallenges: 8,
    color: "bg-accent/10 text-accent"
  },
  {
    id: "community",
    name: "Comunitate",
    icon: <Users className="w-6 h-6" />,
    description: "Implică-te în acțiuni locale",
    completedChallenges: 2,
    totalChallenges: 6,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    id: "wellness",
    name: "Echilibru Personal",
    icon: <Heart className="w-6 h-6" />,
    description: "Grija de tine și de natură",
    completedChallenges: 2,
    totalChallenges: 7,
    color: "bg-pink-500/10 text-pink-600"
  }
];

export const CategoryCards = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
        Categorii de Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card 
            key={category.id} 
            className="shadow-medium hover:shadow-strong transition-all cursor-pointer group hover:scale-105 duration-300 border-2 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            <CardHeader>
              <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                {category.icon}
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{category.name}</CardTitle>
              <CardDescription className="text-base">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Progres
                </span>
                <Badge variant="secondary">
                  {category.completedChallenges}/{category.totalChallenges}
                </Badge>
              </div>
              <div className="w-full bg-secondary h-3 rounded-full mt-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-700 group-hover:shadow-glow relative overflow-hidden"
                  style={{ 
                    width: `${(category.completedChallenges / category.totalChallenges) * 100}%` 
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
