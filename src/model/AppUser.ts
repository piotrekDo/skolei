export interface AuthenticationRequest {
  userEmail: string;
  userPassword: string;
}

export interface AuthenticationResponse {
  userEmail: string;
  firstName: string;
  userRoles: string[];
  jwtToken: string;
  jwtExpiresAt: string;
  jwtExpiresAtTimestamp: number;
}
