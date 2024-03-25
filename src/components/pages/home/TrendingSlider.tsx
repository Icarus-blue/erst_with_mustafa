"use client";
import { trendingsliderData } from "@/../public/data/trendingSliderData";
import Trending from "./Trending";
import TrendingSliderCard from "./TrendingSliderCard";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import VideoCard from "./VideoCard";
import Loader from "@/components/shared/Loader";

const TrendingSlider = () => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData('/data/videos', 5, 5, null, null, null, 'trending');
        data.status && setVideos(prev => ([...prev, ...data.videos]))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <Trending isLoading={isLoading} href="/music" sectionTitle="Trending Songs" sliderData={videos}>
      {/* {(props) => <VideoCard {...props} />} */}
      {((props) => <VideoCard {...props} />)}
    </Trending>
  );
};

export default TrendingSlider;
