interface IValidatePlugin {
  name: string;
  errorMessage: string;
  validation: (target: any) => boolean;
}

function isNumber(): IValidatePlugin {
  return {
    name: "",
    errorMessage: "",
    validation: () => false,
  };
}

interface ValidateResult {
  result: boolean;
  validateName: string;
  errorMessage: string;
  value: any;
}

class Validate {
  config: IValidatePlugin;
  constructor(config: IValidatePlugin) {
    this.config = config;
  }

  check(target: any): boolean {
    if (this.config.validation(target)) return true;
    return false;
  }

  result(target: any): ValidateResult {
    return {
      result: this.check(target),
      validateName: this.config.name,
      errorMessage: this.config.errorMessage,
      value: target,
    };
  }
}

interface ErrorValidate {
  value: any;
  validates: string[];
  message: string[];
}

class Validator {
  validates: Validate[] = [];
  result: ValidateResult[] = [];
  target: any;

  constructor(validates: Validate[]) {
    this.validates = validates;
  }

  checkAll(target: any) {
    for (const validate of this.validates) {
      this.result.push(validate.result(target));
    }
    return this.result.find((data) => data.result === true);
  }

  getErrorMessage(): ErrorValidate {
    const message: string[] = [];
    const validates: string[] = [];
    this.result.map((data) => {
      if (data.result === true) {
        message.push(data.errorMessage);
        validates.push(data.validateName);
      }
    });
    return {
      value: this.target,
      validates: validates,
      message: message,
    };
  }

  validation(target: any) {
    this.target = target;
    const result = this.checkAll(target);
    if (result) return true;
    return false;
  }
}

export function validation(validatePlugins: IValidatePlugin[]): Validator {
  const validates: Validate[] = [];
  for (const plugin of validatePlugins) {
    validates.push(new Validate(plugin));
  }
  return new Validator(validates);
}
