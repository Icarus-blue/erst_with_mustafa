import ProfileEditForm from "@/components/pages/profile-edit/ProfileEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Profile - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const profileEdit = () => {
  return (
    <>
      <ProfileEditForm />
    </>
  );
};

export default profileEdit;
