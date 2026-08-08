export interface DatabaseHealth {
  connected: boolean;
  readyState: number;
  database?: string;
  host?: string;
  port?: number;
}

export interface DatabaseConnectionInfo {
  uri: string;
  retryAttempts: number;
  retryDelay: number;
}

export interface DatabaseStatus {
  connected: boolean;
  timestamp: Date;
}