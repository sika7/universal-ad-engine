
# overview

About Universal Ad Engine

The purpose of this project is to achieve easy debugging and secure ad rendering.


```mermaid
flowchart TD
  START --> A{設定の初期化}
  A --> B{テンプレートのインポート}
  B --> C{データの取得}
  C --> D{テンプレのhmtl化}
  D --> F{hmtlの無毒化 まだ}
  F --> G{DOMに適応}
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

