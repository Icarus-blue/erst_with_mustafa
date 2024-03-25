import ProductDetails from "@/components/pages/cart/ProductDetails";
import BreadCrumSingle from "@/components/shared/BreadCrumSingle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const cart = () => {
  return (
    <>
      <BreadCrumSingle page="Cart" />
      <ProductDetails />
    </>
  );
};

export default cart;
