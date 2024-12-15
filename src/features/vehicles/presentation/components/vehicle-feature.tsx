import { LucideIcon } from "lucide-react";

export const VehicleFeature = ({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) => (
  <div className="flex items-center gap-3 p-4 bg-muted/10 rounded-lg hover:bg-muted/20 transition-all duration-300 transform hover:scale-102">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <span className="font-medium text-sm">{text}</span>
  </div>
);
