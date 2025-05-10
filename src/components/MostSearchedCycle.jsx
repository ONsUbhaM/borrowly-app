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
import { Skeleton } from "@/components/ui/skeleton";

function MostSearchedItem() {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPopularItemList();
  }, []);

  const GetPopularItemList = async () => {
    try {
      const result = await db
        .select()
        .from(ItemListing)
        .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
        .orderBy(desc(ItemListing.id))
        .limit(10);

      const resp = FormatResult(result);
      setItemList(resp);
    } catch (error) {
      console.error("Error fetching popular items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <h2 className="font-bold text-2xl sm:text-3xl text-center mb-6">
        Most Searched Items
      </h2>
      
      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {itemList.map((car, index) => (
              <CarouselItem 
                key={index} 
                className="pl-2 basis-1/1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="p-1">
                  <CycleItem car={car} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex !bg-white !border !border-gray-200" />
          <CarouselNext className="hidden sm:flex !bg-white !border !border-gray-200" />
        </Carousel>
      )}
    </div>
  );
}

export default MostSearchedItem;