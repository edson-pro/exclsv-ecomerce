import Joi from "joi";

export const variant = Joi.object({
  price: Joi.number(),
  image: Joi.string().allow(""),
  stock: Joi.number(),
  options: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      value: Joi.string(),
    })
  ),
});
