export interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  color?: string;
  bot?: string;
}
export type VerificationFormInputs = {
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  d5: string;
  d6: string;
};

export type RegisterFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type SigninFormInputs = {
  email: string;
  password: string;
};
