import { useAuth } from "./hooks/useAuth";

import { Form } from "@/components/ui/form";
import { CustomInput } from "../Inputs/CustomInput";
import { DynamicButton } from "../DynamicButton";

interface SignUpFormProps {
  closeSignUp: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { closeSignUp } = props;

  const { signupForm, handleSignUp, signUpLoading } = useAuth(closeSignUp);

  return (
    <Form {...signupForm}>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
        <CustomInput
          form={signupForm}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="text"
        />

        <CustomInput
          form={signupForm}
          name="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
        />

        <CustomInput
          form={signupForm}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <CustomInput
          form={signupForm}
          name="confirmPassword"
          label="Password Confirmation"
          placeholder="Enter your password"
          type="password"
        />

        <DynamicButton
          title="Create Account"
          className="w-full"
          loading={signUpLoading}
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
