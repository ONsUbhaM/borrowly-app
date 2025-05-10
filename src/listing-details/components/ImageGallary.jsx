import React from "react";

function ImageGallery({ itemDetails }) {
  return (
    <div>
      {itemDetails?.images[0].imageUrl ? (
        <img
          src={itemDetails?.images[0].imageUrl}
          alt="Item Images"
          className="w-full h-[500px] object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-[350px] bg-slate-200 animate-pulse rounded-xl mt-1"></div>
      )}
    </div>
  );
}

export default ImageGallery;
