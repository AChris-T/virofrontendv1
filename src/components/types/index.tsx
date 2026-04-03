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

export type CalendarViewMode = 'day' | 'week' | 'month';

export type CalendarEventAccent = 'green' | 'blue' | 'yellow';

export type CalendarEventItem = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  accent?: CalendarEventAccent;
};
