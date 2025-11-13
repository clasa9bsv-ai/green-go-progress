import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, ThumbsUp, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cum am redus consumul de plastic cu 80% în 3 luni",
    category: "Reciclare",
    author: "Maria P.",
    content: "Am început să folosesc sticle reutilizabile și pungi de pânză. Secretul este să ai întotdeauna cu tine alternativele reutilizabile...",
    likes: 42,
    comments: 15,
    date: "2025-11-10"
  },
  {
    id: "2",
    title: "Becurile LED: Investiție care se amortizează în 6 luni",
    category: "Energie",
    author: "Ion M.",
    content: "După ce am înlocuit toate becurile clasice cu LED-uri, factura mea la curent a scăzut cu 35%. Iată calculele exacte...",
    likes: 38,
    comments: 12,
    date: "2025-11-08"
  },
  {
    id: "3",
    title: "Grădinița din cartier organizează acțiune de reciclare",
    category: "Comunitate",
    author: "Elena S.",
    content: "Împreună cu alți părinți am organizat o campanie de colectare a deșeurilor electronice. Am strâns peste 500kg în prima săptămână!",
    likes: 56,
    comments: 23,
    date: "2025-11-05"
  },
  {
    id: "4",
    title: "Compostul casei: Ghid pentru începători",
    category: "Reciclare",
    author: "Andrei T.",
    content: "Transformarea resturilor alimentare în compost este mai simplu decât pare. Iată ce trebuie să știi pentru a începe...",
    likes: 31,
    comments: 9,
    date: "2025-11-03"
  },
  {
    id: "5",
    title: "Meditație în natură: Conectarea cu mediul înconjurător",
    category: "Echilibru Personal",
    author: "Ana D.",
    content: "Petrecerea timpului în natură și practicarea mindfulness m-au ajutat să apreciez mai mult mediul și să devin mai conștientă...",
    likes: 29,
    comments: 7,
    date: "2025-11-01"
  },
  {
    id: "6",
    title: "Panouri solar: Merită investiția?",
    category: "Energie",
    author: "Cristian V.",
    content: "Am instalat panouri solare acum un an. Iată costurile reale, economiile și cât timp va dura până se amortizează investiția...",
    likes: 67,
    comments: 34,
    date: "2025-10-28"
  },
  {
    id: "7",
    title: "Curățenie ecologică în cartier - Experiența mea",
    category: "Comunitate",
    author: "Mihai R.",
    content: "Am mobilizat 20 de vecini pentru o acțiune de curățare. Iată cum am reușit să transformăm parcul într-un loc curat și plăcut...",
    likes: 44,
    comments: 18,
    date: "2025-10-25"
  },
  {
    id: "8",
    title: "Yoga ecologică: Echilibru între corp și natură",
    category: "Echilibru Personal",
    author: "Diana L.",
    content: "Combinarea practicii yoga cu conștiința ecologică: de la covorașe sustenabile la meditații în aer liber...",
    likes: 25,
    comments: 5,
    date: "2025-10-22"
  }
];

const categories = ["Toate", "Reciclare", "Energie", "Comunitate", "Echilibru Personal"];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Toate");

  const filteredPosts = selectedCategory === "Toate" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Reciclare":
        return "bg-primary/10 text-primary";
      case "Energie":
        return "bg-accent/10 text-accent";
      case "Comunitate":
        return "bg-blue-500/10 text-blue-600";
      case "Echilibru Personal":
        return "bg-pink-500/10 text-pink-600";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Blog & Comunitate
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Împărtășește experiențele tale eco-friendly, învață din experiențele altora 
            și găsește soluții la provocările tale de sustenabilitate. 🌱
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="Toate" className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="shadow-medium hover:shadow-strong transition-all cursor-pointer hover:scale-105 duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'backwards' }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-lg hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <User className="h-3 w-3" />
                  {post.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-primary text-primary-foreground shadow-strong">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Ai o poveste de împărtășit?
            </CardTitle>
            <CardDescription className="text-center text-primary-foreground/80">
              Ajută comunitatea să crească împărtășind experiențele tale eco-friendly!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="shadow-medium hover:shadow-strong transition-all"
            >
              Scrie un articol
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
