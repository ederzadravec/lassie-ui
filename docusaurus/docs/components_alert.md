---
id: components_alert
title: Alert
---

## Import

`import { Alert } from '@ederzadravec/lassie-ui';`

## How to Use

In your entry file, insert following code:

`<Alert.Component />`

This code will allow you to use the `alert` as a function.

To use, just run:

`Alert.open(props)` to show your alert

`Alert.close()` to close your alert

### Props

Alert props

| prop    | type                                            | default   |
| ------- | ----------------------------------------------- | --------- |
| title   | string                                          | ''        |
| message | string                                          | ''        |
| actions | array of objects                                | []        |
| color   | string ['success', 'primary', 'alert', 'error'] | 'success' |

actions props

| prop   | type                                            |
| ------ | ----------------------------------------------- |
| label  | string                                          |
| action | function                                        |
| color  | string ['success', 'primary', 'alert', 'error'] |

by default, the action will close your alert

## Examples

### Alert success

```
  const handleOnSubmit = () => {

    ...

    Alert({
      title: "Yeahh!!",
      message: "Your data has been successfully saved",
      color: "success"
    })
  }
```

### Alert error

```
  const handleOnSubmit = () => {

    ...

    Alert({
      title: "Ops!!",
      message: "have an error in your data, check and try again",
      color: "error"
    })
  }
```

### Alert info

```
  const handleOnSubmit = () => {

    ...

    Alert({
      title: "Ops!!",
      message: "An error occurred while trying to save your data",
      color: "info"
      actions: [
         {
          label: "Close",
          action: () => { ... }
        },
        {
          label: "Try Again",
          action: () => { ... },
          color: "primary"
        }
      ]
    })
  }
```
