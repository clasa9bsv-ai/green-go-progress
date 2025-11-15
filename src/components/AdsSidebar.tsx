import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Recycle, Droplet, Wind, Leaf, Battery } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    title: "LED Bulb Replacement",
    description: "Replace old bulbs with economical LEDs. 30% energy consumption reduction!",
    provider: "EcoLight Services",
    icon: Lightbulb,
    category: "Energy"
  },
  {
    id: "2",
    title: "Waste Collection",
    description: "Recycling and selective collection services at home. Flexible schedule!",
    provider: "GreenRecycle",
    icon: Recycle,
    category: "Recycling"
  },
  {
    id: "3",
    title: "Water Savers",
    description: "Install water-saving systems. Reduce consumption by up to 50%!",
    provider: "AquaSave",
    icon: Droplet,
    category: "Water"
  },
  {
    id: "4",
    title: "Solar Panels",
    description: "Free consultation for solar panel installation. Green energy!",
    provider: "SolarPro",
    icon: Wind,
    category: "Energy"
  },
  {
    id: "5",
    title: "Organic Compost",
    description: "Selling 100% organic compost for your garden. Local products!",
    provider: "BioGarden",
    icon: Leaf,
    category: "Gardening"
  },
  {
    id: "6",
    title: "Battery Recycling",
    description: "Collect used batteries for free. Protecting the environment together!",
    provider: "BatteryGreen",
    icon: Battery,
    category: "Recycling"
  }
];

interface AdsSidebarProps {
  position: "left" | "right";
}

export const AdsSidebar = ({ position }: AdsSidebarProps) => {
  const navigate = useNavigate();
  const displayAds = position === "left" ? ads.slice(0, 3) : ads.slice(3, 6);

  return (
    <div className="space-y-4 sticky top-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Eco Services</h3>
        <p className="text-sm text-muted-foreground">Promote sustainability</p>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/jobs")}
          className="text-xs text-primary hover:text-primary/80"
        >
          Other announcements available here
        </Button>
      </div>
    </div>
  );
};
