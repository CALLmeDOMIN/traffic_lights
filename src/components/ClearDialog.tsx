import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

function ClearDialog({
  className,
  open,
  setOpen,
  onClear,
}: {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClear: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to clear the simulation?
          </DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="destructive" onClick={() => onClear()}>
            Clear
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ClearDialog;
