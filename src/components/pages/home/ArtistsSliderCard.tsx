import { IconHeart } from "@tabler/icons-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  img_: StaticImageData;
  name_: string;
  id_: string;
  views: number;
  monthly_listeners: number;
  facebook_count: number;
  instagram_count: number;
  soundcloud_count: number;
  spotify_count: number;
  twitter_count: number;
  youtube_count: number;
  albumsCount: number;
};

function formatFollowCount(count: number) {
  const abbrev = ['', 'K', 'M', 'B'];
  const tier = Math.log10(Math.abs(count)) / 3 | 0;
  if (tier === 0) return count;
  const suffix = abbrev[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = count / scale;
  return scaled.toFixed(0) + suffix;
}

const ArtistsSliderCard = ({ img_, name_, id_, views, monthly_listeners, facebook_count, instagram_count, soundcloud_count, spotify_count, albumsCount, twitter_count, youtube_count }: Props) => {
  return (
    <div className="swiper-slide round16 p-8"> {/* // remove class trending__item */}
      <div className="thumb ralt overhid transition">
        <Image
          src={`/img22/img/profile/${img_}`}
          width={390}
          height={390}
          className="transition w-100 rounded-circle h-auto"
          alt="img"
        />
        <div className="d-flex flex-column justify-content-center align-items-center p-4">
          <h5 className="mb-3 text-center">
            <Link href={`/artist-allsong?artist=${name_}&artist_id=${id_}`} className="white">
              {name_}
            </Link>
          </h5>
          <button className="btn btn-primary d-flex align-items-center gap-1 fs-6"><IconHeart /> Follow</button>
          <div className="mt-3">
            <p className="text-center"><strong className="fw-bolder">{formatFollowCount(views)}</strong> totals views</p>
            <p className="text-center"><strong className="fw-bolder">{formatFollowCount(monthly_listeners)}</strong> monthly listeners</p>
            <p className="text-center"><strong className="fw-bolder">{formatFollowCount(facebook_count + instagram_count + soundcloud_count + spotify_count + twitter_count + youtube_count)} social followers</strong></p>
            <p className="text-center"><strong className="fw-bolder">{formatFollowCount(albumsCount)}</strong> photos</p>
          </div>
        </div>
        {/* <div className="d-flex align-items-center justify-content-between">
          <div className="content">
            <h5 className="mb-1">
              <Link href={`/artist-allsong?artist=${name_}&artist_id=${id_}`} className="white">
                {name_}
              </Link>
            </h5>
          </div>
          <Link href={`/artist-allsong?artist=${name_}&artist_id=${id_}`} className="cmn__arrow">
            <IconArrowNarrowRight className="arrowrotate" />
          </Link>
        </div> */}
      </div>
    </div >
  );
};

export default ArtistsSliderCard;
