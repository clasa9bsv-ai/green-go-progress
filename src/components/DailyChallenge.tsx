import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Camera, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  icon: string;
}


export const DailyChallenge = () => {
  const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [hasVerificationQuestion, setHasVerificationQuestion] = useState(false);
  const [verificationQuestion, setVerificationQuestion] = useState("");

  useEffect(() => {
    fetchTodayChallenge();
    checkIfCompleted();
  }, []);

  const fetchTodayChallenge = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('date', today)
        .single();

      if (error) throw error;
      setTodayChallenge(data);

      // Note: Verification questions/answers are stored securely server-side
      // The edge function will handle all verification logic
      // For now, we always show both tabs and let users choose
      setHasVerificationQuestion(true);
      setVerificationQuestion("Răspunde la întrebarea de verificare pentru această provocare");
    } catch (error) {
      console.error('Error fetching challenge:', error);
      toast.error("Eroare la încărcarea provocării zilei");
    }
  };

  const checkIfCompleted = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !todayChallenge) return;

      const { data } = await supabase
        .from('completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', todayChallenge.id)
        .single();

      if (data) {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Error checking completion:', error);
    }
  };

  const handleStartVerification = () => {
    setShowVerification(true);
  };

  const handleVerify = async () => {
    if (!todayChallenge) return;
    
    setVerifying(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Trebuie să fii autentificat");
        return;
      }

      let verified = false;
      let verificationMethod = '';
      let verificationData: any = {};

      // Verificare cu fotografie folosind AI
      if (uploadedImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          
          try {
            const { data: verificationResult, error: funcError } = await supabase.functions.invoke('verify-challenge', {
              body: {
                imageBase64: base64Image,
                challengeTitle: todayChallenge.title,
                challengeDescription: todayChallenge.description
              }
            });

            if (funcError) throw funcError;

            verified = verificationResult.verified;
            verificationMethod = 'photo';
            verificationData = { aiResponse: verificationResult.message };

            await completeChallenge(user.id, verified, verificationMethod, verificationData);
          } catch (error: any) {
            console.error('AI verification error:', error);
            toast.error("Eroare la verificarea fotografiei");
            setVerifying(false);
          }
        };
        reader.readAsDataURL(uploadedImage);
      } 
      // Verificare cu întrebare (server-side)
      else if (verificationAnswer) {
        try {
          const { data: verificationResult, error: funcError } = await supabase.functions.invoke('verify-challenge', {
            body: {
              textAnswer: verificationAnswer,
              challengeId: todayChallenge.id,
              challengeTitle: todayChallenge.title,
              challengeDescription: todayChallenge.description
            }
          });

          if (funcError) throw funcError;

          verified = verificationResult.verified;
          verificationMethod = 'question';
          verificationData = { answer: verificationAnswer };

          await completeChallenge(user.id, verified, verificationMethod, verificationData);
        } catch (error: any) {
          console.error('Text verification error:', error);
          toast.error("Eroare la verificarea răspunsului");
          setVerifying(false);
        }
      } else {
        toast.error("Te rugăm să încarci o fotografie sau să răspunzi la întrebare");
        setVerifying(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error("Eroare la verificare");
      setVerifying(false);
    }
  };

  const completeChallenge = async (
    userId: string,
    verified: boolean,
    verificationMethod: string,
    verificationData: any
  ) => {
    if (!todayChallenge) return;

    try {
      // Salvează completarea
      const { error: completionError } = await supabase
        .from('completions')
        .insert({
          user_id: userId,
          challenge_id: todayChallenge.id,
          verification_method: verificationMethod,
          verified,
          verification_data: verificationData
        });

      if (completionError) throw completionError;

      if (verified) {
        // Actualizează profilul utilizatorului
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_points, completed_challenges')
          .eq('id', userId)
          .single();

        if (profile) {
          const newPoints = profile.total_points + todayChallenge.points;
          const newCompletedChallenges = profile.completed_challenges + 1;
          const newLevel = Math.floor(newPoints / 100) + 1;

          await supabase
            .from('profiles')
            .update({
              total_points: newPoints,
              completed_challenges: newCompletedChallenges,
              current_level: newLevel
            })
            .eq('id', userId);

          setCompleted(true);
          setShowVerification(false);
          toast.success("Provocare completată și verificată!", {
            description: `+${todayChallenge.points} puncte câștigate! 🎉`,
          });
        }
      } else {
        toast.error("Verificare eșuată", {
          description: "Fotografia nu corespunde provocării. Încearcă din nou!",
        });
      }

      setVerificationAnswer("");
      setUploadedImage(null);
    } catch (error) {
      console.error('Error completing challenge:', error);
      toast.error("Eroare la salvarea provocării");
    } finally {
      setVerifying(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast.success("Fotografie încărcată!");
    }
  };

  if (!todayChallenge) {
    return (
      <Card className="shadow-medium border-primary/20">
        <CardContent className="py-8 text-center text-muted-foreground">
          Se încarcă provocarea zilei...
        </CardContent>
      </Card>
    );
  }

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
          onClick={handleStartVerification}
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
              Completat și Verificat!
            </>
          ) : (
            <>
              <Circle className="mr-2 h-5 w-5" />
              Verifică și Finalizează
            </>
          )}
        </Button>
      </CardContent>

      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Verifică Provocarea</DialogTitle>
            <DialogDescription>
              Pentru a finaliza provocarea, te rugăm să încarci o fotografie sau să răspunzi la întrebarea de verificare.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="photo" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="photo">
                <Camera className="mr-2 h-4 w-4" />
                Fotografie
              </TabsTrigger>
              <TabsTrigger value="question">
                <MessageSquare className="mr-2 h-4 w-4" />
                Întrebare
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo">Încarcă o fotografie ca probă</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                {uploadedImage && (
                  <p className="text-sm text-success">
                    ✓ {uploadedImage.name}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="question" className="space-y-4">
              {hasVerificationQuestion ? (
                <div className="space-y-2">
                  <Label htmlFor="answer">{verificationQuestion}</Label>
                  <Input
                    id="answer"
                    placeholder="Răspunsul tău..."
                    value={verificationAnswer}
                    onChange={(e) => setVerificationAnswer(e.target.value)}
                  />
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Această provocare nu are întrebare de verificare. Te rugăm să folosești opțiunea de fotografie.
                </p>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowVerification(false)}
              className="flex-1"
            >
              Anulează
            </Button>
            <Button
              onClick={handleVerify}
              className="flex-1 bg-gradient-primary hover:opacity-90"
              disabled={verifying}
            >
              {verifying ? "Se verifică..." : "Verifică"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
