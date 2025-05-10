import React from "react";
import { HiCalendarDateRange } from "react-icons/hi2";

function DetailHeader({ itemDetails }) {
  return (
    <div>
      {itemDetails?.listingTitle ? (
        <div>
          <h2 className="font-bold text-3xl">{itemDetails?.listingTitle}</h2>
          <p>{itemDetails?.tagline}</p>
          <div className="flex gap-2 items-center bg-blue-100 rounded-full p-1 px-3 w-fit mb-6">
            <HiCalendarDateRange className="h-7 w-7 text-blue-700" />
            <h2 className="text-blue-900 text-sm">{itemDetails?.postedOn}</h2>
          </div>
        </div>
      ) : (
        <div className="w-[300px] rounded-xl h-[100px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default DetailHeader;
