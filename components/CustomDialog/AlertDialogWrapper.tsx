import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AlertDialogWrapperProps{
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

export const AlertDialogWrapper: React.FC<AlertDialogWrapperProps> = ({ open, onOpenChange, title, description, children }) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-32 font-bold">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}