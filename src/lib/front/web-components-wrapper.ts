import { ObjectValidator } from "@sika7/validator/lib/objectValidator";
import { apiRequest, Parameter } from "../api";
import { applyDom, setEvent } from "./dom";
import { IUniversalAdApi } from "../template-manager";
import {
  executeMethod,
  IUniversalAdTemplate,
  generate,
} from "../universal-ad-template";

interface IWebComponentWrapper {
  id: string;
  api: IUniversalAdApi | undefined;
  render(): void;
}

let template: IUniversalAdTemplate | undefined;

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
    templateInstance: IUniversalAdTemplate,
    apiData: IUniversalAdApi,
    parameterData: Parameter = {},
    validator: ObjectValidator
  ) {
    super();
    this.id = id;
    template = templateInstance;
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
    if (!api) return;
    apiRequest(api.type, api.url, parameter)
      .then((value: any) => {
        if (api?.validation) {
          const result = this.validator.validation(api?.validation, value);
          if (result)
            throw new Error(`validation error.${result.errorMessage}`);
        }
        return value;
      })
      .then((value: any) => {
        if (!template) {
          throw new Error("template not found.");
        }
        template.update(value);
        this.render();
      })
      .catch(() => {
        // throw new Error("API request failed.");
      });
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
    if (!template) return;
    this.shadow.innerHTML = generate(template);
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, "c", "click", (atter: string) => {
      if (!template) return;
      executeMethod(template, atter);
      this.render();
    });
  }
}
