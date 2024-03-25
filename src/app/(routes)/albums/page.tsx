import PopularAlbums from "@/components/pages/albums/PopularAlbums";
import Trending from "@/components/pages/albums/Trending";
import BreadCrumb from "@/components/shared/BreadCrum";
import { fetchData } from "@/utils/fetchData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ablums - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const albums = async () => {

  const data = await fetchData('/data/albums', 1, 12)
  return (
    <>
      <BreadCrumb page="Albums" />
      <Trending />
      <PopularAlbums sectionTitle="Popular Albums" sliderData={(data?.status && data?.albums) || []} />
    </>
  );
};

export default albums;
