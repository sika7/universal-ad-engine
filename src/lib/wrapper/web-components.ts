import { ObjectValidator } from "@sika7/validator/lib/objectValidator";
import { Parameter } from "../api";
import { applyDom, setEvent } from "../front/dom";
import { IUniversalAdApi } from "../template/manager";
import { UniversalAdCore } from "../core";

interface IWebComponentWrapper {
  id: string;
  api: IUniversalAdApi | undefined;
  render(): void;
}

let core: UniversalAdCore | undefined;

let api: IUniversalAdApi | undefined;

let parameter: Parameter = {};

export class WebComponentWrapper
  extends HTMLElement
  implements IWebComponentWrapper
{
  id: string;
  api: IUniversalAdApi | undefined;
  shadow: ShadowRoot;
  validator: ObjectValidator;

  constructor(
    id: string,
    core: UniversalAdCore,
    apiData: IUniversalAdApi,
    parameterData: Parameter = {},
    validator: ObjectValidator
  ) {
    super();
    this.id = id;
    core = core;
    api = apiData;
    parameter = parameterData;
    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    applyDom(this.id, this);

    this.validator = validator;

    Object.freeze(this);
  }

  connectedCallback() {
    this.setAttribute("id", `ua-${this.id}`);
  }
  renderedCallback() {}

  pull() {
    if (core && api) {
      core.pull(api.url, api.type, parameter);
    }
  }

  hide(second: number = 30) {
    this.style.display = "none";
    const limit = 180;
    if (second > limit) throw new Error("The duration to hide is too long.");
    setTimeout(() => {
      this.style.display = "block";
    }, 1000 * second);
  }

  render() {
    if (!core) return;
    this.shadow.innerHTML = core.generate();
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, "c", "click", (atter: string) => {
      if (!core) return;
      core.executeMethod(atter);
      this.render();
    });
  }
}
