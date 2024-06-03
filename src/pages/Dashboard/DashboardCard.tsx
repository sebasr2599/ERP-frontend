import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const DashboardCard: React.FC<ModuleInterface> = ({ title, icon, route }) => {
  const navigateTo = useNavigate();
  const handleOnClickCard = () => {
    navigateTo(route);
  };
  return (
    <Card
      className="flex items-center justify-center max-w-full min-w-full h-72 mx-auto p-10 hover:cursor-pointer"
      onClick={handleOnClickCard}
    >
      <CardContent className="text-center">
        <div className="mb-4">{icon}</div>
        <Typography variant="h5" component="div" className="text-primary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
