import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Recycle, Droplet, Wind, Leaf, Battery } from "lucide-react";

interface Ad {
  id: string;
  title: string;
  description: string;
  provider: string;
  icon: any;
  category: string;
}

const ads: Ad[] = [
  {
    id: "1",
    title: "Schimb Becuri LED",
    description: "Înlocuiesc becurile vechi cu LED-uri economice. Reducere 30% consum energie!",
    provider: "EcoLight Services",
    icon: Lightbulb,
    category: "Energie"
  },
  {
    id: "2",
    title: "Colectare Deșeuri",
    description: "Servicii de reciclare și colectare selectivă la domiciliu. Program flexibil!",
    provider: "GreenRecycle",
    icon: Recycle,
    category: "Reciclare"
  },
  {
    id: "3",
    title: "Economizoare Apă",
    description: "Instalez sisteme de economisire apă. Reduce consumul cu până la 50%!",
    provider: "AquaSave",
    icon: Droplet,
    category: "Apă"
  },
  {
    id: "4",
    title: "Panouri Solare",
    description: "Consultanță gratuită pentru instalare panouri solare. Energie verde!",
    provider: "SolarPro",
    icon: Wind,
    category: "Energie"
  },
  {
    id: "5",
    title: "Compost Organic",
    description: "Vând compost 100% organic pentru grădina ta. Produse locale!",
    provider: "BioGarden",
    icon: Leaf,
    category: "Grădinărit"
  },
  {
    id: "6",
    title: "Reciclare Baterii",
    description: "Colectez baterii uzate gratuit. Protejăm mediul împreună!",
    provider: "BatteryGreen",
    icon: Battery,
    category: "Reciclare"
  }
];

interface AdsSidebarProps {
  position: "left" | "right";
}

export const AdsSidebar = ({ position }: AdsSidebarProps) => {
  const displayAds = position === "left" ? ads.slice(0, 3) : ads.slice(3, 6);

  return (
    <div className="space-y-4 sticky top-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Servicii Eco</h3>
        <p className="text-sm text-muted-foreground">Promovează sustenabilitatea</p>
      </div>
      
      {displayAds.map((ad) => {
        const Icon = ad.icon;
        return (
          <Card 
            key={ad.id} 
            className="p-4 hover:shadow-elegant transition-all cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
                  {ad.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {ad.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground truncate">
                    {ad.provider}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {ad.category}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
      
      <div className="text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Vrei să promovezi servicii eco? <br />
          <span className="text-primary cursor-pointer hover:underline">Contactează-ne</span>
        </p>
      </div>
    </div>
  );
};
