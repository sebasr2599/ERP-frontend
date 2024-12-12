import { UseQueryResult } from '@tanstack/react-query';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
export interface CategorySliderProps {
  categoriesQuery: UseQueryResult<Category[], Error>;
  selectedCategory: number | undefined;
  onCategorySelect: (event: React.MouseEvent<HTMLElement>, selected: number) => void;
}
const CategorySlider: FC<CategorySliderProps> = ({ categoriesQuery, selectedCategory, onCategorySelect }) => {
  return (
    <div className="overflow-x-auto scroll-pl-4 w-3/4 md:w-1/2 ">
      <ToggleButtonGroup value={selectedCategory} exclusive onChange={onCategorySelect} className="flex">
        {categoriesQuery.data?.map((category) => (
          <ToggleButton key={category.id} value={category.id || 0} className="flex-shrink-0">
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default CategorySlider;
