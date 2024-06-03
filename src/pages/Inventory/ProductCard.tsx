import { Button } from '@mui/material';
import { FC, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ErrorImage from '../../assets/ErrorImage.png';
export interface ProductCardProps {
  //   children: ReactNode;
  product: Product;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onEditClick, onDeleteClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigateTo = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProductClick = () => {
    navigateTo(`/inventory/${product.id}`);
  };
  return (
    <div
      key={product.id}
      className="w-full max-w-sm border border-gray-800 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-self-center"
      style={{ backgroundColor: 'white', borderColor: '#F6F6F6' }}
    >
      <div className="relative">
        <div className="p-8 rounded-t-lg">
          <LazyLoadImage src={product.image} alt={product.name} placeholderSrc={ErrorImage} width={350} height={320} />
        </div>

        <div className="absolute top-0 right-0 m-2">
          <button onClick={handleDropdownToggle} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48  border border-gray-200 rounded-md shadow-lg"
              style={{ backgroundColor: 'white' }}
            >
              <button
                onClick={() => onEditClick(product)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteClick(product)}
                className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-right"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{product.name}</h5>
          <span className="text-3xl font-bold text-gray-900 ">
            <NumericFormat value={product?.priceUnit} prefix="$ " thousandSeparator displayType="text" disabled />
          </span>
        </div>
        <div className="flex items-center justify-between">
          {/* <span className="text-xl  text-gray-900 dark:text-white">{product?.unit?.name}</span> */}
          <span className="text-xl  text-gray-900 ">{product?.category?.name}</span>
          <Button
            onClick={handleProductClick}
            variant="contained"
            style={{ backgroundColor: '#900A20' }}
            className=" text-white"
          >
            Hacer inventario
          </Button>
        </div>
      </div>
    </div>
    // <div
    //   key={product.id}
    //   className="w-full max-w-sm  border border-gray-800 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    //   style={{ backgroundColor: 'white', borderColor: '#F6F6F6' }}
    // >
    //   <img
    //     className="p-8 rounded-t-lg"
    //     src="https://drive.google.com/uc?export=view&id=1oJgY3Fjd28ihFUWBowB6n1tdXfEfumDn"
    //     alt="Product"
    //   />

    // </div>
  );
};

export default ProductCard;
