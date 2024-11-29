import { useAuth } from "./hooks/useAuth";

import {
  Form,
} from "@/components/ui/form"
import { CustomInput } from "../Inputs/CustomInput";
import { DynamicButton } from "../DynamicButton";

interface LoginFormProps {
  closeLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ closeLogin }) => {
  const { loginForm, handleLogin, loginLoading } = useAuth(
    closeLogin
  )

  return (
    <Form {...loginForm}>
      <form 
        onSubmit={handleLogin}
        className="flex flex-col space-y-4"
      >
        <CustomInput 
          form={loginForm}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="text"
        />

        <CustomInput 
          form={loginForm}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <DynamicButton
          title="Welcome back!"
          className="w-full"
          loading={loginLoading}
        />
      </form>
    </Form>
  )
}

export default LoginForm