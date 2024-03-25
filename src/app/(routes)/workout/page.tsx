import Workout from "@/components/pages/home/Workout";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Workout - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const workout = () => {
  return (
    <>
      <BreadCrumSingle page="Workout" />
      <Workout />
    </>
  );
};

export default workout;
