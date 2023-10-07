export interface CustomInputInterface {
  styles?: any;
  value: string | number;
  handleChange?: any;
  label: any;
  type?: string;
  autoFocus?: boolean;
  name: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  min?: string;
  id?: string;
  minLength?: string;
  size?: "small" | "medium";
  endAdornment?: any
}

export interface CustomInputWithLabelInterface {
  styles?: any;
  value: string | number;
  handleChange?: any;
  label: string;
  type?: string;
  autoFocus?: boolean;
  name: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  min?: string;
  labelColor?: any;
  height?: string;
  width?: string;
  color?: string;
  borderColor?: string;
  focusedBorderColor?: string;
}

export interface SecondaryButtonInterface {
  text: string;
  onClick?: any;
  styles?: any;
  loading?: boolean;
  type?: "button" | "reset" | "submit";
  startIcon?: React.ReactNode;
  disabled?: boolean;
}

export interface ErrorButtonInterface {
  text: string;
  onClick?: any;
  styles?: any;
  startIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export interface AlertInterface {
  type: "error" | "success" | "warning" | "info";
  message: string;
  isOpen: boolean;
  closeAlert: () => void;
}
