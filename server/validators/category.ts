import Joi from "joi";

export const category = Joi.object({
  name: Joi.string(),
  id: Joi.string(),
  description: Joi.string(),
  photo: Joi.string().optional().allow(""),
  parent_id: Joi.string(),
});
