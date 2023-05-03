import {
  ObjectValidator,
  isHttps,
  isInteger,
  isNumber,
  isString,
  isUrl,
} from "@sika7/validator";
import pluginUniversalAdTemplate from "../template/default";
import { Core } from "../lib/core";

const validator = new ObjectValidator();
validator.use(isString());
validator.use(isNumber());
validator.use(isInteger());
validator.use(isUrl());
validator.use(isHttps());

const core = new Core({
  validator: (setting, value) => {
    const result = validator.validation(setting, value);
    if (result) return true;
    return false;
  },
  log: ({ message }) => console.log(message),
  debug: ({ message }) => console.log(message),
});

const factory = core.makeFactory(
  pluginUniversalAdTemplate("https://localhost:8000", "get")
);

const unit = factory.makeUnit("app");

unit.pull({});
