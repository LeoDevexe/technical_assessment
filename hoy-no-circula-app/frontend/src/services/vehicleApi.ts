import axios, { AxiosInstance } from 'axios';
import { Vehicle, VehicleRequestDTO, CirculationCheckRequest, CirculationCheckResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
const API_KEY = import.meta.env.VITE_API_KEY || 'dev-api-key-12345';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  },
});

export const vehicleService = {
  registerVehicle: async (vehicle: VehicleRequestDTO): Promise<Vehicle> => {
    const response = await apiClient.post('/vehicles/register', vehicle);
    return response.data;
  },

  getVehicleByPlate: async (plate: string): Promise<Vehicle> => {
    const response = await apiClient.get(`/vehicles/${plate}`);
    return response.data;
  },

  getAllVehicles: async (): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles');
    return response.data;
  },
};

export const circulationService = {
  checkCirculation: async (request: CirculationCheckRequest): Promise<CirculationCheckResponse> => {
    const response = await apiClient.post('/circulation/check', request);
    return response.data;
  },
};

export default apiClient;
