'use client'
import api from "@/lib/api";
import { IconBrandFacebook, IconBrandFacebookFilled, IconBrandInstagram, IconBrandWikipedia, IconBrandYoutube, IconBrandYoutubeFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Artist = () => {

  const [artist, setArtist] = useState(null)
  const sq = useSearchParams();

  const getArtist = async () => {
    try {
      const res = await api.server.GET(`/data/artists/${sq.get('artist_id')}`, '');
      const data = await res.json()
      console.log("data", data)
      if (data.status) {
        setArtist(data.artist)
        return
      }
      toast(data.message, { theme: 'dark' })
    } catch (error: any) {
      toast(error.message, { theme: 'dark' })
    }
  }


  useEffect(() => {
    const getData = async () => {
      getArtist()
    }
    getData()
  }, [])

  if (!artist) return
  return (
    // <!--genres section-->
    <section className="genres__section custom__space pr-24 pl-24 pb-60">
      <div className="container-fluid">
        <div className="artist__allhead d-flex">
          <Image
            width={390}
            height={390}
            src={`/img22/img/profile/${artist.img_}`}
            alt=""
            className="flex-shrink-0 h-auto"
          />
          <div className="artist__allcontent">
            <h3 className="white mb-10">{artist.alternate_name}</h3>
            <span className="white fs-20 mb-16 fw-500 d-block">{artist.name_}</span>
            <div className="d-flex justify-content-between">
              <Link href={artist?.wikipedia} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandWikipedia /></span>
              </Link>
              <Link href={artist?.facebook} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandFacebookFilled /></span>
              </Link>

              <Link href={artist?.instagram} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandInstagram /></span>
              </Link>

              <Link href={artist?.youtube} target="_blank" className="p-2 white fs-20 mb-16 fw-500 d-block">
                <span><IconBrandYoutubeFilled /></span>
              </Link>
            </div>
            {/* <p className="fs-16 bodyfont pra mb-20">
              Chester Bennington&apos;s legacy continues through his music, and
              he is remembered as a talented and influential artist who touched
              the lives of many with his emotive performances and deeply
              personal lyrics. His impact on the music industry and his devoted
              fan base endures, making him an unforgettable figure in the world
              of rock music.
            </p>
            <ul className="artist__list mb-20">
              <li>Theme Forest</li>
              <li>3D Ocean</li>
              <li>Graphic River</li>
              <li>Code Canayon</li>
            </ul>
            <p className="pra fs-16 mb-10">
              In 1993, he joined the band Grey Daze as their lead vocalist and
              released two albums with them before departing in 1998. Later, in
              1999, Chester Bennington joined Linkin Park, a band formed by Mike
              Shinoda and Brad Delson, and became one of its most iconic
              members.
            </p>
            <p className="pra fs-16">
              Chester Bennington&apos;s powerful and emotive vocals, along with
              his ability to convey deep emotions through his lyrics, made him
              an admired figure in the rock music scene. His performances were
              often praised for their energy and passion.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artist;
