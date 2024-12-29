import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import UploadFileForm from "./UploadFileForm/UploadFileForm";

import { type UploadFileData } from "@/lib/types";

interface UploadFileDialogProps {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onFileUpload: (data: UploadFileData) => void;
}

function UploadFileDialog({
  className,
  open,
  setOpen,
  onFileUpload,
}: UploadFileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Upload starting state of the simulation</DialogTitle>
        </DialogHeader>
        <UploadFileForm setOpen={setOpen} onFileUpload={onFileUpload} />
      </DialogContent>
    </Dialog>
  );
}

export default UploadFileDialog;
