---
id: getting_started
title: Getting Started
---

## Install

To install `lassie-ui`:

run

`yarn add @ederzadravec/lassie-ui`

or

`npm install @ederzadravec/lassie-ui`

Also install the necessary dependencies:

run

`yarn add styled-components react-native-vector-icons react-native-text-input-mask`

or

`yarn install styled-components react-native-vector-icons react-native-text-input-mask`

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
