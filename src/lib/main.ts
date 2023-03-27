import { UniversalAd } from "./core";
import pluginUniversalAdTemplate from "../template/default";

UniversalAd.templates([pluginUniversalAdTemplate]);
UniversalAd.freezed();
UniversalAd.addUnit({ id: "app", template: "test" });
UniversalAd.showUnit("app");