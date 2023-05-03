import { ApiSetting, Parameter, apiRequest } from 'api';
import { Common } from 'common';
import { Template, executeMethod, generate } from 'template/main';

export class Core {
  template: Template;
  common: Common;
  apiSetting: ApiSetting;

  constructor(data: { common: Common; template: Template; apiSetting: ApiSetting }) {
    const { common, template, apiSetting } = data;
    this.template = template;
    this.common = common;
    this.apiSetting = apiSetting;
    Object.freeze(this);
  }

  async pull(parameter: Parameter = {}) {
    const { url, type, validation } = this.apiSetting;
    return apiRequest(type, url, parameter)
      .then((value) => {
        const { validator } = this.common;
        if (validator(validation, value as Record<string, unknown>)) throw new Error(`validation error.`);
        return value;
      })
      .then((value: unknown) => {
        this.template.update(value);
      })
      .catch(() => {
        const { log } = this.common;
        log({ message: 'API request failed.', type: 'critical' });
      });
  }

  generate() {
    return generate(this.template);
  }

  executeMethod(atter: string) {
    executeMethod(this.template, atter);
  }
}

// export class DataContainer<T> {
//   data: T;
//
//   constructor(defaultData: T) {
//     this.data = defaultData;
//     return this;
//   }
//
//   merge(data: T): T {
//     return { ...this.data, ...data };
//   }
//
//   newData(data: T): DataContainer<T> {
//     return new DataContainer({ ...this.data, ...data });
//   }
// }
