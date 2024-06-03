import { formatInTimeZone } from 'date-fns-tz';
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

export const formatDate = (dateString: Date) => {
  const timeZone = 'America/Mexico_City';
  const date = new Date(dateString);
  return formatInTimeZone(date, timeZone, 'dd/MM/yyyy HH:mm');
};
