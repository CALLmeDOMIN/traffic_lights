import { cn } from "@/lib/utils";
import { useState } from "react";

import { type Direction } from "@/backend/types/traffic";

import { Button } from "./ui/button";
import AddCarDialog from "./AddCarDialog";

function Nav({
  className,
  onNextStep,
  onAddVehicle,
}: {
  className?: string;
  onNextStep: () => void;
  onAddVehicle: (from: Direction, to: Direction) => void;
}) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={cn("flex space-x-3", className)}>
      <AddCarDialog
        className="dark text-foreground"
        open={showDialog}
        setOpen={setShowDialog}
        onAddVehicle={onAddVehicle}
      />
      <Button variant="secondary" onClick={() => setShowDialog(true)}>
        Add Car
      </Button>
      <Button onClick={onNextStep}>Next Step</Button>
    </div>
  );
}

export default Nav;
