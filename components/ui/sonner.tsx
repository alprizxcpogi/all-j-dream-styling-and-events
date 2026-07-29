"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-body group-[.toaster]:bg-warm-white group-[.toaster]:text-text group-[.toaster]:border-linen group-[.toaster]:shadow-[var(--shadow-lift)] group-[.toaster]:rounded-[16px]",
          description: "group-[.toast]:text-text-muted",
          actionButton: "group-[.toast]:bg-blush group-[.toast]:text-text",
          cancelButton: "group-[.toast]:bg-linen group-[.toast]:text-text-muted",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
