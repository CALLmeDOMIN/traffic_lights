import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import AddCarForm from "./AddCarForm";

export default function AddCarDialog({
  className,
  open,
  setOpen,
}: {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Add car to simulation</DialogTitle>
        </DialogHeader>
        <AddCarForm onSave={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
