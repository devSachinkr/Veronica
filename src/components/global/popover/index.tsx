import React from "react";
import {
  Popover as PopOver,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const Popover = ({ trigger, children, className }: Props) => {
  return (
    <PopOver>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn(className, "bg-[#1D1D1D] shadow-lg overflow-y-scroll max-h-[270px] hide-scrollbar")}
        align="end"
        side="bottom"
      >
        {children}
      </PopoverContent>
    </PopOver>
  );
};

export default Popover;
