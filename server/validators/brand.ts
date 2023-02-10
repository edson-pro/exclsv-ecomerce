import Joi from "joi";

export const brand = Joi.object({
  name: Joi.string(),
  id: Joi.string(),
  description: Joi.string(),
  logo: Joi.string().optional().allow(""),
  categories: Joi.array().min(1),
});
