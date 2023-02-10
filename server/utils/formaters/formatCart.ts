import formatDiscount, { formatDiscountUsage } from "./formatDiscount";
import { formatVariant } from "./formatProduct";

export const formatCartItem = (e) => {
  const getAmount = ({ discount, price }) => {
    if (discount.type === "percentage") {
      return price - (price * discount.value) / 100;
    } else if (discount.type === "fixed") {
      return price - discount.value;
    } else {
      return 0;
    }
  };
  const getDicountAmount = ({ discount, price }) => {
    if (discount) {
      var d1 = new Date();
      var d2 = new Date(discount.end);
      const isExp = d1.getTime() > d2.getTime();
      if (isExp) {
        return undefined;
      } else {
        return getAmount({
          discount: e.product.discount,
          price: price,
        });
      }
    } else {
      return undefined;
    }
  };
  const images = e.product.images;

  const dAmount = getDicountAmount({
    discount: e.product.discount,
    price: e.product.price,
  });
  return {
    id: e.id,
    product: {
      ...e.product,
      images,
      discountedPrice: dAmount ? dAmount : undefined,
      image: e.variant ? e.variant.image : images[0],
    },
    quantity: e.quantity,
    amount: e.variant
      ? dAmount
        ? dAmount * e.quantity
        : e.variant.price * e.quantity
      : dAmount
      ? dAmount * e.quantity
      : e.product.price * e.quantity,
    variant: e.variant
      ? formatVariant({ ...e.variant, discount: e.product.discount })
      : undefined,
  };
};

const formatCart = (e) => {
  const items = e.products.map((e) => formatCartItem(e));
  console.log(e.discount_usage);
  const discount = e.discount_usage
    ? formatDiscountUsage({
        id: e.discount_usage.id,
        discount: e.discount_usage.discount || e.discount.discount,
        cart: e,
      })
    : undefined;
  const amount = items.reduce((a, b) => a + b.amount, 0);

  return {
    id: e.id,
    items: items,
    quantity: items.reduce((a, b) => a + b.quantity, 0),
    amount: amount,
    discount: !e?.discount_usage?.order_id ? discount : undefined,
    total: amount - Number(discount?.amount || 0),
  };
};

export default formatCart;
