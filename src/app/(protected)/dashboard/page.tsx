import { authUser } from "@/actions/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await authUser();
  if (user.status === 200 || user.status === 201) {
    return redirect(`/dashboard/${user.data?.firstName}${user.data?.lastName}`);
  }

  return redirect("/sign-in");
};

export default page;
