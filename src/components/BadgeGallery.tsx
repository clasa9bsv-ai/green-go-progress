import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
}

const badges: BadgeItem[] = [
  {
    id: "first-steps",
    name: "Primii Pași",
    description: "Completează prima provocare",
    emoji: "🌱",
    earned: true
  },
  {
    id: "eco-warrior",
    name: "Eco Warrior",
    description: "Completează 10 provocări",
    emoji: "🛡️",
    earned: true
  },
  {
    id: "recycling-pro",
    name: "Expert Reciclare",
    description: "Completează toate provocările de reciclare",
    emoji: "♻️",
    earned: true
  },
  {
    id: "energy-saver",
    name: "Salvator de Energie",
    description: "Completează 5 provocări de energie",
    emoji: "⚡",
    earned: false
  },
  {
    id: "community-hero",
    name: "Erou Comunitar",
    description: "Implică-te în 3 acțiuni comunitare",
    emoji: "🤝",
    earned: false
  },
  {
    id: "green-legend",
    name: "Legendă Verde",
    description: "Atinge nivelul 10",
    emoji: "🏆",
    earned: false
  }
];

export const BadgeGallery = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
        Insignele Tale
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {badges.map((badge, index) => (
          <Card 
            key={badge.id}
            className={`shadow-medium transition-all text-center border-2 animate-in fade-in slide-in-from-bottom-4 ${
              badge.earned 
                ? 'hover:shadow-strong cursor-pointer hover:scale-110 hover:-rotate-2 hover:border-primary/50 duration-300' 
                : 'opacity-60 grayscale hover:opacity-70'
            }`}
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
          >
            <CardContent className="pt-6 pb-4">
              <div className={`text-6xl mb-4 transition-transform duration-300 ${badge.earned ? 'group-hover:scale-125 group-hover:animate-float' : ''}`}>
                {badge.emoji}
              </div>
              <h3 className="font-bold text-base mb-2">{badge.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
              {badge.earned && (
                <Badge className="mt-3 bg-gradient-primary text-primary-foreground shadow-md hover:shadow-glow transition-all" variant="secondary">
                  ✓ Câștigat
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
