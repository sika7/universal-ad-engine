import { core } from "./core";
import pluginUniversalAdTemplate from "../template/default";

core.templates([pluginUniversalAdTemplate]);
core.addUnit({ id: "app", template: "test" });
core.showUnit("app");
