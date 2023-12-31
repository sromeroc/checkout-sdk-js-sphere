[@bigcommerce/checkout-sdk](../README.md) / AmazonPayV2CustomerInitializeOptions

# Interface: AmazonPayV2CustomerInitializeOptions

A set of options that are required to initialize the customer step of
checkout in order to support AmazonPayV2.

When AmazonPayV2 is initialized, a sign-in button will be inserted into the
DOM. When the customer clicks on it, they will be redirected to Amazon to
sign in.

```html
<!-- This is where the Amazon Pay button will be inserted -->
<div id="signInButton"></div>
```

```js
service.initializeCustomer({
    methodId: 'amazonpay',
    amazonpay: {
        container: 'signInButton',
        onClick: () => console.log('AmazonPay button clicked'),
    },
});
```

## Table of contents

### Properties

- [container](AmazonPayV2CustomerInitializeOptions.md#container)

### Methods

- [onClick](AmazonPayV2CustomerInitializeOptions.md#onclick)

## Properties

### container

• **container**: `string`

The ID of a container which the sign-in button should insert into.

## Methods

### onClick

▸ `Optional` **onClick**(): `void`

Callback that get called on wallet button click

#### Returns

`void`
