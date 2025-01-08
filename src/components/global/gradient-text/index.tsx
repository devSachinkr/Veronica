import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"|"div";
};

const GradientText = ({ children, className, element, ...rest }: Props) => {
     switch (element) {
        case "h1":{
            return (
                <h1 className={
                    cn(
                        "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                        className
                    )
                } {...rest}>
                    {children}
                </h1>
            )
        }
        case "h2":{
                return (
                    <h2 className={
                        cn(
                            "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </h2>
                )
            }
            case "h3":{
                return (
                    <h3 className={
                        cn(
                            "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </h3>
                )
            }
            case "h4":{
                return (
                    <h4 className={
                        cn(
                            "text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </h4>
                )
            }
            case "h5":{
                return (
                    <h5 className={
                        cn(
                            "text-lg font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </h5>
                )
            }
            case "h6":{
                return (
                    <h6 className={
                        cn(
                            "text-base font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </h6>
                )
            }
            case "span":{
                return (
                    <span className={
                        cn(
                            "text-base font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </span>
                )
            }
            case "div":{
                return (
                    <div className={
                        cn(
                            "text-base font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </div>
                )
            }
           
            default:{
                return (
                    <p className={
                        cn(
                            "text-base font-bold text-transparent bg-clip-text bg-gradient-to-tr from-demon-Yellow via-yellow-200 to-yellow-700",
                            className
                        )
                    } {...rest}>
                        {children}
                    </p>
                )
            }
     }
};

export default GradientText;
