import React, { InputHTMLAttributes, useState } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';

import s from './TextField.module.scss';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  inputClassName?: string;
  focusClassName?: string;
  inputContainerClassName?: string;
  leftElement?: JSX.Element;
  leftElementClassName?: string;
  rightElement?: JSX.Element;
  rightElementClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  multiline?: boolean;
  label?: string;
  name: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
  error?: string | JSX.Element;
  success?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  variant?: 'xs' | 'sm' | 'md' | 'lg';
  maxLength?: number;
  onChange: (value: string, name: string) => void;
  id?: string;
}

const validChars = /[0-9,]/;

const TextField: React.FC<TextFieldProps> = ({
  className,
  focusClassName,
  inputContainerClassName,
  leftElement,
  leftElementClassName,
  rightElement,
  rightElementClassName,
  inputClassName,
  labelClassName,
  placeholder,
  multiline = false,
  label,
  name,
  value,
  disabled = false,
  error,
  success = false,
  type = 'text',
  variant = 'md',
  maxLength,
  helperText,
  onChange,
  id = `input-${name}`,
}: TextFieldProps) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div className={cn(s.root, className)}>
      <div
        className={cn(
          s.container,
          {
            [s.withError]: error,
            [s.success]: success,
            [s.disabled]: disabled,
            [s.focus]: focus,
            [s.filled]: value,
          },
          focus ? focusClassName : '',
        )}
      >
        <div className={cn(s.inputContainer, inputContainerClassName)}>
          {leftElement && (
            <div className={cn(s.leftElement, leftElementClassName)}>
              {leftElement}
            </div>
          )}
          {multiline ? (
            <textarea
              id={id}
              className={cn(s.input, s.textarea, inputClassName)}
              value={value}
              placeholder={placeholder}
              onChange={(e): void => onChange(e.currentTarget.value, name)}
              onFocus={(): void => setFocus(true)}
              onBlur={(): void => setFocus(false)}
              disabled={disabled}
              maxLength={maxLength}
            />
          ) : (
            <input
              id={id}
              type={type}
              name={name}
              className={cn(s.input, s[variant], inputClassName)}
              value={value}
              placeholder={placeholder}
              onKeyPress={(e) => {
                if (type === 'number' && !validChars.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e): void => {
                onChange(e.currentTarget.value, name);
              }}
              onFocus={(): void => setFocus(true)}
              onBlur={(): void => setFocus(false)}
              disabled={disabled}
            />
          )}
          <label
            className={cn(s.label, s[variant], s.floatingLabel, labelClassName)}
            htmlFor={id}
          >
            {label}
          </label>
          <fieldset className={s.border} aria-hidden="true">
            <legend className={s.legend}>
              {label && <span>{label}</span>}
            </legend>
          </fieldset>
          {rightElement && (
            <div className={cn(s.rightElement, rightElementClassName)}>
              {rightElement}
            </div>
          )}
        </div>
      </div>

      {!error && helperText && (
        <p
          className={cn(s.helperText, {
            [s.short]: multiline && maxLength,
          })}
        >
          {helperText}
        </p>
      )}
      {error && (
        <p className={s.error}>
          <Icon className={s.errorIcon} name="circle-close" />
          <span className={s.errorMessage}>{error}</span>
        </p>
      )}
      {maxLength && (
        <p className={s.length}>{`${value.length}/${maxLength}`}</p>
      )}
    </div>
  );
};

export default TextField;
