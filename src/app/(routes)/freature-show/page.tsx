import FeatureShowSection from "@/components/pages/freature-show/FeatureShowSection";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Feature Show - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const FeatureShow = () => {
  return (
    <>
      <BreadCrumSingle page="Show" />
      <FeatureShowSection />
    </>
  );
};

export default FeatureShow;
