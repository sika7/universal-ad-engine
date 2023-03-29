import { UniversalAd } from "./lib/core";
import pluginUniversalAdTemplate from "./template/default";

UniversalAd.use(pluginUniversalAdTemplate);
UniversalAd.freezed();

UniversalAd.show({
  id: "app",
  template: "test",
  // api: { url: "https://jsonplaceholder.typicode.com/todos/1", type: "get", data: {} },
});
