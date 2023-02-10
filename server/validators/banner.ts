import Joi from "joi";

export const banner = Joi.object({
  title: Joi.string().optional().allow(""),
  tag: Joi.string().optional().allow(""),
  subtitle: Joi.string().optional().allow(""),
  image: Joi.string().required(),
  type: Joi.string().required(),
  action: Joi.string().optional().allow(""),
  link: Joi.string().required(),
});
//
