import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FC } from 'react';
import { ViewList, ViewModule } from '@mui/icons-material';
export interface ViewSliderProps {
  viewMode: string;
  handleViewModeChange: (event: React.MouseEvent<HTMLElement>, nextView: string) => void;
}
const ViewSlider: FC<ViewSliderProps> = ({ viewMode, handleViewModeChange }) => {
  return (
    <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange}>
      <ToggleButton value="list" aria-label="list">
        <ViewList />
      </ToggleButton>
      <ToggleButton value="grid" aria-label="grid">
        <ViewModule />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewSlider;
