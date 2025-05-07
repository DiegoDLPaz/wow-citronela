export interface TokenResponse{
  access_token: string;
  expires_in: number;
  scope: string;
  sub: string;
  token_type: string;
}
