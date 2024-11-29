import { useMutation } from "@tanstack/react-query";
import { postLogin, postSignUp, postLogout } from "@/services/Auth.service";
import { PostLoginPayload, PostLoginResponse, PostSignUpPayload, PostSignUpResponse } from "./interface";
import { useQueryClient } from "@tanstack/react-query";
import { constants } from "@/constants";

export const useSignUp = () => {
  return useMutation<PostSignUpResponse, Error, PostSignUpPayload>({
    mutationFn: (value) => postSignUp(value),
    onSuccess: (data) => {
      if(data.token){
        localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      }
    }
  })
}

export const useLogin = () => {
  return useMutation<PostLoginResponse, Error, PostLoginPayload>({
    mutationFn: (value) => postLogin(value),
    onSuccess: (data) => {
      if(data.token){
        localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);
      }
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.removeItem(constants.ACCESS_TOKEN_KEY);
      queryClient.invalidateQueries({ queryKey: ["me"]});
    }
  })
}