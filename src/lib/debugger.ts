export interface UniversalAdDebugger {
  logLevel: string,
}

export class Debugger implements UniversalAdDebugger {
  logLevel = "debug|info|warn|error";

  constructor() {}
}
