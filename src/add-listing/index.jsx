//3:51:23
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Header from "@/components/ui/Header";
import itemDetails from "./../Shared/itemDetails.json";
import InputField from "./components/InputField";
import DropdownField from "@/components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { ItemListing, ItemImages } from "./../../configs/schema";
import { db } from "./../../configs";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { TbLoader3 } from "react-icons/tb";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import moments from "moment";
import { useSearchParams } from "react-router-dom";
import { FormatResult } from "@/Shared/Services";
import { eq } from "drizzle-orm";

function AddListing() {
  // handling form data with the hook useState
  const [formData, setFormData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState(null);
  const [loader, setLoader] = useState(false); //after submitting the form will load, as soon as the form uploading is complete it will stop loading
  const [searchParams] = useSearchParams(); //getting the data in addlisting page for editing the data
  const [itemInfo, setItemInfo] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
      GetListingDetails();
  }, []);

  const GetListingDetails = async () => {
    const result = await db
      .select()
      .from(ItemListing)
      .innerJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
      .where(eq(ItemListing.id, recordId));

      console.log("Raw DB result:", result); // Add this line
    const resp = FormatResult(result);
    console.log("Formatted result:", resp); // Add this line
    
    setItemInfo(resp[0]);
    setFormData(resp[0]);
  };
  // using handleInputChange taking the value from user and pasing through this input change
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
  
    toast("Please wait .....");
  
    if (mode == "edit") {
      try {
        // Update the listing details
        const result = await db
          .update(ItemListing)
          .set({
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moments().format("DD/MM/YYYY"),
          })
          .where(eq(ItemListing.id, recordId))
          .returning({ id: ItemListing.id });
  
        // Trigger image upload for any new images
        setTriggerUploadImages(recordId);
        
        // Don't navigate immediately - let UploadImages handle it after upload
      } catch (error) {
        console.error("Update failed:", error);
        setLoader(false);
        toast.error("Update failed");
      }
    } else {
      try {
        const result = await db
          .insert(ItemListing)
          .values({
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moments().format("DD/MM/YYYY"),
          })
          .returning({ id: ItemListing.id });
          console.log(result);
        if (result) {
          console.log("Data Saved");
          setTriggerUploadImages(result[0]?.id);
          setTimeout(() => {
            setLoader(false);
          }, 3000);
          // setLoader(false); //after submitting it will set to false and user can submit something AiFillAliwangwang
        }
      } catch (e) {
        console.log("Databse error: ", e);
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* Item Details  */}
          <div>
            <h2 className="font-medium text-xl mb-6">Item Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {itemDetails.itemDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconField icon={item?.icon} />
                    {item?.label}{" "}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      itemInfo={itemInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField
                      className="!bg-white"
                      item={item}
                      handleInputChange={handleInputChange}
                      itemInfo={itemInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      itemInfo={itemInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Item Images  */}
          <Separator className="my-6" />
          <UploadImages
            triggerUploadImages={triggerUploadImages}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
            existingImages={itemInfo?.images || []}
          />
          {/* submit button for submitting form */}
          <div>
            <Button
              type="Button"
              disabled={loader}
              className="!bg-[#1AB6B4]"
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                "Submit"
              ) : (
                <TbLoader3 className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
