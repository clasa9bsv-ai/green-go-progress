import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Euro, ArrowLeft, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

interface JobAnnouncement {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  location: string;
  is_promoted: boolean;
  created_at: string;
  user_id: string;
}

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobAnnouncement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from('job_announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setJob(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="animate-pulse text-xl text-muted-foreground">Se încarcă...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Anunț negăsit</p>
          <Button onClick={() => navigate("/jobs")}>Înapoi la anunțuri</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/jobs")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Înapoi la Anunțuri
        </Button>

        <Card className={`shadow-strong ${job.is_promoted ? 'border-2 border-primary/30' : ''}`}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <Briefcase className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{job.category}</Badge>
                    {job.is_promoted && (
                      <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                        Promovat
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <CardDescription className="text-base">{job.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Locație</p>
                  <p className="font-semibold">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Euro className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Preț</p>
                  <p className="font-semibold text-primary">{job.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Publicat</p>
                  <p className="font-semibold">
                    {format(new Date(job.created_at), "dd MMMM yyyy", { locale: ro })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Categorie</p>
                  <p className="font-semibold">{job.category}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="w-full bg-gradient-primary" size="lg">
                Contactează angajatorul
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetail;
