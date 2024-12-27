import { type Direction } from "@/backend/types/traffic";

export interface AnimatingVehicle {
  id: string;
  from: Direction;
  to: Direction;
}

type VehicleMovement = {
  from: Direction;
  to: Direction;
};

type Vehicle = {
  vehicleId: string;
  movement: VehicleMovement;
};

export interface UploadFileData {
  roads: {
    [key in Direction]: {
      vehicles: Vehicle[];
    };
  };
}
