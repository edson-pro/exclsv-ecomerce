import formatAddress from "./formatAddress";
import { formatCartItem } from "./formatCart";
import formatDiscount from "./formatDiscount";
import formatPayment from "./formatPayment";
import formatProduct from "./formatProduct";
import { formatVariant } from "./formatProduct";
import formatUser from "./formatUser";

// export const formatItem = (e) => {
//   const getAmount = ({ discount, price }) => {
//     if (discount.type === "percentage") {
//       return price - (price * discount.value) / 100;
//     } else if (discount.type === "fixed") {
//       return price - discount.value;
//     } else {
//       return 0;
//     }
//   };
//   const getDicountAmount = ({ discount, price }) => {
//     if (discount) {
//       var d1 = new Date();
//       var d2 = new Date(discount.end);
//       const isExp = d1.getTime() > d2.getTime();
//       if (isExp) {
//         return undefined;
//       } else {
//         return getAmount({
//           discount: discount,
//           price: price,
//         });
//       }
//     } else {
//       return undefined;
//     }
//   };
//   const images = e.product.images;

//   const dAmount = getDicountAmount({
//     discount: e.discount,
//     price: e.product.price,
//   });
//   return {
//     id: e.id,
//     product: {
//       ...e.product,
//       images,
//       discountedPrice: dAmount ? dAmount : undefined,
//       image: e.variant ? e.variant.image : images[0],
//     },
//     quantity: e.quantity,
//     amount: e.variant
//       ? dAmount
//         ? dAmount
//         : e.variant.price * e.quantity
//       : dAmount
//       ? dAmount
//       : e.product.price * e.quantity,
//     variant: e.variant
//       ? formatVariant({ ...e.variant, discount: e.product.discount })
//       : undefined,
//   };
// };

const formatDiscountUsage = ({ discount, amount }) => {
  const getAmount = ({ discount, amount }) => {
    if (discount.type === "percentage") {
      return (amount * discount.value) / 100;
    } else if (discount.type === "fixed") {
      return discount.value;
    } else {
      return 0;
    }
  };
  //
  const amnt = getAmount({ discount: discount, amount });
  return {
    amount: amnt,
    id: discount.id,
    discount: formatDiscount(discount),
  };
};

const formatOrder = (e) => {
  const items = e.products.map((e) => formatCartItem(e));
  const amount = items.reduce((a, b) => a + b.amount, 0);
  const discount = e.discount
    ? formatDiscountUsage({
        discount: e?.discount?.discount,
        amount: amount,
      })
    : undefined;
  return {
    id: e.id,
    user: e.user ? formatUser(e.user) : undefined,
    address: e.address ? formatAddress(e.address) : undefined,
    address_id: e.address_id,
    products: e.products ? items : undefined,
    notes: e.notes,
    discount: e.discount ? discount : undefined,
    createdAt: e.createdAt,
    status: e.status,
    payment: e.payment ? formatPayment(e.payment) : undefined,
    quantity: e.products
      ? items.reduce((a, b) => a + b.quantity, 0)
      : undefined,
    subtotal: amount,
    amount: amount - (discount?.amount || 0),
  };
};

export default formatOrder;
