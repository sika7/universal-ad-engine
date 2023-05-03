import {
  ObjectValidator,
  isHttps,
  isInteger,
  isNumber,
  isString,
  isUrl,
} from "@sika7/validator";

const v = new ObjectValidator();

v.use(isString());
v.use(isNumber());
v.use(isInteger());
v.use(isUrl());
v.use(isHttps());

export const validator = v;

