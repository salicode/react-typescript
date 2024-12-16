import React from "react";
import categories from "../categories";
interface ExpenseFilterProps {
  onSelectCategory: (category: string) => void;
}
export const ExpenseFilter = ({ onSelectCategory }: ExpenseFilterProps) => {
  console.log("category", categories);
  return (
    <select
      className="form-select"
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};
