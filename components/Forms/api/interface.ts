export interface PostSignUpPayload {
  email: string;
  password: string;
  name: string;
}

export interface PostSignUpResponse {
  message: string;
  token: string;
}

export interface PostLoginPayload {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  message: string;
  token: string;
}