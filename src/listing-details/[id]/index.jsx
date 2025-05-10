import React, { useEffect } from "react";
import Header from "@/components/ui/Header";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router-dom";
import { db } from "./../../../configs";
import { FormatResult } from "@/Shared/Services";
import { ItemListing, ItemImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { useState } from "react";
import ImageGallery from "../components/ImageGallary";
import Description from "../components/Description";
import Pricing from "../components/Pricing";
import ItemProperties from "../components/ItemProperties";
import OwnersDetails from "../components/OwnersDetails";
import Footer from "@/components/Footer";
import MostSearchedItem from "@/components/MostSearchedCycle";
function ListingDetail() {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    GetItemDetail();
  }, []);

  const GetItemDetail = async () => {
    try{
      const result = await db
      .select()
      .from(ItemListing)
      .innerJoin(ItemImages, eq(ItemImages.itemListingId, ItemListing.id))
      .where(eq(ItemListing.id, id));

    const resp = FormatResult(result);
    setItemDetails(resp[0]);
    } catch(error){
      console.error("Error fetchign details:", error);
    }


  };
  return (
    <div>
      <Header />

      <div className="p-10 md:px-20">
        {/* Header Detail Component */}
        <DetailHeader itemDetails={itemDetails} />
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          {/* left */}
          <div className="md:col-span-2">
            {/* Image gallary */}
            <ImageGallery itemDetails = {itemDetails}/>
            {/* Description */}
            <Description itemDetails={itemDetails}/>
          </div>
          {/* Right */}
          <div className="">
            {/* Pricing  */}
            <Pricing itemDetails={itemDetails}/>

            {/* Item properties  */}
            <ItemProperties itemDetails = {itemDetails}/>

            {/* owner details */}
            <OwnersDetails itemDetails={itemDetails}/>
          </div>
        </div>
        <MostSearchedItem/>
      </div>
      <Footer/>
    </div>
  );
}

export default ListingDetail;
