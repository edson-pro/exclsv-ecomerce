import Joi from "joi";

export const review = Joi.object({
  review: Joi.string(),
  rating: Joi.number(),
});
