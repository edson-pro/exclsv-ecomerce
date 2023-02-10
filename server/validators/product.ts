import Joi from "joi";

export const product = Joi.object({
  images: Joi.array(),
  price: Joi.number(),
  free_shipping: Joi.boolean(),
  name: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  initial_price: Joi.number(),
  content: Joi.string(),
  stock: Joi.number(),
  low_stock: Joi.number(),
  metadata: Joi.array().items(
    Joi.object({
      key: Joi.string(),
      value: Joi.string(),
    })
  ),
  variants: Joi.array().items(
    Joi.object({
      price: Joi.number(),
      image: Joi.string().allow(""),
      stock: Joi.number(),
      low_stock: Joi.number(),
      options: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          value: Joi.string(),
        })
      ),
    })
  ),
  brand: Joi.string().optional().allow(""),
  currency: Joi.string(),
  manufacturer: Joi.string().optional().allow(""),
  tags: Joi.array(),
  categories: Joi.array().min(1).required(),
});

//
