import { getDownloadURL, ref, deleteObject } from "firebase/storage";
import { React, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { storage } from "./../../../configs/firebaseConfig";
import { uploadBytes } from "firebase/storage";
import { ItemImages, ItemListing } from "./../../../configs/schema";
import { db } from "./../../../configs";
import { eq, and } from "drizzle-orm";

function UploadImages({ triggerUploadImages, setLoader, existingImages = [] }) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [existingImageList, setExistingImageList] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // Initialize with existing images
  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setExistingImageList(existingImages);
    }
  }, [existingImages]);

  const onFileSelected = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setSelectedFileList((prev) => [...prev, ...files]);
  };

  const onImageRemove = async (image, index, isExisting = false) => {
    if (isExisting) {
      // Mark image for deletion from DB and storage
      setImagesToDelete((prev) => [...prev, image.id]);
      setExistingImageList((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove from selected files list
      setSelectedFileList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const deleteImageFromStorage = async (imageUrl) => {
    try {
      // Extract path from URL and create reference
      const path = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      console.error("Error deleting image from storage:", error);
      return false;
    }
  };

  const deleteImagesFromDatabase = async (imageIds) => {
    try {
      for (const imageId of imageIds) {
        await db
          .delete(ItemImages)
          .where(
            and(
              eq(ItemImages.id, imageId),
              eq(ItemImages.itemListingId, triggerUploadImages)
            )
          );
      }
      return true;
    } catch (error) {
      console.error("Error deleting images from database:", error);
      return false;
    }
  };

  const UploadImageToServer = async () => {
    setLoader(true);

    try {
      //1.Delete marked images first
      if (imagesToDelete.length > 0) {
        // getting the images to delete from existingImageList
        const imagesToRemove = existingImageList.filter((img) =>
          imagesToDelete.includes(img.id)
        );

        // First delete from database
        const dbDeleteSuccess = await deleteImagesFromDatabase(imagesToDelete);

        // Only delete from storage if database deletion succeeded
        if (dbDeleteSuccess) {
          await Promise.all(
            imagesToRemove.map((img) => deleteImageFromStorage(img.imageUrl))
          );
        }

        // Clear deletion queue
        setImagesToDelete([]);
      }

      // 2. Upload new images
      const uploadPromises = selectedFileList.map(async (file) => {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `Borrowly/${fileName}`);

        await uploadBytes(storageRef, file, {
          contentType: file.type || "image/jpeg",
        });

        const downloadUrl = await getDownloadURL(storageRef);
        await db.insert(ItemImages).values({
          imageUrl: downloadUrl,
          itemListingId: triggerUploadImages,
        });
      });

      await Promise.all(uploadPromises);

      // Clear selected files after upload
      setSelectedFileList([]);
    } catch (error) {
      console.error("Image processing error:", error);
      toast.error("Error processing images");
    } finally {
      setLoader(false);
      // Add this to ensure navigation happens after all operations
      setTimeout(() => setLoader(false), 1000);
    }
  };

  useEffect(() => {
    if (triggerUploadImages !== null) {
      UploadImageToServer();
    }
  }, [triggerUploadImages]);

  return (
    <div className="my-4">
      <h2 className="font-medium text-xl my-3">Upload Item Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {/* Existing Images */}
        {existingImageList.map((image, index) => (
          <div key={`existing-${image.id}`} className="relative group">
            <IoIosCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer hover:text-red-500 z-10"
              onClick={() => onImageRemove(image, index, true)}
            />
            <img
              src={image.imageUrl}
              className="w-full h-[130px] object-cover rounded-xl"
              alt={`Existing ${index}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>
        ))}

        {/* Newly Selected Images */}
        {selectedFileList.map((image, index) => (
          <div key={`new-${index}`} className="relative group">
            <IoIosCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer hover:text-red-500 z-10"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt={`Preview ${index}`}
            />
          </div>
        ))}

        {/* Upload Button */}
        <label htmlFor="upload-Images" className="cursor-pointer">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 hover:shadow-md flex items-center justify-center h-full">
            <div className="text-center">
              <span className="text-2xl">+</span>
              <p className="text-sm mt-2">Add Images</p>
            </div>
          </div>
          <input
            type="file"
            multiple
            id="upload-Images"
            onChange={onFileSelected}
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

export default UploadImages;
