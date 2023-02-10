import Joi from "joi";

export const address = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  street_1: Joi.string().required(),
  street_2: Joi.string().allow(""),
  city: Joi.string().required(),
  province: Joi.string().required(),
  zip_code: Joi.string().required(),
  phone: Joi.string().required(),
});
