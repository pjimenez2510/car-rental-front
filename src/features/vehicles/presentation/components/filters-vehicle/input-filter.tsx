import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFilterProps {
  label: string;
  id: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const InputFilter = ({
  label,
  id,
  placeholder,
  onChange,
}: InputFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        type="text"
        id={id}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFilter;
