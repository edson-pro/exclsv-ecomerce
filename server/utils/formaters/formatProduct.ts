import formatBrand from "./formatBrand";
import formatCategory from "./formatCategory";
import formatProductDiscount from "./formatProductDiscount";
import dotenv from "dotenv";

dotenv.config();

const formatOptions = (data) => {
  const dds = [];
  data.forEach((e) => {
    e.options
      .map((e) => e.name)
      .map((e) => {
        if (!dds.find((i) => i === e)) {
          dds.push(e);
        }
      });
  });

  const options = dds.map((p) => {
    return {
      name: p,
      values: Array.from(
        new Set(
          data.map((e) => {
            return e.options.map((e) => e).find((e) => e.name === p).value;
          })
        )
      ),
    };
  });

  return options;
};

const getAmount = ({ discount, price }) => {
  if (discount.type === "percentage") {
    return price - (price * discount.value) / 100;
  } else if (discount.type === "fixed") {
    return price - discount.value;
  } else {
    return 0;
  }
};

export const formatVariant = (e) => {
  return {
    id: e.id,
    image: e.image,
    name: e.name,
    price: e.price,
    discountedPrice: e.discount
      ? getAmount({ discount: e.discount, price: e.price })
      : undefined,
    options: e.options
      ? e.options?.map((e) => {
          return {
            name: e.name,
            value: e.value,
          };
        })
      : null,
  };
};

const formatProduct = (e) => {
  return {
    id: e.id,
    images: e.images,
    price: e.price,
    free_shipping: e.free_shipping,
    availability: e.inventory
      ? e.inventory.stock <= e.inventory.low_stock
        ? "out-stock"
        : "in-stock"
      : undefined,
    stock: e.inventory
      ? {
          low_stock: e.inventory.low_stock,
          stock: e.inventory.stock,
        }
      : undefined,
    name: e.name,
    condition: e.condition,
    createdAt: e.createdAt,
    content: e.content,
    metadata: JSON.parse(e.metadata),
    brand: e.brand ? formatBrand(e.brand) : undefined,
    currency: e.currency,
    manufacturer: e.manufacturer,
    description: e.description,
    status: e.status,
    initial_price: e.initial_price,
    tags: e.tags,
    discountedPrice: e.discount
      ? getAmount({ discount: e.discount, price: e.price })
      : undefined,
    discount: e.discount ? formatProductDiscount(e.discount) : undefined,
    variants: e.variants
      ? e.variants.map((i) => formatVariant({ ...i, discount: e.discount }))
      : undefined,
    options: e.variants ? formatOptions(e.variants) : undefined,
    counts: e._count
      ? {
          reviews: e?._count?.reviews,
          orders: e?._count?.orders,
        }
      : undefined,
    categories: e.categories
      ? e.categories.map(({ category }) => {
          return {
            name: category.name,
            id: category.id,
          };
        })
      : undefined,
    reviews: e.reviews,
  };
};

export default formatProduct;
