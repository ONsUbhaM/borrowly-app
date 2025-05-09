import React from "react";

function DetailHeader({ itemDetails }) {
  return (
    <div>
      <h2 className="font-bold text-3xl">{itemDetails?.listingTitle}</h2>
    </div>
  );
}

export default DetailHeader;