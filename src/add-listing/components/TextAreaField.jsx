import React from "react";
import { Textarea } from "@/components/ui/textarea";

function TextAreaField({ item, handleInputChange, itemInfo }) {
  return (
    <div>
      <Textarea
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        required={item.required}
        defaultValue = {itemInfo?.[item.name]}
      />
    </div>
  );
}

export default TextAreaField;
