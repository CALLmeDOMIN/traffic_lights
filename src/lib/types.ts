import { type Vehicle } from "@/backend/core/vehicle";
import { type Direction } from "@/backend/types/traffic";

type VehicleType = Omit<Vehicle, "priority" | "definePriority">;

export interface UploadFileData {
  roads: {
    [key in Direction]: {
      vehicles: VehicleType[];
    };
  };
}
