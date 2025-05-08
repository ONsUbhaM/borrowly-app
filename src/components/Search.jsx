import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from "@/Shared/Data";



function Search() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-5 bg-white rounded-md md:rounded-full gap-4 md:gap-10 w-[90%] md:w-[60%] mx-auto">
      <Select>
        <SelectTrigger className="text-black !bg-white outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Items" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Old">Old</SelectItem>
          <SelectItem value="Almost new">Almost new</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select>
        <SelectTrigger className="text-black !bg-white outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Item Brand" />
        </SelectTrigger>
        <SelectContent>
          {Data.ItemBrand.map((item) => (
            <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select>
        <SelectTrigger className="text-black !bg-white outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
        {Data.Pricing.map((price) => (
            <SelectItem key={price.id} value={price.amount}>{price.amount}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div>
        <CiSearch className="text-[40px] md:text-[50px] bg-[#660e60] rounded-full p-2 md:p-3 text-white hover:scale-105 transition-all cursor-pointer" />
      </div>
    </div>
  );
}

export default Search;
