"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem("user_role");

    if (isSignedIn) {
      if (role === "founder") router.push("/dashboard/founder");
      else if (role === "investor")
        router.push("/dashboard/investor/interestedPitches");
      else router.replace("/");
    } else {
      // Set redirect URL based on role
      if (role === "investor") setUrl("/dashboard/investor");
      else if (role === "founder") setUrl("/dashboard/founder");
      else setUrl("/"); // fallback
    }
  }, [isSignedIn, router]);

  // Don’t render SignIn until url is ready
  if (!url) return null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn forceRedirectUrl={url} />
    </div>
  );
};

export default SignInPage;
