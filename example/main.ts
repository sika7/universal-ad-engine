import { UniversalAd } from "../src/lib/manager/core";
import pluginUniversalAdTemplate from "../src/template/default";


const template =  UniversalAd.make(pluginUniversalAdTemplate("https://localhost:8000", "get"));

template.attach({
  id: "#app",
  parameter: {},
});
