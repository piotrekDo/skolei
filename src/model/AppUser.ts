export interface AuthenticationRequest {
  userEmail: string;
  userPassword: string;
}

export interface AuthenticationResponse {
  userId: number;
  userEmail: string;
  firstName: string;
  userRoles: string[];
  jwtToken: string;
  jwtExpiresAt: string;
  jwtExpiresAtTimestamp: number;
}

export interface UserDtoRaw {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  jobStart: string;
  jobEnd: string | undefined;
  userEmail: string;
  ptoDaysTotal: number;
  ptoDaysTaken: number;
  roles: string[];
  accountEnabled: boolean;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  jobStart: Date;
  jobEnd: Date | undefined;
  userEmail: string;
  ptoDaysTotal: number;
  ptoDaysTaken: number;
  roles: string[];
  isAccountEnabled: boolean;
}
