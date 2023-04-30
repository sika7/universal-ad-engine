import { UniversalAd } from "../lib/manager/core";
import pluginUniversalAdTemplate from "../template/default";


const template =  UniversalAd.make(pluginUniversalAdTemplate("https://localhost:8000", "get"));

template.attach({
  id: "#app",
  parameter: {},
});
