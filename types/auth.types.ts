// ─── Auth DTOs ────────────────────────────────────────────────────────────────

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthUserDTO {
  id: number;
  email: string;
  role: UserRole;
}

export type UserRole = "USER" | "ADMIN";

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDTO;
}

export interface RegisterResponseDTO {
  userId: number;
  email: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfileDTO {
  id: number;
  userId: number;
  fullName: string | null;
  birthDate: string | null; // ISO date
  hypoglycemiaThreshold: number;
  hyperglycemiaThreshold: number;
  timezone: string | null;
}

export interface UpdateProfileDTO {
  fullName?: string;
  birthDate?: string;
  hypoglycemiaThreshold?: number;
  hyperglycemiaThreshold?: number;
  timezone?: string;
}

// ─── App Session ──────────────────────────────────────────────────────────────

export interface AppSession {
  user: AuthUserDTO;
  accessToken: string;
  refreshToken: string;
}