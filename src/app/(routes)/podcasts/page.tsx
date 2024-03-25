import PodcastSection from "@/components/pages/podcasts/PodcastSection";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Podcasts - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const podcast = () => {
  return (
    <>
      <BreadCrumSingle page="Podcasts" />
      <PodcastSection />
    </>
  );
};

export default podcast;
