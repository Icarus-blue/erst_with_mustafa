'use client'
import { StaticImageData } from "next/image";
import SongUpgradeTableRow from "./SongUpgradeTableRow";
import VideoCard from "../home/VideoCard";
import ShortMusicVideo from "@/components/shared/ShortMusicVideo";
import { fetchData } from "@/utils/fetchData";
import { useState } from "react";
type Props = {
  sectionTitle: string;
  artistSong: {
    id?: string;
    title?: string;
    location?: string;
    listeners?: number;
    img?: string;
    id_?: string;
    artist_id?: string;
    artist_name?: string;
    artist_url?: string;
    feat_artists?: string;
    video_id?: string;
    uploader?: string;
    release_date?: Date;
    added_date?: Date;
    category?: string;
    views?: string;
    duration: number;
  }[];
  album_id?: string;
  album?: string;
};

const SongUpgrade = ({ sectionTitle, artistSong, album, album_id }: Props) => {

  const [artistSongs, setArtistSongs] = useState([...artistSong])

  return (
    // <!--song upgrade section-->
    <section className="latest__upgrade pb-100 pr-24 pl-24">
      <div className="container-flud p-0">
        <h3 className="white mb-16">{sectionTitle}</h3>
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="latest__songwrap moods__allsong">
              <table className="table align-middle align-center w-100">
                <tbody>
                  {artistSongs?.slice(0, artistSongs.length/2+1).map(({ ...props }, index) => (
                    <ShortMusicVideo
                      key={props.id_}
                      {...props}
                      index={index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="latest__songwrap moods__allsong">
              <table className="table align-middle align-center w-100">
                <tbody>
                  {artistSongs?.slice(5, -1).map(({ id, ...props }, index) => (
                    <ShortMusicVideo
                      key={props.id_}
                      {...props}
                      index={index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center mt-40">
          {/* <button className="cmn__simple2"
            onClick={async () => {
              const data = await fetchData('/data/videos', artistSong.length / 10 === 1 ? 2 : artistSong.length / 10, 10, null, parseInt(album_id), album)
              data.status && (
                setArtistSongs(prev => ([...prev, ...data.videos]))
              )
            }}
          >Load More</button> */}
        </div>
      </div>
    </section >
  );
};

export default SongUpgrade;
