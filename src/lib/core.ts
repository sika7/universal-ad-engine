import { importPluginTemplate, ITemplateData } from "./universal-ad-template";
import { WebComponentWrapper } from "./web-components-wrapper";

export class Core {
  private templateData: ITemplateData = {};
  constructor() {}

  templates(templates: importPluginTemplate[]) {
    templates.map((item) => {
      const data = item();
      this.templateData[data.name] = data.template;
    });
  }

  main() {
    customElements.define("universal-ad-unit", WebComponentWrapper);

    const myClass = this.templateData["test"];
    const component = new WebComponentWrapper("#app", myClass());
  }

  request() {}
}
