"use client";

import { forwardRef, useState, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { motion } from "framer-motion";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Shared floating-label mechanics for the enquiry form: the label sits over
// the field like a placeholder at rest, then lifts clear of it once focused
// or filled — rather than the small uppercase label permanently parked
// above the field. "Filled" is tracked from the raw DOM value on each
// change/blur event rather than through react-hook-form's own value, since
// these fields stay uncontrolled (registration only supplies onChange/
// onBlur/ref, not a value prop) and reading e.target.value directly works
// the same way regardless of that.
function useFloatLabel(initialFilled = false) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(initialFilled);
  return { focused, setFocused, filled, setFilled, float: focused || filled };
}

const labelMotionProps = (float: boolean) => ({
  initial: false,
  animate: float
    ? { y: -22, scale: 0.78, color: "#c9a84c" }
    : { y: 0, scale: 1, color: "#5c5952" },
  transition: { duration: 0.25, ease: EASE_OUT },
});

type FieldShellProps = {
  icon?: ReactNode;
  label: string;
  htmlFor: string;
  float: boolean;
  focused: boolean;
  error?: FieldError;
  children: ReactNode;
};

function FieldShell({ icon, label, htmlFor, float, focused, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative flex items-end gap-2 border-b pb-1 transition-colors duration-200 ${
          focused ? "border-rose-gold-deep" : "border-gold-soft"
        }`}
      >
        {icon && (
          <span className={`mb-0.5 shrink-0 ${focused ? "text-rose-gold-deep" : "text-rose-text/60"}`}>
            {icon}
          </span>
        )}
        <div className="relative min-h-11 w-full">
          <motion.label
            htmlFor={htmlFor}
            {...labelMotionProps(float)}
            className="pointer-events-none absolute left-0 top-3 origin-left select-none font-sans text-base tracking-normal normal-case"
          >
            {label}
          </motion.label>
          {children}
        </div>
      </div>
      {error && (
        <p id={`${htmlFor}-error`} className="font-sans text-xs text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
}

export const AnimatedInput = forwardRef<
  HTMLInputElement,
  {
    label: string;
    type: string;
    icon?: ReactNode;
    autoComplete: string;
    error?: FieldError;
  } & UseFormRegisterReturn
>(function AnimatedInput({ label, type, icon, autoComplete, error, name, onChange, onBlur, ...rest }, ref) {
  const { focused, setFocused, setFilled, float } = useFloatLabel();

  return (
    <FieldShell icon={icon} label={label} htmlFor={name} float={float} focused={focused} error={error}>
      <input
        id={name}
        name={name}
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value.length > 0);
          onBlur(e);
        }}
        onChange={(e) => {
          setFilled(e.target.value.length > 0);
          onChange(e);
        }}
        className="min-h-11 w-full bg-transparent pt-6 pb-1 font-sans text-base text-charcoal focus:outline-none"
        {...rest}
      />
    </FieldShell>
  );
});

export const AnimatedTextarea = forwardRef<
  HTMLTextAreaElement,
  {
    label: string;
    icon?: ReactNode;
    error?: FieldError;
  } & UseFormRegisterReturn &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "onChange" | "onBlur">
>(function AnimatedTextarea({ label, icon, error, name, onChange, onBlur, rows = 4, ...rest }, ref) {
  const { focused, setFocused, setFilled, float } = useFloatLabel();

  return (
    <FieldShell icon={icon} label={label} htmlFor={name} float={float} focused={focused} error={error}>
      <textarea
        id={name}
        name={name}
        ref={ref}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value.length > 0);
          onBlur(e);
        }}
        onChange={(e) => {
          setFilled(e.target.value.length > 0);
          onChange(e);
        }}
        className="w-full resize-none bg-transparent pt-6 pb-1 font-sans text-base text-charcoal focus:outline-none"
        {...rest}
      />
    </FieldShell>
  );
});

// The native <select> always renders *something* (its placeholder option or
// a chosen value), so there's no genuinely empty state to overlay a label
// on top of the way the text fields do — it keeps the label in place and
// only animates the focus color/border, rather than a dramatic float.
export const AnimatedSelect = forwardRef<
  HTMLSelectElement,
  {
    label: string;
    icon?: ReactNode;
    error?: FieldError;
    children: ReactNode;
  } & UseFormRegisterReturn &
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "onChange" | "onBlur" | "children">
>(function AnimatedSelect({ label, icon, error, name, onChange, onBlur, children, ...rest }, ref) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
          focused ? "text-rose-gold-deep" : "text-rose-text"
        }`}
      >
        {label}
      </label>
      <div
        className={`flex items-center gap-2 border-b pb-1 transition-colors duration-200 ${
          focused ? "border-rose-gold-deep" : "border-gold-soft"
        }`}
      >
        {icon && (
          <span className={`shrink-0 ${focused ? "text-rose-gold-deep" : "text-rose-text/60"}`}>{icon}</span>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur(e);
          }}
          onChange={onChange}
          className="min-h-11 w-full bg-transparent font-sans text-base text-charcoal focus:outline-none"
          {...rest}
        >
          {children}
        </select>
      </div>
      {error && (
        <p id={`${name}-error`} className="font-sans text-xs text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
});
