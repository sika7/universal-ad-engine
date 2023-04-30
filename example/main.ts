import { common } from "../lib/common";
import { makeUnit, UniversalAd } from "../lib/manager/core";
import pluginUniversalAdTemplate from "../template/default";

const plugin = pluginUniversalAdTemplate("https://localhost:8000", "get");

const unit = makeUnit({
  setting: {
    id: "#app",
    parameter: {},
  },
  plugin: plugin,
  common: common({}),
});

console.log("unit", unit);

const controller = UniversalAd.make(
  pluginUniversalAdTemplate("https://localhost:8000", "get")
);

controller.attach({
  id: "#app",
  parameter: {},
});
