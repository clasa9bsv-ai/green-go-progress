import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Recycling", "Energy", "Community", "Personal Balance"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Te rog completează toate câmpurile");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Trebuie să fii autentificat pentru a crea un articol");
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        user_id: user.id,
        title,
        content,
        category
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error("Eroare la crearea articolului");
    } else {
      toast.success("Articol creat cu succes! 🎉");
      navigate(`/blog/${data.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la Blog
        </Button>

        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">
              Creează un articol nou
            </CardTitle>
            <CardDescription className="text-base">
              Împărtășește experiența ta eco-friendly cu comunitatea! 🌱
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Titlul articolului</Label>
                <Input
                  id="title"
                  placeholder="Ex: Cum am redus consumul de plastic cu 80%"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base">Categorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selectează o categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base">Conținut</Label>
                <Textarea
                  id="content"
                  placeholder="Scrie aici experiența ta, sfaturile și învățămintele..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="resize-none text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Minimum 100 caractere. Curent: {content.length}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading || content.length < 100}
                  className="flex-1 bg-gradient-primary hover:opacity-90 shadow-medium"
                >
                  {loading ? "Se publică..." : "Publică articolul"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/blog")}
                  disabled={loading}
                >
                  Anulează
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
