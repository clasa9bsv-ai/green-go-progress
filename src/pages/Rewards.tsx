import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, Gift } from "lucide-react";
import { toast } from "sonner";

interface Reward {
  id: string;
  level: number;
  title: string;
  description: string;
  company: string;
  value: string;
  icon: string;
}

const Rewards = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserLevel();
    fetchRewards();
  }, []);

  const fetchUserLevel = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('current_level')
        .eq('id', user.id)
        .single();

      if (profile) {
        setCurrentLevel(profile.current_level);
      }
    } catch (error) {
      console.error('Error fetching user level:', error);
    }
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('level', { ascending: true });

      if (error) throw error;
      setRewards(data || []);
    } catch (error) {
      toast.error("Eroare la încărcarea premiilor");
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Premii & Recompense
          </h1>
          <p className="text-muted-foreground">
            Nivelul tău curent: <Badge className="ml-2 bg-gradient-accent">{currentLevel}</Badge>
          </p>
        </div>

        <div className="grid gap-6">
          {rewards.map((reward) => {
            const isUnlocked = currentLevel >= reward.level;
            return (
              <Card
                key={reward.id}
                className={`transition-all duration-300 ${
                  isUnlocked
                    ? "shadow-medium hover:shadow-strong border-primary/20"
                    : "opacity-60 border-muted"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{reward.icon}</div>
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          {reward.title}
                          {!isUnlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Nivel {reward.level} • {reward.company}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={isUnlocked ? "default" : "secondary"}
                      className={isUnlocked ? "bg-gradient-accent" : ""}
                    >
                      {reward.value}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{reward.description}</p>
                  {isUnlocked ? (
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      <Gift className="mr-2 h-4 w-4" />
                      Revendică Premiul
                    </Button>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground">
                      Ajunge la nivelul {reward.level} pentru a debloca
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rewards;