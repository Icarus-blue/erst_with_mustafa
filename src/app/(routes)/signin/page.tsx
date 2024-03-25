import SignInForm from "@/components/pages/signin/SignInForm";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sign in - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const signIn = () => {
  return (
    <>
      <BreadCrumSingle page="Sign in" />
      <SignInForm />
    </>
  );
};

export default signIn;
