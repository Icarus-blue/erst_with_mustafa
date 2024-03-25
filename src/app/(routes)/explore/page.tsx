import ExploreSection from "@/components/pages/explore/ExploreSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Explore - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const createEvent = () => {
  return (
    <>
      <ExploreSection />
    </>
  );
};

export default createEvent;
