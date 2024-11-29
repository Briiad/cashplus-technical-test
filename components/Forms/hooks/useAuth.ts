"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { QueryClient, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { z } from "zod"
import { toast } from "sonner";

import { PostLoginPayload, PostSignUpPayload } from "../api/interface";
import { loginSchema, signupSchema, LoginSchemaType, SignupSchemaType } from "./schema"
import { AxiosError } from "axios";
import { useLogin, useSignUp } from "../api/mutations";

interface HandleSignUpProps{
  form: UseFormReturn<z.infer<SignupSchemaType>, undefined>,
  mutation: UseMutationResult<any, Error, PostSignUpPayload>
  queryClient: QueryClient
  closeSignUp: () => void
}

const handleSignUp = async ({ form, mutation, queryClient, closeSignUp }: HandleSignUpProps) => {
  const values = form.getValues()

  if (values.password !== values.confirmPassword) {
    form.setError("confirmPassword", {
      type: "manual",
      message: "Passwords do not match"
    })
    return
  }

  const payload = {
    email: values.email,
    name: values.username,
    password: values.password,
  }

  mutation.mutate(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"]})
      form.reset()
      closeSignUp()
      toast.success("Account created successfully")
    },
    onError: (error) => {
      if (error instanceof AxiosError){
        toast.error(error.response?.data.error)
      } else {
        toast.error("An error occurred")
      }
    }
  })
}

interface HandleLoginProps{
  form: UseFormReturn<z.infer<LoginSchemaType>, undefined>,
  mutation: UseMutationResult<any, Error, PostLoginPayload>
  queryClient: QueryClient
  closeLogin: () => void
}

const handleLogin = async ({ form, mutation, queryClient, closeLogin }: HandleLoginProps) => {
  const values = form.getValues()

  const payload = {
    email: values.email,
    password: values.password
  }

  mutation.mutate(payload, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"]})
      form.reset()
      closeLogin()
      toast.success("Logged in successfully")
    },
    onError: (error) => {
      if (error instanceof AxiosError){
        toast.error(error.response?.data.error)
      } else {
        toast.error("An error occurred")
      }
    }
  })
}

export const useAuth = (closeModal: () => void) => {
  const queryClient = useQueryClient()
  const signUpMutation = useSignUp()
  const logInMutation = useLogin()

  const loginForm = useForm<z.infer<LoginSchemaType>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const signupForm = useForm<z.infer<SignupSchemaType>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  })

  return { 
    loginForm, 
    signupForm,
    signUpLoading: signUpMutation.isPending,
    loginLoading: logInMutation.isPending,
    handleSignUp: signupForm.handleSubmit(() => {
      return handleSignUp({
        form: signupForm,
        mutation: signUpMutation,
        queryClient,
        closeSignUp: closeModal
      })
    }),
    handleLogin: loginForm.handleSubmit(() => {
      return handleLogin({
        form: loginForm,
        mutation: logInMutation,
        queryClient,
        closeLogin: closeModal
      })
    })
  }
}