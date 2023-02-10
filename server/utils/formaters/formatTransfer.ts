const formatTransfer = (e) => {
  return {
    id: e.id,
    status: e.status,
    estimated_arrival: e.estimated_arrival,
    tags: e.tags,
    createdAt: e.createdAt,
    recieved: e.recieved,
    rejected: e.rejected,
    quantity: e.products.reduce((a, b) => a + b.quantity, 0),
    products: e.products
      ? e.products.map((e) => {
          if (e.variant) {
            return {
              id: e.variant.id,
              image: e.variant.image,
              options: e.variant.options,
              product: { name: e.variant.product.name },
            };
          } else if (e.product) {
            return {
              name: e.product.name,
              id: e.product.id,
              image: e.product.images[0],
            };
          } else {
            return undefined;
          }
        })
      : undefined,
  };
};

export default formatTransfer;
