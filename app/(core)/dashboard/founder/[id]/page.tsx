//@ts-nocheck
"use client";
import { useParams } from "next/navigation";
import { ProductAnalytics } from "../_components/ProductAnalytics";

const ProductAnalyticsPage = () => {
  const params = useParams();
  const id: string = params?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/15 via-secondary/25 to-accent/45 px-4 py-6">
      <div className="max-w-screen-xl mx-auto">
        <ProductAnalytics pitchId={id} />
      </div>
    </div>
  );
};

export default ProductAnalyticsPage;
