import DashboardCard from './DashboardCard';
import { DashboardModules } from './DashboardModules';

// const boxStyle = {
//   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the values to your preference
//   // padding: '16px', // Add padding to mimic Paper component
//   backgroundColor: '#fff', // Set background color if needed
// };onCl
//

export const Dashboard: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {DashboardModules.map((module, index) => (
          <DashboardCard key={index} title={module.title} icon={module.icon} route={module.route} />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
