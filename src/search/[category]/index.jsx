import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Search from "@/components/Search";
import { useParams } from "react-router-dom";
import { db } from "./../../../configs";
import { ItemImages, ItemListing } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FormatResult } from "@/Shared/Services";
import CycleItem from "@/components/CycleItem";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function SearchByCategory() {
  const { catagory } = useParams();
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetItemList();
  }, [catagory]);

  const GetItemList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(ItemListing)
        .innerJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
        .where(eq(ItemListing.catagory, catagory));

      const resp = FormatResult(result);
      setItemList(resp);
    } catch (e) {
      console.error("Error fetching items:", e);
      setError("Failed to load items");
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-10 bg-black flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl">
          {catagory}
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 md:px-20">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500">{error}</div>
        ) : itemList.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No items found in this category
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
            {itemList.map((item, index) => (
              <CycleItem key={index} car={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByCategory;
