import BlogDetailsPost from "@/components/pages/blog-details/BlogDetailsPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Blog Details - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const blogDetails = () => {
  return (
    <>
      <BlogDetailsPost />
    </>
  );
};

export default blogDetails;
