import { formatDate } from "@/lib/format-date";
import { Calendar } from "lucide-react";

export const DateDisplay = ({
  title,
  date,
}: {
  title: string;
  date: Date | null | undefined;
}) => (
  <div className="bg-muted/5 p-5 rounded-lg space-y-3 hover:bg-muted/10 transition-all duration-300">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Calendar className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-medium text-sm text-muted-foreground">{title}</h3>
        <div className="font-semibold capitalize">
          {date && formatDate(date, "EEEE, d MMMM yyyy")}
        </div>
      </div>
    </div>
  </div>
);
