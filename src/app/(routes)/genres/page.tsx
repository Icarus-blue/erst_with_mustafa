import GenresSection from "@/components/pages/genres/GenresSection";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genres - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const genres = () => {
  return (
    <>
      <BreadCrumSingle page="Genres" />
      <GenresSection />
    </>
  );
};

export default genres;
