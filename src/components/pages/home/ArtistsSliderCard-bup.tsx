import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  img_: StaticImageData;
  name_: string;
  id_: string,
  views: number,
  monthly_listeners: number,
  facebook_count: number,
  youtube_count: number,
  twitter_count: number,
  spotify_count: number,
  soundcloud_count: number,
  instagram_count: number;
  albumsCount: number
};

const ArtistsSliderCard = ({ img_, name_, id_, views, albumsCount, monthly_listeners, facebook_count, youtube_count, twitter_count, spotify_count, soundcloud_count, instagram_count }: Props) => {
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + 'B';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }
  return (
    <div className="swiper-slide trending__item round30 p-8">
      <div className="thumb ralt overhid transition">
        <Link href={`/artist-allsong?artist=${name_}`} className="white">
          <Image
            src={`/img22/img/profile/${img_}`}
            width={300}
            height={300}
            style={{ borderRadius: '50%', justifyContent: 'center' }}
            className="transition h-auto"
            alt="img"
          />
        </Link>
        <div className="align-items-center justify-content-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
          <h5 style={{ textAlign: 'center', marginTop: 10 }}>
            {name_}
          </h5>
          <button style={{
            backgroundColor: '#0ca4da',
            color: 'white',
            borderRadius: '5px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: 10
          }}>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', marginTop: 3 }}> {/* Adjust the size of the icon as needed */}
              <path fill="transparent" stroke="currentColor" fillRule="evenodd" clipRule="evenodd" d="M2.7899 3.82249C5.17644 1.3925 9.04578 1.3925 11.4323 3.82249L12 4.4005L12.5677 3.82249C14.9542 1.3925 18.8236 1.3925 21.2101 3.82249C23.5966 6.25247 23.5966 10.1923 21.2101 12.6222L12 22L2.7899 12.6222C0.403366 10.1923 0.403366 6.25247 2.7899 3.82249Z" strokeLinecap="round"></path>
            </svg>
            <span>Follow</span>
          </button>

          <h5 style={{ textAlign: 'center' }}>
            {formatNumber(views)} total views
          </h5>
          <h5 style={{ textAlign: 'center' }}>
            {formatNumber(monthly_listeners)} monthly listeners
          </h5>
          <h5 style={{ textAlign: 'center' }}>
            {formatNumber(soundcloud_count + spotify_count + twitter_count + youtube_count + facebook_count + instagram_count)} social followers
          </h5>
          <h5 style={{ textAlign: 'center' }}>
            {formatNumber(albumsCount)} photos
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ArtistsSliderCard;
