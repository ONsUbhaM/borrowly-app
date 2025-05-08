import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownField({ item, handleInputChange, itemInfo }) {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item.required}
        defaultValue = {itemInfo?.[item?.name]}
      >
        <SelectTrigger className="w-full text-black !bg-white">
          <SelectValue placeholder={itemInfo?.[item?.name]?itemInfo?.[item?.name]:item.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropdownField;
