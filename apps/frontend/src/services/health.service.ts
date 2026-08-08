import { apiClient } from "@/lib/api";
import type { ApiResponse, HealthData } from "@/types/api";

export async function getHealth(): Promise<ApiResponse<HealthData>> {
  const response =
    await apiClient.get<ApiResponse<HealthData>>("/health");

  return response.data;
}