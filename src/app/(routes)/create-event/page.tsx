import CreateEventSection from "@/components/pages/create-event/CreateEventSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Create Event - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const createEvent = () => {
  return (
    <>
      <CreateEventSection />
    </>
  );
};

export default createEvent;
