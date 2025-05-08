import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ItemImages, ItemListing } from "./../../../configs/schema";
import { db } from "./../../../configs";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import { desc } from "drizzle-orm";
import { FormatResult } from "@/Shared/Services";
import CycleItem from "@/components/CycleItem";
import { FaTrashAlt } from "react-icons/fa";

function MyListing() {
  const { user } = useUser();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    user && GetUserItemListing();
  }, [user]);

  const GetUserItemListing = async () => {
    const result = await db
      .select()
      .from(ItemListing)
      .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
      .where(eq(ItemListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(ItemListing.id));

    const resp = FormatResult(result);
    console.log(resp);

    setItemList(resp);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="Font-bold text-4xl">My Listings</h2>
        <Link to={"/add-listing"}>
          <Button className="!bg-[#1AB6B4]">+ Add New Listing</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-7 gap-5">
        {itemList.map((item, index) => (
          <div key={index}>
            <CycleItem car={item} />
            <div className="p-2 bg-gray-200 rounded-lg flex justify-between">
              <Link to={"/add-listing?mode=edit&id=" + item?.id} className="w-full">
                <Button className="w-24 !bg-[#1AB6B4] text-white">Edit</Button>
              </Link>
              <Button className="!bg-red-500">
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
