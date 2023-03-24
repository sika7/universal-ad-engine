# About Templates

Templates are created with classes.

Please implement `IUniversalAdTemplate` in this class.

## Syntax

The style method is optional.

Please write CSS. The style tag is not necessary.
Currently, SCSS is not supported.
Please use compiled CSS.

```TS
class Example implements IUniversalAdTemplate {

  // option style method
  style(): string {
    return `
    p {}
    `;
  }

  // required render method
  render() {}
    return `
<div>
  <a href="https://github.com/sika7/universal-ad-engine" target="_blank">
    <img src="https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A" alt="test imgage" />
  </a>
</div>
    `;
  }
```

## Variable substitution

Enclose with {{}} parentheses and the class member variables will be automatically replaced.

Methods can also be executed.

Within a method, you can access class member variables using `this`.

```TS
class Example implements IUniversalAdTemplate {

  url = "https://github.com/sika7/universal-ad-engine";
  imgUrl = "https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A";

  imgSrc() {
    return this.imgUrl;
  }

  // required render method
  render() {}
    return `
<div>
  <a href="{{ url }}" target="_blank">
    <img src="{{ imgSrc() }}" alt="test image" />
  </a>
</div>
    `;
  }
```

## Click event

You can set a click event in the render function.

Specify a method inside the class.

```TS
class Example implements IUniversalAdTemplate {

  link() {
    location.href = this.url;
  }

  url = "https://github.com/sika7/universal-ad-engine";
  imgSrc = "https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A";

  // required render method
  render() {}
    return `
<div>
  <a [click]="link()">
    <img src="{{ imgSrc() }}" alt="test image" />
  </a>
</div>
    `;
  }
```


