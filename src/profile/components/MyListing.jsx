import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ItemImages, ItemListing } from "./../../../configs/schema";
import { db } from "./../../../configs";
import { eq, and } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import { desc } from "drizzle-orm";
import { FormatResult } from "@/Shared/Services";
import CycleItem from "@/components/CycleItem";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { storage } from "./../../../configs/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { TbLoader3 } from "react-icons/tb";

function MyListing() {
  const { user } = useUser();
  const [itemList, setItemList] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

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
    setItemList(resp);
  };

  const deleteImageFromStorage = async (imageUrl) => {
    try {
      const path = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  };

  const handleDeleteItem = async (item) => {
    setDeletingId(item.id);
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      // 1. First delete all associated images from Firebase Storage
      if (item.images && item.images.length > 0) {
        await Promise.all(
          item.images.map(img => deleteImageFromStorage(img.imageUrl))
        );
      }

      // 2. Delete image records from database
      await db.delete(ItemImages)
        .where(eq(ItemImages.itemListingId, item.id));

      // 3. Delete the main listing record
      await db.delete(ItemListing)
        .where(eq(ItemListing.id, item.id));

      // 4. Update UI by removing the deleted item
      setItemList(prev => prev.filter(i => i.id !== item.id));
      
      toast.success("Listing deleted successfully");
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing ");
    }
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
          <div key={index} className="relative">
            <CycleItem car={item} />
            <div className="p-2 bg-gray-200 rounded-lg flex justify-between">
              <Link to={"/add-listing?mode=edit&id=" + item?.id} className="w-full">
                <Button className="w-24 !bg-[#1AB6B4] text-white">Edit</Button>
              </Link>
              <Button 
                className="!bg-red-500"
                onClick={() => handleDeleteItem(item)}
                disabled = {deletingId === item.id}
              >
                {deletingId === item.id ? <TbLoader3 className="animate-spin text-lg" /> : <FaTrashAlt />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListing;