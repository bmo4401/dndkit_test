import { cn } from "@/libs/utils";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "w-ft flex h-10 items-center justify-center rounded-md border border-slate-500 px-5 py-3 hover:opacity-90",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
export { Button };
