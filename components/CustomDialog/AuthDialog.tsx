import { AlertDialogWrapper } from "./AlertDialogWrapper";
import { LoginForm, SignUpForm } from "../Forms";

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "login" | "signup"
  title: string
  description: string
  changeType: () => void
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onOpenChange, type, title, description, changeType }) => {
  return (
    <AlertDialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
    >
      {type === "login" ? <LoginForm closeLogin={() => onOpenChange(false)} /> : <SignUpForm closeSignUp={() => onOpenChange(false)} />}

      <div className="flex items-center justify-center text-12">
        <p>
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={changeType}
            className="text-blue-500 cursor-pointer"
          >
            {type === "login" ? " Let's Make One!" : " Here!"}
          </span>
        </p>
      </div>
    </AlertDialogWrapper>
  )
}