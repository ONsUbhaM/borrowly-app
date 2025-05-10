import React from "react";
import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOutlineSpeed } from "react-icons/md";
import { IoIosOpen } from "react-icons/io";
import { Link } from "react-router-dom";

function CycleItem({ car }) {
  return (
    <Link to={"/listing-details/" + car?.id} className="no-underline !text-black">
      <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm pb-1 text-white">
          {car.postedOn}
        </h2>
        <img
          src={car?.images[0]?.imageUrl}
          alt="Image"
          width={"100%"}
          height={250}
          className="rounded-xl h-[180px] object-cover"
        />
        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2">
            {car?.listingTitle}
          </h2>
          <Separator />
        </div>
        <div className="grid grid-cols-3 mt-5">
          <div className="flex flex-col items-center">
            <LuFuel className="text-lg  mb-2" />
            <h2>{car?.year} Year</h2>
          </div>
          <div className="flex flex-col items-center">
            <MdOutlineSpeed className="text-lg mb-2" />
            <h2>{car?.offerType}</h2>
          </div>
          <div className="flex flex-col items-center">
            <GiGearStickPattern className="text-lg mb-2" />
            <h2>{car?.condition}</h2>
          </div>
        </div>
        <Separator className="my-2" />
        <div className=" flex items-center justify-between">
          <h2 className="font-bold text-xl">₹{car?.rentalprice}</h2>
          <h2 className="text-blue-700 text-sm flex gap-2 items-center">
            View Details <IoIosOpen className="text-blue-700" />
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default CycleItem;
