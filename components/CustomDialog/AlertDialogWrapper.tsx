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
      <AlertDialogContent className="max-w-[calc(100vw-50px)] md:max-w-[520px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-24 md:text-32 font-bold w-3/4 text-left">{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}