import ProfileSection from "@/components/pages/profile/ProfileSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Profile - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const profile = () => {
  return (
    <>
      <ProfileSection />
    </>
  );
};

export default profile;
