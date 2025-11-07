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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <Card 
            key={badge.id}
            className={`shadow-soft transition-all text-center ${
              badge.earned 
                ? 'hover:shadow-medium cursor-pointer hover:scale-105' 
                : 'opacity-50 grayscale'
            }`}
          >
            <CardContent className="pt-6 pb-4">
              <div className="text-5xl mb-3">{badge.emoji}</div>
              <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {badge.earned && (
                <Badge className="mt-2 bg-success" variant="secondary">
                  Câștigat
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
