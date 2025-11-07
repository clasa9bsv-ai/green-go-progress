import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Camera, MessageSquare } from "lucide-react";
import { toast } from "sonner";
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
  verificationQuestion?: string;
  verificationAnswer?: string;
}

const todayChallenge: Challenge = {
  id: "1",
  title: "Folosește o sticlă reutilizabilă",
  description: "Astăzi evită sticlele de plastic de unică folosință. Folosește propria ta sticlă reutilizabilă și contribuie la reducerea deșeurilor din plastic!",
  category: "Reciclare",
  points: 20,
  icon: "♻️",
  verificationQuestion: "Ce tip de sticlă ai folosit astăzi?",
  verificationAnswer: "reutilizabil" // keyword pentru verificare simplă
};

export const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStartVerification = () => {
    setShowVerification(true);
  };

  const handleVerify = () => {
    // Verificare simplă - poate fi înlocuită cu AI verification mai târziu
    const hasValidAnswer = verificationAnswer.toLowerCase().includes(
      todayChallenge.verificationAnswer?.toLowerCase() || ""
    );
    const hasImage = uploadedImage !== null;

    if (hasValidAnswer || hasImage) {
      setCompleted(true);
      setShowVerification(false);
      toast.success("Provocare completată și verificată!", {
        description: `+${todayChallenge.points} puncte câștigate! 🎉`,
      });
      setVerificationAnswer("");
      setUploadedImage(null);
    } else {
      toast.error("Verificare eșuată", {
        description: "Te rugăm să încarci o fotografie sau să răspunzi corect la întrebare.",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast.success("Fotografie încărcată!");
    }
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
              <div className="space-y-2">
                <Label htmlFor="answer">{todayChallenge.verificationQuestion}</Label>
                <Input
                  id="answer"
                  placeholder="Răspunsul tău..."
                  value={verificationAnswer}
                  onChange={(e) => setVerificationAnswer(e.target.value)}
                />
              </div>
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
            >
              Verifică
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
