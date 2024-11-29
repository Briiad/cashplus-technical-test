"use client"

import { useInput } from "./hooks/useInput";

import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

interface CustomInputProps {
  form: any;
  name: any;
  label: string;
  placeholder?: string;
  type: "text" | "password";
}

export const CustomInput: React.FC<CustomInputProps> = ({
  form,
  name,
  label,
  placeholder,
  type,
}) => {
  const { togglePassword, handleTogglePassword } = useInput();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-10 md:text-14">{label}<span className="text-red-500"> *</span></FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                type={type === "password" && togglePassword ? "text" : type}
                className="w-full text-12 md:text-14 border-2"
              />
              {type === "password" && (
                <div
                  className="absolute right-0 top-0 bottom-0 flex items-center pr-2"
                  onClick={handleTogglePassword}
                >
                  {togglePassword ? (
                    <FaRegEyeSlash className="text-14 md:text-18 cursor-pointer" />
                  ) : (
                    <FaRegEye className="text-14 md:text-18 cursor-pointer" />
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="!text-10 text-red-500">{form.formState.errors[name]?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
