import PopularArtists from "@/components/pages/artists/PopularArtists";
import FeaturedShows from "@/components/pages/home/FeaturedShows";
import BreadCrumb from "@/components/shared/BreadCrum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Artists - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const artists = () => {
  return (
    <>
      <BreadCrumb page="Popular Artists" />
      <PopularArtists />    
    </>
  );
};

export default artists;
