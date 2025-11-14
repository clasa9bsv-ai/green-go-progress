import { Button } from "@/components/ui/button";
import { Leaf, Gift, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
interface HeroProps {
  user: any;
}
export const Hero = ({
  user
}: HeroProps) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Deconectat cu succes!");
    navigate("/auth");
  };
  return <div className="text-center space-y-6 py-12">
      <div className="flex justify-end gap-2 mb-4">
        {user && <Button variant="outline" onClick={handleSignOut} className="hover:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" />
            Deconectare
          </Button>}
      </div>
      <div className="inline-block p-4 rounded-full bg-gradient-subtle mb-4">
        <Leaf className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        Green&Go
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Transformă grija față de mediu într-o experiență plăcută și realistă. Fiecare pas contează pentru un viitor mai sustenabil.  
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-strong transition-all" onClick={() => navigate("/rewards")}>
          <Gift className="mr-2 h-5 w-5" />
          Vezi Premiile
        </Button>
        <Button size="lg" variant="outline" className="shadow-medium hover:shadow-strong transition-all" onClick={() => {
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({
          behavior: 'smooth'
        });
      }}>
          📧 Contactează-ne
        </Button>
      </div>
    </div>;
};