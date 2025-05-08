import FakeData from "@/Shared/FakeData";
import React, { useEffect, useState } from "react";
import CycleItem from "./CycleItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FormatResult } from "@/Shared/Services";
import { db } from "./../../configs";
import { ItemListing, ItemImages } from "./../../configs/schema";
import { desc, eq } from "drizzle-orm";

function MostSearchedItem() {

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    GetPopularItemList();
  },[]);

  const GetPopularItemList = async() => {
    const result = await db
          .select()
          .from(ItemListing)
          .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
          .orderBy(desc(ItemListing.id))
          .limit(10)

          const resp = FormatResult(result);
          console.log(resp);
          setItemList(resp);
  }
  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center mt-16 mb-7">
        Most Searched Cycle
      </h2>
      <Carousel >
        <CarouselContent>
          {itemList.map((car, index) => (
            <CarouselItem key={index} className='basis-1/4'>
              <CycleItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='!bg-white' />
        <CarouselNext className='!bg-white'/>
      </Carousel>
    </div>
  );
}

export default MostSearchedItem;
