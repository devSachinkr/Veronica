"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import GradientText from "../gradient-text";
import { cn } from "@/lib/utils";
import { getEnabledExperimentalFeatures } from "next/dist/server/config";

type Props = {
  className?: string;
  children?: React.ReactNode;
  textClassName?: string;
  buttonProps?: React.ComponentProps<typeof Button>;
  btnClassName?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
};

const GradientButton = ({
  className,
  children,
  textClassName,
  buttonProps,
  btnClassName,
  element
}: Props) => {
  return (
    <Button
      className={cn(
        "bg-gradient-to-br text-white rounded-full text-lg from-demon-Yellow via-yellow-200 to-yellow-700 font-medium hover:opacity-70 transition duration-300 flex items-center justify-center w-[130px] relative ",
        btnClassName
      )}
      {...buttonProps}
    >
      <div
        className={cn(
          "rounded-full text-white bg-background-80/85  w-[125px] absolute h-[92%]  flex items-center justify-center pb-2",
          className
        )}
      >
        <GradientText element={element} className={cn(textClassName)}>{children}</GradientText>
      </div>
    </Button>
  );
};

export default GradientButton;
