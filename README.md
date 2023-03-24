
# overview

About Universal Ad Engine

The purpose of this project is to achieve easy debugging and secure ad rendering.


## About flow

```mermaid
flowchart TD
  START --> A{Initialization of settings}
  A --> B{Importing a Template}
  B --> C{API request}
  C --> D{Get the HTML of the Template}
  D --> F{sanitize still}
  F --> G{Apply to DOM}
```

[About Templates](docs/template.md)

## TODO

- Add a docks
- Compatible with cdn
- Compatible with modules
- Publish to npm
- Add a test
- Support for sanitize
- Support for Google Ad Manager
- Publish the demo
- Copyright policy

