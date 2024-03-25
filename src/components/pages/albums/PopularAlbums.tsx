"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Navigation, Scrollbar } from "swiper";
import AlbumCard from "@/components/shared/AlbumCard";

type Props = {
  sectionTitle: string;
  sliderData: {
    name_: string;
    artist_name: string;
    id_: number;
  }[];
};
const PopularAlbums = ({ sectionTitle, sliderData }: Props) => {


  return (
    // <!--genres section-->
    <section className="genres__section pr-24 pl-24 pb-100">
      <div className="container-fluid">
        <div className="header__text mb-30">
          <h2>{sectionTitle}</h2>
        </div>
        <Swiper
          modules={[Navigation, Scrollbar]}
          speed={200}
          spaceBetween={12}
          loop={true}
          // smartspeed={ 1000}
          breakpoints={{
            320: {
              slidesPerView: 1,
              scrollbar: {
                dragSize: 40,
              },
            },
            575: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 5,
            },
            1600: {
              slidesPerView: 6,
              scrollbar: {
                dragSize: 240,
              },
            },
          }}
          scrollbar={{
            el: ".swiper-scrollbar",
          }}
          navigation={{
            nextEl: ".cmn-button-next2",
            prevEl: ".cmn-button-prev2",
          }}
          className="swiper products__slider"
        >
          <div className=" ">
            {sliderData.map((props) => (
              <SwiperSlide key={props.id_}>
                {/* <div className="swiper-slide">
                  <MoodsCard {...props} link="music-details" />
                </div> */}
                <AlbumCard {...props} />
              </SwiperSlide>
            ))}
          </div>
          <div className="d-flex gap-4 mt-40 align-items-center">
            <div className="gap-1 d-flex">
              <div className="cmn-button-prev2">
                <IconChevronLeft />
              </div>
              <div className="cmn-pagination"></div>
              <div className="cmn-button-next2">
                <IconChevronRight />
              </div>
            </div>
            <div className="swiper-scrollbar"></div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default PopularAlbums;
