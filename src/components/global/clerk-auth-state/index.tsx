import React from "react";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";
import { Loader } from "../loader";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
const ClerkAuthState = () => {
  return (
    <>
      <ClerkLoading>
        <Loader loading>
          <></>
        </Loader>
      </ClerkLoading>
      <SignedOut>
        <SignInButton>
          <Button className="rounded-xl bg-[#252525] text-white text-sm hover:bg-[#252525]/70">
            <User />
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.UserProfileLink
            label="Dashboard"
            url="/dashboard"
            labelIcon={<User size={16} />}
          />
        </UserButton>
      </SignedIn>
    </>
  );
};

export default ClerkAuthState;
