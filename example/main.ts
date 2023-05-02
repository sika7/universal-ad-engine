import { common } from "../lib/common";
import { makeUnit, UniversalAd } from "../lib/manager/core";
import pluginUniversalAdTemplate from "../template/default";

const unit = makeUnit({
  id: "app",
  plugin: pluginUniversalAdTemplate("https://localhost:8000", "get"),
  common: common({
    log: ({ message }) => console.log(message),
  }),
});

unit.pull({});

const controller = UniversalAd.make(
  pluginUniversalAdTemplate("https://localhost:8000", "get")
);

controller.attach("app");
