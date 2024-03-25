import EventSection from "@/components/pages/event/EventSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const createEvent = () => {
  return (
    <>
      <EventSection />
    </>
  );
};

export default createEvent;
