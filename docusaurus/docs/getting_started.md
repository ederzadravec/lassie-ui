---
id: getting_started
title: Getting Started
---

## Install

run `yarn add @ederzadravec/lassie-ui` or `npm install @ederzadravec/lassie-ui`

## How to Use

Just import the desired component and use:

`import { ... } from '@ederzadravec/lassie-ui';`

If you want to customize the standard style of the components and colors, insert the following code in the application entry file:

```
...

import { Theme } from '@ederzadravec/lassie-ui';

...

const theme = { ... };

...

<Theme theme={theme}>
  <YourApp />
</Theme>
```

In theme variable, you must pass what you want to override the default theme
