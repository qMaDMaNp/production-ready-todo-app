import { validationResult } from 'express-validator';


export const validator = (rules) => {
  return async (req) => {
    await Promise.all(rules.map((rule) => rule.run(req)));

    const result = validationResult(req);
    const errors = result.array();

    throw errors;
  };
}

export default validator;
