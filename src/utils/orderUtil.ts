// set it to base price, to quant * base price or modified price from drop * quant
export const totalHelper = (quantity: number, price: number, unitId: number, product: Product): number => {
  if (quantity <= 0) {
    return price;
  }
  //   if (unitId === product.unitId && product.priceUnit) {
  if (unitId === product.unitId) {
    return quantity * product.priceUnit;
  }
  return quantity * price;
};
