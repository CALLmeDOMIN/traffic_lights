"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import { Button } from "./ui/button";
import AddCarDialog from "./AddCarDialog";

function Nav({ className }: { className?: string }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={cn("flex space-x-3", className)}>
      <AddCarDialog
        className="text-foreground dark"
        open={showDialog}
        setOpen={setShowDialog}
      />
      <Button variant="secondary" onClick={() => setShowDialog(true)}>
        Add Car
      </Button>
      <Button>Next Step</Button>
    </div>
  );
}

export default Nav;
