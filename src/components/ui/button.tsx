import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-audio-glow hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // 🎵 AUDIOFORGE BUTTON VARIANTS
        audio: "bg-gradient-primary text-primary-foreground hover:shadow-audio-glow hover:-translate-y-1 hover:scale-105 font-semibold",
        console: "bg-console-track text-foreground border border-console-fader hover:bg-console-fader hover:text-console-track hover:shadow-waveform",
        waveform: "bg-gradient-waveform text-white hover:animate-waveform-flow hover:shadow-waveform hover:-translate-y-1",
        spectrum: "bg-gradient-audio text-white hover:animate-audio-pulse hover:shadow-audio-glow",
        record: "bg-audio-peak text-white hover:bg-audio-peak/90 hover:animate-console-glow hover:shadow-[0_0_20px_hsl(var(--audio-peak))]",
        play: "bg-console-led text-background hover:bg-console-led/90 hover:shadow-[0_0_15px_hsl(var(--console-led))]",
        stop: "bg-muted text-muted-foreground hover:bg-muted/80 border border-border",
        mute: "bg-background text-foreground border border-audio-peak hover:bg-audio-peak hover:text-white hover:shadow-[0_0_15px_hsl(var(--audio-peak))]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
