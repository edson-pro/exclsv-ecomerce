import formatCart from "./formatCart";

function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}
export const formatDiscountUsage = (e) => {
  const cart = formatCart(
    clean({
      ...e.cart,
      discount_usage: undefined,
    })
  );
  const getAmount = ({ discount, cart }) => {
    if (discount.type === "percentage") {
      return (cart.amount * discount.value) / 100;
    } else if (discount.type === "fixed") {
      return discount.value;
    } else {
      return 0;
    }
  };
  const amount = getAmount({ discount: e.discount, cart });
  return {
    amount: cart.amount < e.discount.greater_than ? 0 : amount,
    id: e.id,
    discount: formatDiscount(e.discount),
  };
};

const formatDiscount = (e) => {
  return {
    id: e.id,
    code: e.code,
    status: e.status,
    start: e.start,
    end: e.end,
    greater_than: e.greater_than,
    once_usage: e.once_usage,
    type: e.type,
    mode: e.mode,
    value: e.value,
    usages: e?._count?.usages,
  };
};

export default formatDiscount;
