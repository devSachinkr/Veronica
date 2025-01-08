import { Loader } from "@/components/global/loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center ">
      <Loader loading />
    </div>
  );
};

export default loading;
