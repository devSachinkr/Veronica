import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return <SignUp afterSignOutUrl={"/"} />;
};

export default page;
