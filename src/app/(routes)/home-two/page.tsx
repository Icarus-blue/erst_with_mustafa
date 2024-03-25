import { productData } from "@/../public/data/productDta";
import Banner from "@/components/pages/home-two/Banner";
import TrendingSlider from "@/components/pages/home-two/TrendingSlider";
import Artists from "@/components/pages/home/Artists";
import FeaturedShows from "@/components/pages/home/FeaturedShows";
import LatestPost from "@/components/pages/home/LatestPost";
import Moods from "@/components/pages/home/Moods";
import Podcasts from "@/components/pages/home/Podcast";
import Product from "@/components/pages/home/Product";
import Workout from "@/components/pages/home/Workout";
import { RootState } from "@/redux/store";
import { login } from "@/redux/userSlice";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const metadata: Metadata = {
  title:
    "Home Two - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const HomeTwo = () => {


  return (
    <>
      <Banner />
      <TrendingSlider />
      <Moods />
      <Artists />
      <Workout end={6} />
      <FeaturedShows />
      <Podcasts />
      <Product sectionTitle="Product" componentData={productData} />
      <LatestPost />
    </>
  );
};

export default HomeTwo;
