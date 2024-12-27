import { type Vehicle } from "@/backend/core/vehicle";
import { type Direction } from "@/backend/types/traffic";

export interface UploadFileData {
  roads: {
    [key in Direction]: {
      vehicles: Vehicle[];
    };
  };
}
