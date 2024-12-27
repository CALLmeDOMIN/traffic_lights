import { cn } from "@/lib/utils";
import { useState } from "react";

import { type Direction } from "@/backend/types/traffic";

import { Button } from "./ui/button";
import AddCarDialog from "./AddCarDialog";
import ClearDialog from "./ClearDialog";
import { ChevronRight, Pause, Play } from "lucide-react";

function Nav({
  className,
  stepCount,
  onNextStep,
  onAddVehicle,
  onClear,
}: {
  className?: string;
  stepCount: number;
  onNextStep: () => void;
  onAddVehicle: (from: Direction, to: Direction) => void;
  onClear: () => void;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [showCarDialog, setShowCarDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

  return (
    <div className={cn("grid w-full grid-cols-10 px-4", className)}>
      <div className="col-span-2 place-self-center">Step: {stepCount}</div>
      <div className="col-span-6 flex space-x-3 place-self-center">
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <Pause /> : <Play />}
        </Button>
        <ClearDialog
          className="dark text-foreground"
          open={showClearDialog}
          setOpen={setShowClearDialog}
          onClear={onClear}
        />
        <Button onClick={onNextStep}>
          <ChevronRight />
        </Button>
        <Button variant="destructive" onClick={() => setShowClearDialog(true)}>
          Clear
        </Button>
      </div>
      <div className="col-span-2 flex flex-col justify-end space-x-3 space-y-4 md:flex-row md:space-y-0">
        <AddCarDialog
          className="dark text-foreground"
          open={showCarDialog}
          setOpen={setShowCarDialog}
          onAddVehicle={onAddVehicle}
        />
        <Button variant="secondary" onClick={() => setShowCarDialog(true)}>
          Add Car
        </Button>
        <Button variant="secondary">Load from file</Button>
      </div>
    </div>
  );
}

export default Nav;
