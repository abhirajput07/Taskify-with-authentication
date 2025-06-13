import Joi from "joi";

export const createTodoValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(500).allow("", null),
  });

  return schema.validate(data);
};

export const updateTodoValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50),
    description: Joi.string().max(200).allow("", null),
    isCompleted: Joi.boolean(),
  });

  return schema.validate(data);
};
