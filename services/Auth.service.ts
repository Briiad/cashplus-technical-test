import API from ".";

import {
  PostLoginPayload,
  PostSignUpPayload,
  PostLoginResponse,
  PostSignUpResponse,
} from "@/components/Forms/api/interface";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const response = await API.get<{ customer: CurrentUser }>("/profile");

  return response.data.customer
};

export const postSignUp = async (payload: PostSignUpPayload): Promise<PostSignUpResponse> => {
  const response = await API.post<PostSignUpResponse>("/auth/signup", payload);

  // Get token from response headers ( x-auth-token )
  const token = response.headers["x-auth-token"];

  return {
    ...response.data,
    token,
  };
}

export const postLogin = async (payload: PostLoginPayload): Promise<PostLoginResponse> => {
  const response = await API.post<PostLoginResponse>("/auth/login", payload);

  // Get token from response headers ( x-auth-token )
  const token = response.headers["x-auth-token"];

  return {
    ...response.data,
    token,
  }
}

export const postLogout = async () => {
  const response = await API.post("/auth/logout");

  return response.data;
}