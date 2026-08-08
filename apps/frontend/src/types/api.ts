export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface HealthData {
  status: string;
  service: string;
  version: string;
  timestamp: string;
}

