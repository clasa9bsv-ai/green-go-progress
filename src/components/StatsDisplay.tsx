import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient?: boolean;
}

const StatCard = ({ icon, label, value, gradient }: StatCardProps) => (
  <Card className={`shadow-soft hover:shadow-medium transition-all ${gradient ? 'bg-gradient-primary text-primary-foreground' : ''}`}>
    <CardContent className="pt-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${gradient ? 'bg-white/20' : 'bg-primary/10'}`}>
          {icon}
        </div>
        <div>
          <p className={`text-sm ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatsDisplay = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard
        icon={<Target className="w-6 h-6" />}
        label="Puncte Totale"
        value="240"
        gradient
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
        label="Provocări Complete"
        value="12"
      />
      <StatCard
        icon={<Award className="w-6 h-6 text-primary" />}
        label="Nivel Actual"
        value="3"
      />
    </div>
  );
};
