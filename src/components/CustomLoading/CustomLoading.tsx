import { PropagateLoader } from 'react-spinners';

const CustomLoading = () => {
  return (
    <div className="w-full grid justify-center items-center p-4 absolute h-2/3">
      <PropagateLoader color="#900A20" loading size={25} />
    </div>
  );
};

export default CustomLoading;
