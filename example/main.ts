import { isHttps } from "@sika7/validator/lib/plugins/isHttps";
import { isInteger } from "@sika7/validator/lib/plugins/isInteger";
import { isNumber } from "@sika7/validator/lib/plugins/isNumber";
import { isString } from "@sika7/validator/lib/plugins/isString";
import { isUrl } from "@sika7/validator/lib/plugins/isUrl";
import { UniversalAd } from "../src/lib/core";
import pluginUniversalAdTemplate from "../src/template/default";

UniversalAd.validation(isNumber());
UniversalAd.validation(isString());
UniversalAd.validation(isHttps());
UniversalAd.validation(isUrl());
UniversalAd.validation(isInteger());

UniversalAd.use(pluginUniversalAdTemplate("https://localhost:8000", "get"));
UniversalAd.freezed();

UniversalAd.show({
  id: "#app",
  template: "test",
  parameter: {},
});
