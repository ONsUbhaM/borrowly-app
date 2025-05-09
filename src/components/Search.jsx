import React, { useState }  from "react";
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
import { Link } from "react-router-dom";

function Search() {

  const [condition, setCondition] = useState();
  const [itemName, setItemName] = useState();


  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-5 bg-white rounded-md md:rounded-full gap-4 md:gap-10 w-[90%] md:w-[60%] mx-auto">
      <Select onValueChange={(value) => setCondition(value)}>
        <SelectTrigger className="text-black !bg-white outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="Certified-Pre-owned">
            Certified Pre-owned
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select onValueChange={(condition) => setItemName(condition)}>
        <SelectTrigger className="text-black !bg-white outline-none md:border-none w-full shadow-none text-lg">
          <SelectValue placeholder="Item" />
        </SelectTrigger>
        <SelectContent>
          {Data.Item.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Link to={'/search?condition='+ condition + "&item=" + itemName}>
        <CiSearch className="text-[40px] md:text-[50px] bg-[#660e60] rounded-full p-2 md:p-3 text-white hover:scale-105 transition-all cursor-pointer" />
        </Link>
    </div>
  );
}

export default Search;
