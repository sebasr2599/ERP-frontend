import { IconButton } from '@mui/material';
import { FC } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
export interface PaginationProps {
  isPlaceholderData: boolean;
  prevPage: [] | number[];
  onPrevClick: () => void;
  onNextClick: () => void;
}
const Pagination: FC<PaginationProps> = ({ isPlaceholderData, prevPage, onPrevClick, onNextClick }) => {
  return (
    <div className="p-2 md:px-8 md:py-4 flex gap-1 justify-end items-center w-full ">
      <IconButton
        aria-label="Página anterior"
        onClick={onPrevClick}
        disabled={isPlaceholderData || prevPage === undefined || prevPage.length == 0}
      >
        <ArrowBack />
      </IconButton>
      <IconButton aria-label="Página siguiente" onClick={onNextClick} disabled={isPlaceholderData}>
        <ArrowForward />
      </IconButton>
    </div>
  );
};

export default Pagination;
