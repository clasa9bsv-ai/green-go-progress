import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  icon: string;
}

const todayChallenge: Challenge = {
  id: "1",
  title: "Folosește o sticlă reutilizabilă",
  description: "Astăzi evită sticlele de plastic de unică folosință. Folosește propria ta sticlă reutilizabilă și contribuie la reducerea deșeurilor din plastic!",
  category: "Reciclare",
  points: 20,
  icon: "♻️"
};

export const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    toast.success("Provocare completată!", {
      description: `+${todayChallenge.points} puncte câștigate! 🎉`,
    });
  };

  return (
    <Card className="shadow-medium hover:shadow-strong transition-all duration-300 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{todayChallenge.icon}</div>
            <div>
              <CardTitle className="text-2xl mb-2">{todayChallenge.title}</CardTitle>
              <CardDescription className="text-base">
                Provocarea zilei • {todayChallenge.category}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-gradient-accent border-none">
            +{todayChallenge.points} puncte
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {todayChallenge.description}
        </p>
        <Button
          onClick={handleComplete}
          disabled={completed}
          className={`w-full ${
            completed 
              ? "bg-success hover:bg-success" 
              : "bg-gradient-primary hover:opacity-90"
          } transition-all`}
          size="lg"
        >
          {completed ? (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Completat!
            </>
          ) : (
            <>
              <Circle className="mr-2 h-5 w-5" />
              Marchează ca Finalizat
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
