import Joi from "joi";

export const cart = Joi.object({
  product_id: Joi.number(),
  quantity: Joi.number(),
  variant_id: Joi.number().optional(),
});
