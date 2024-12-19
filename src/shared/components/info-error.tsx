import { Info } from "lucide-react";

interface Props {
  text: string;
}
const InforError = ({ text }: Props) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-red-500 flex flex-col items-center gap-4">
        <Info className="h-12 w-12" />
        <p className="text-lg font-medium">{text}</p>
      </div>
    </div>
  );
};

export default InforError;
