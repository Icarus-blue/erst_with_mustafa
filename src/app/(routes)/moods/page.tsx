import MoodsSection from "@/components/pages/moods/MoodsSlider";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moods - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const moods = () => {
  return (
    <>
      <BreadCrumSingle page="Moods" />
      <MoodsSection />
    </>
  );
};

export default moods;
