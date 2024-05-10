import React from "react";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";

interface TInputInterface extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  value: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  icon?: keyof TICons;
  errorText?: string;
  size?: 'default' | 'small';
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
  onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
  onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
}

export type TPropsInputYa = Partial<typeof Input> & TInputInterface;