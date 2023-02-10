import formatUser from "./formatUser";

const formatInventory = (e) => {
  const prodImage = e.product ? e.product?.images[0] : undefined;

  const varImage = e?.variant?.product
    ? e.variant.product.images[0]
    : undefined;
  return {
    id: e.id,
    stock: e.stock,
    low_stock: e.low_stock,
    createdAt: e.createdAt,
    item: e.product
      ? {
          name: e.product.name,
          id: e.product.id,
          image: prodImage,
        }
      : e.variant
      ? {
          id: e.variant.id,
          image: e.variant.image ? e.variant.image : varImage,
          name: e.variant.product.name,
          options: e.variant.options,
        }
      : undefined,
  };
};

export default formatInventory;
