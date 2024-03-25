import SongUpdateSection from "@/components/pages/genres-allsong/SongUpdateSection";
import WorkoutSlider from "@/components/pages/workout-allsong/WorkoutSlider";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Workout All song - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const workoutAll = () => {
  return (
    <>
      <BreadCrumSingle page="Workout" />
      <WorkoutSlider />
      <SongUpdateSection />
    </>
  );
};

export default workoutAll;
