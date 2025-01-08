import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import GradientText from "../gradient-text";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  element: "BUTTON" | "LINK";
  gradientText?: boolean;
  gradientTextClassName?: string;
};

const GradientButtonLink = ({
  children,
  className,
  href,
  element,
  gradientText,
  gradientTextClassName
}: Props) => {
  const gradient =
    "bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 rounded-xl p-[2px]";

  switch (element) {
    case "BUTTON": {
      return (
        <div className={gradient}>
          <Button
            className={cn("rounded-xl bg-black hover:bg-black/80", className)}
          >
            {gradientText ? (
              <GradientText className={cn(gradientTextClassName)}>
                {children}
              </GradientText>
            ) : (
              children
            )}
          </Button>
        </div>
      );
    }
    case "LINK": {
      return (
        <div className={gradient}>
          <Link
            href={href!}
            className={cn("rounded-xl bg-black hover:bg-black/80", className)}
          >
            
          </Link>
        </div>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default GradientButtonLink;
