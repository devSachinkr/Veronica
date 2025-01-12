"use client";

import axios from "axios";
import { useState } from "react";

const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const onSubscribe = async () => {
    setIsProcessing(true);
    const res = await axios.get("/api/payment");
    if (res.data.status === 200) {
      return (window.location.href = `${res.data.session_url}`);
    }
    setIsProcessing(false);
  };

  return {
    isProcessing,
    onSubscribe,
  };
};

export { useSubscription };
