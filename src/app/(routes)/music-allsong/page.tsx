import { topSongData } from "@/../public/data/topSongData";
import PopularAlbums from "@/components/pages/albums/PopularAlbums";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Music All Song - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const musicAllSong = () => {
  return (
    <>
      <BreadCrumSingle page="Music" />
      {/* <PopularAlbums sectionTitle="Top Songs" sliderData={topSongData} /> */}
    </>
  );
};

export default musicAllSong;
