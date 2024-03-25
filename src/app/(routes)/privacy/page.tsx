import PrivacyPolicy from "@/components/pages/privacy/PrivacyPolicy";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Privacy - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const privacy = () => {
  return (
    <>
      <BreadCrumSingle page="Privacy Policy" />
      <PrivacyPolicy />
    </>
  );
};

export default privacy;
