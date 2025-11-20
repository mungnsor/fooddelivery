import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DownMenu({ foodMenu, setAddDish, addDish }) {
  console.log(foodMenu, "er");
  return (
    <Select
      onValueChange={(value) => setAddDish({ ...addDish, dishCategory: value })}
    >
      <SelectTrigger className="w-[288px] h-[38px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {foodMenu.map((index) => {
            return (
              <SelectItem key={index._id} value={index._id}>
                {index.categoryName}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
