## ng-tooltip

### Overview

#### ng-tooltip is a versatile and customizable tooltip library designed for Angular and Ionic/Angular applications.

##

### Features

- **Dynamic positioning**: Automatically adjusts when overflowing screen boundaries.
- **Customizable styles**: Modify tooltip styles using CSS variables or custom classes.
- **Seamless integration**: Easily integrates with Angular and Ionic frameworks.

##

### Installation

**To install the library, run the following command:**

```bash
npm install @duyvu-fsdev/ng-tooltip
```

#### _If you encounter a dependency conflict with the required version of @angular/common, you can resolve it by:_

##### _using the --legacy-peer-deps flag:_

```bash
npm install @duyvu-fsdev/ng-tooltip --legacy-peer-deps
```

##

### Usage

**1. Import the module**

##### Add TooltipModule to your module:

```typescript
/* *.module.ts */

import { TooltipModule } from '@duyvu-fsdev/ng-tooltip';

@NgModule({
  imports: [..., TooltipModule],
})

export class YourModule {}
```

**2. Add the tooltip to your template**

##### Template Example:

```html
/* *.html */

<ng-tooltip [option]="tooltipOption">
  <host-element><!-- content --></host-element>
</ng-tooltip>
```

##### TypeScript Example:

```typescript
// *.ts

import { Option } from '@duyvu-fsdev/ng-tooltip';
...

export class YourComponent {
 ...
 tooltipOption: Option = {
  position: 'bottom',
  text: 'Hello, this is a tooltip!',
  class: 'custom-tooltip'
 };
}
```

##### Option Interface

| Property   | Type                                                 |  Default   | Description                                  | Example                  |
| ---------- | ---------------------------------------------------- | :--------: | -------------------------------------------- | ------------------------ |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'\| undefined` | `'bottom'` | Position of the tooltip relative to the host | `'bottom'`               |
| `text`     | `string`                                             |    `''`    | Tooltip text content                         | `'Tooltip text content'` |
| `class`    | `string`                                             |    `''`    | CSS class for custom styling                 | `'custom-tooltip'`       |

##

### CSS Configuration

**1. Import default styles** **[_important_]**

##### Add it to angular.json:

```typescript
/* angular.json */

"styles": [
 ...
 "node_modules/@duyvu-fsdev/ng-tooltip/styles/ng-tooltip.scss"
]
```

##### or import it into your global SCSS file

```scss
/* global.scss */

@import "@duyvu-fsdev/ng-tooltip/styles/ng-tooltip.scss";
```

**2. Customize using CSS variables**

##### Modify variables directly in global.scss to change the tooltip's appearance globally

```scss
/* global.scss */

ng-tooltip {
  --tooltip-background: #fff;
  --tooltip-color: #000;
  --tooltip-border-radius: 4px;
  --tooltip-padding: 8px;
  --tooltip-width: auto;
  --tooltip-height: auto;
}
```

##### You can also apply custom styles using a specific class

```typescript
tooltipOption: Option = {
 ...
 class: 'custom-tooltip'
};
```

```scss
/* global.scss */

.custom-tooltip {
  background: #f00;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
}
```

##

**Demo on stackblitz**

[![Demo](https://github.com/user-attachments/assets/ad4a39e7-c062-43ef-b76f-55242a809f82)](https://stackblitz.com/~/github.com/duyvu-fsdev/ng-tooltip-demo)

##

#### License

[MIT](https://choosealicense.com/licenses/mit/)

##

### Author

##### Developed and maintained by [duyvu-fsdev](https://github.com/duyvu-fsdev)
