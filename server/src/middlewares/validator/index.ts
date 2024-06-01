import { validationResult } from 'express-validator';


export default function validator(rules) {
  return async (req) => {
    await Promise.all(rules.map((rule) => rule.run(req)));

    const result = validationResult(req);
    const errors = result.array();

    throw errors;
  };
}
