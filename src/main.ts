import { isNumber } from "@sika7/validator/lib/plugins/isNumber";
import { UniversalAd } from "./lib/core";
import pluginUniversalAdTemplate from "./template/default";

UniversalAd.validation(isNumber());

UniversalAd.use(pluginUniversalAdTemplate("https://localhost:8000", "get"));
UniversalAd.freezed();
