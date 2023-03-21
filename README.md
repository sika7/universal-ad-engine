
# 概要

「universal-ad-engine」について

やりたいこと

```mermaid
flowchart TD
  START --> A{設定の初期化}
  A --> B{テンプレートのインポート}
  B --> C{データの取得}
  C --> D{テンプレのhmtl化}
  D --> F{hmtlの無毒化 まだ}
  F --> G{DOMに適応}
```

