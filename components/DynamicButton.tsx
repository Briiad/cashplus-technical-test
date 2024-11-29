import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import ButtonSpinner from "./ButtonSpinner";

interface DynamicButtonProps {
  onClick?: () => void;
  title: string;
  className?: string;
  loading?: boolean;
}

export const DynamicButton: React.FC<DynamicButtonProps> = ({
  onClick,
  title,
  className,
  loading,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className={
        cn("bg-primary hover:bg-primary-foreground text-white", 
          className
        )}
    >
      {loading ? <ButtonSpinner /> : title}
    </Button>
  );
};
