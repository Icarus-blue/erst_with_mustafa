import AllProducts from "@/components/pages/product/AllProducts";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Product - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const product = () => {
  return (
    <>
      <BreadCrumSingle page="Products" />
      <AllProducts />
    </>
  );
};

export default product;
