import { UniversalAd } from "../src/lib/core";
import pluginUniversalAdTemplate from "../src/template/default";

UniversalAd.use(pluginUniversalAdTemplate("https://localhost:8000", "get"));
UniversalAd.freezed();

UniversalAd.show({
  id: "#app",
  template: "test",
  parameter: {},
});
