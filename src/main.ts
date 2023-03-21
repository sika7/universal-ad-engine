import { Core } from "./lib/core";
import pluginUniversalAdTemplate from "./template/default";

const core = new Core();
core.templates([pluginUniversalAdTemplate]);
core.main();
