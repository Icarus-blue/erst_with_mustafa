import { productData } from "@/../public/data/productDta";
import Product from "@/components/pages/home/Product";
import ProductDetailsSection from "@/components/pages/product-details/ProductDetailsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Product Details - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};

const productDetails = () => {
  return (
    <>
      <ProductDetailsSection />
      <Product sectionTitle="Related product" componentData={productData} />
    </>
  );
};

export default productDetails;
