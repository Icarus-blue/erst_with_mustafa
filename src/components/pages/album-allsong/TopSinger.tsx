
'use client'
import { topSongData } from "@/../public/data/topSongData";
import MoodsCard from "../home/MoodsCard";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { useSearchParams } from "next/navigation";
import VideoCard from "../home/VideoCard";

const TopSinger = () => {

  const [videos, setVideos] = useState([])
  const sq = useSearchParams()

  useEffect(() => {

    const getData = async () => {
      const data = await fetchData('/data/videos', 1, 12, '', parseInt(sq.get('album_id')), sq.get('album'));
      data.status && setVideos(prev => ([...prev, ...data.videos]))

      console.log('data albums', data)
    }

    getData()
  }, [])
  return (
    // <!--top singer section-->
    <section className="topsinger__song pb-100 custom__space pr-24 pl-24">
      <div className="container-flud p-0">
        <h3 className="white mb-16">Top Songs</h3>
        <div className="row g-4">
          {videos.slice(0, 6).map(({ ...props }) => (
            <div
              key={props.id_}
              className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
            >
              <VideoCard {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSinger;
