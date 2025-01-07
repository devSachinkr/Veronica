import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return <SignIn afterSignOutUrl={"/"} />;
};

export default page;
