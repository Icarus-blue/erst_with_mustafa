import ShowDetailsSection from "@/components/pages/show-details/ShowDetailsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Show Details - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const showDetails = () => {
  return (
    <>
      <ShowDetailsSection />
    </>
  );
};

export default showDetails;
