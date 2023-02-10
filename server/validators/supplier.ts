import Joi from "joi";

export const supplier = Joi.object({
  name: Joi.string(),
  photo: Joi.string().optional().allow(""),
  country: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  address: Joi.string(),
});
