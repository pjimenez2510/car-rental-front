import { Info } from "lucide-react";

export const TermItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-4 p-4 bg-muted/5 rounded-lg hover:bg-muted/10 transition-all duration-300">
    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
      <Info className="h-4 w-4 text-blue-500" />
    </div>
    <span className="text-sm">{text}</span>
  </div>
);
