export interface Vehicle {
  id: number;
  plate: string;
  color: string;
  model: string;
  chassis: string;
  brand?: string;
  year?: number;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleRequestDTO {
  plate: string;
  color: string;
  model: string;
  chassis: string;
  brand?: string;
  year?: string;
  type?: string;
}

export interface CirculationCheckRequest {
  plate: string;
  checkDateTime: string;
}

export interface CirculationCheckResponse {
  vehicle: Vehicle;
  canCirculate: boolean;
  message: string;
  lastDigitPlate: string;
  dayOfWeek: string;
  checkDateTime: string;
  restrictionDay: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  path: string;
}
