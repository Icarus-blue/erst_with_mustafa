import { songUpgradeData } from "@/../public/data/songUpgrdeData";
import SongUpgrade from "@/components/pages/album-allsong/SongUpgrade";
import TopSinger from "@/components/pages/album-allsong/TopSinger";
import { fetchData } from "@/utils/fetchData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Album All Song - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const albumAllSong = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) => {

  const data = await fetchData('/data/videos', 1, 20, null, parseInt(searchParams.album_id), searchParams.album)
  if(!data.status) console.log(data.message)
  return (
    <>
      <TopSinger />
      <SongUpgrade
        album={searchParams.album}
        album_id={searchParams.album_id}
        sectionTitle="Mix All Songs"

        artistSong={data?.status ? data.videos : []} />
    </>
  );
};

export default albumAllSong;
