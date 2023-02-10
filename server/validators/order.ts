import Joi from "joi";

export const order = Joi.object({
  address_id: Joi.number(),
  notes: Joi.string().allow("").optional(),
  status: Joi.string().optional(),
  products: Joi.array()
    .items(
      Joi.object({
        id: Joi.number(),
        variant_id: Joi.number().optional(),
        quantity: Joi.number(),
      })
    )
    .optional(),
});
