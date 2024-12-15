import { LucideIcon } from "lucide-react";

export const VehicleDetail = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  className?: string;
  icon: LucideIcon;
}) => (
  <div className="flex items-center gap-3 p-4 bg-muted/10 rounded-lg hover:bg-muted/20 transition-all duration-300 transform hover:scale-102">
    <div className="p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-sm text-muted-foreground">{label}</h3>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  </div>
);
