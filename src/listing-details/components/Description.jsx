import React from "react";

function Description({ itemDetails }) {

  return (
    <div>
      {itemDetails?.listingDescription ? (
        <div className="p-5 rounded-xl bg-white shadow-md mt-7 border">
          <h2 className="my-2 font-medium text-2xl">Description</h2>
          <p>{itemDetails?.listingDescription}</p>
        </div>
      ) : (
        <div className="w-full h-[150px] bg-slate-200 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
}

export default Description;
