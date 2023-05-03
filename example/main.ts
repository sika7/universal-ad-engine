import { Core } from "../lib/core";
import { validator } from "../lib/validator";
import pluginBnner from "../template/bnner";

const core = new Core({
  validator: (setting, value) => {
    const result = validator.validation(setting, value);
    if (result) return true;
    return false;
  },
  log: ({ message }) => console.log(message),
  debug: ({ message }) => console.log(message),
});

const factory = core.makeFactory(pluginBnner("https://localhost:8000", "get"));

const unit = factory.makeUnit("app");

unit.pull({});
