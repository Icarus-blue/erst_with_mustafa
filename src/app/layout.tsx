import AddToPlaylistModal from "@/components/shared/AddToPlaylistModal";
import AudioPlayerModalLayoutTwo from "@/components/shared/AudioPlayerModalLayoutTwo";
import DeletePostModal from "@/components/shared/DeletePostModal";
import MainBody from "@/components/shared/MainBody";
import ReportModal from "@/components/shared/ReportModal";
import SharedModal from "@/components/shared/SharedModal";
import { poppins } from "@/utils/fonts";
import { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/scss/scrollbar";
import ".././styles/sass/main.scss";
import Loader from "./Loader";
import AddProfileImage from "@/components/shared/AddProfileImageModal";

export const metadata: Metadata = {
  title:
    "Ersy",
  description: "Ersy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <MainBody>
          <main className="z-1">
            <Suspense>{children}</Suspense>
          </main>
          {/* <AudioPlayerModalLayoutTwo /> */}
        <AddProfileImage />
        </MainBody>
        <AddToPlaylistModal />
        <SharedModal />
        <DeletePostModal />
        <ReportModal />
        <Toaster />
      </body>
    </html>
  );
}
