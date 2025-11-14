import { Button } from "@/components/ui/button";
import { Mail, Phone, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();
  return <footer id="contact" className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Green&Go</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformăm grija față de mediu într-o experiență gamificată, ajutând utilizatorii să adopte obiceiuri sustenabile prin provocări zilnice și recompense. Fiecare acțiune contează pentru un viitor mai verde! 
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <div className="space-y-3">
              <a href="mailto:contact@greenandgo.ro" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@greenandgo.ro</span>
              </a>
              <a href="tel:+40712345678" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+40 712 345 678</span>
              </a>
              <a href="tel:+40723456789" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+40 723 456 789</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Link-uri Rapide</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/blog")}>
                📝 Blog & Comunitate
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/rewards")}>
                🎁 Premii
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Green&Go. Toate drepturile rezervate. 🌍
          </p>
        </div>
      </div>
    </footer>;
};