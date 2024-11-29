import { useState } from "react";

export const useInput = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return {
    togglePassword,
    handleTogglePassword,
  };
}