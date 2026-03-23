// ─── Device DTOs ──────────────────────────────────────────────────────────────

export type DeviceStatus = "REGISTERED" | "ACTIVE" | "DISABLED" | "REVOKED";

export interface DeviceDTO {
  id: number;
  name: string;
  uniqueIdentifier: string;
  status: DeviceStatus;
  active: boolean;
  lastSeenAt: string | null;
  createdAt: string;
}

export interface RegisterDeviceRequestDTO {
  name: string;
  identifier: string;
}

export interface RegisterDeviceResponseDTO {
  deviceId: number;
  apiKey: string;
}