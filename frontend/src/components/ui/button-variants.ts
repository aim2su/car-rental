import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap",
    "[&>svg]:shrink-0",
    "rounded-lg font-semibold transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary-700 text-white hover:bg-primary-800 shadow-sm hover:shadow-md",
        secondary: "bg-primary-50 text-primary-800 hover:bg-primary-100 border border-primary-200",
        outline: "border border-ink-200 bg-white text-ink-800 hover:bg-ink-50 hover:border-primary-700",
        ghost: "text-ink-700 hover:bg-ink-100 hover:text-primary-800",
        danger: "bg-red-600 text-white hover:bg-red-700",
        white: "bg-white text-primary-800 hover:bg-primary-50 shadow-sm",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;