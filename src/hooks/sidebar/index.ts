"use client";

import { usePathname } from "next/navigation";

const usePath = () => {
  const pathname = usePathname();
  const path = pathname.split("/");
  let page = path.at(-1);

  return { page, pathname };
};

const useSidebar = () => {
  return {};
};

export { useSidebar, usePath };
