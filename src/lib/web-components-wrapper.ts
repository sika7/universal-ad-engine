import { applyDom, setEvent } from "./dom";
import {
  executeMethod,
  IUniversalAdTemplate,
  generate,
} from "./universal-ad-template";

interface IWebComponentWrapper {
  id: string;
  template: IUniversalAdTemplate;
  render(): void;
}

export class WebComponentWrapper
  extends HTMLElement
  implements IWebComponentWrapper
{
  id: string;
  template: IUniversalAdTemplate;
  shadow: ShadowRoot;

  constructor(id: string, template: IUniversalAdTemplate) {
    super();
    this.id = id;
    this.template = template;
    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    applyDom(this.id, this);
  }

  connectedCallback() {}
  renderedCallback() {}

  render() {
    this.shadow.innerHTML = generate(this.template);
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, "c", "click", (atter: string) => {
      executeMethod(this.template, atter);
      this.render();
    });
  }
}
