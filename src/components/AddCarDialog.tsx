import { type Direction } from "@/backend/types/traffic";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import AddCarForm from "./AddCarForm";

export default function AddCarDialog({
  className,
  open,
  setOpen,
  onAddVehicle,
}: {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddVehicle: (from: Direction, to: Direction) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Add car to simulation</DialogTitle>
        </DialogHeader>
        <AddCarForm onSave={setOpen} onAddVehicle={onAddVehicle} />
      </DialogContent>
    </Dialog>
  );
}
