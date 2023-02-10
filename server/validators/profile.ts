import Joi from "joi";

export const profile = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  username: Joi.string().optional(),
  photo: Joi.string().optional(),
  phone: Joi.string().optional(),
  country: Joi.string().optional(),
  birth: Joi.string().optional(),
  gender: Joi.string().optional(),
  address: Joi.string().optional(),
  defaultAddressId: Joi.number().optional(),
});
