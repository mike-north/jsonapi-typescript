# JSONAPI.ts <img src="https://travis-ci.org/mike-north/jsonapi.ts.svg?branch=master" align='right'>
TypeScript type information for compile-time validation of the [JSONAPI document specification](http://jsonapi.org/format/).

## How to use this

1. Install this package
```js
npm install --save-dev jsonapi.ts
```

2. Import the types into the files where you wish to use them
```ts
import 'jsonapi.ts';
```
> **NOTE:** You can add the types across your whole project by opening your `./global.d.ts` ambient type file (or create an empty file if it doesn't yet exist) and adding the same import

3. check to see if JSONAPI types are validated correctly

```ts
import 'jsonapi.ts';

// ✅ This should be OK
let doc: JSONAPI.Document = {
  data: {
    type: 'articles',
    id: '1'
  }
};

// ⛔️ This should NOT be OK ( data, errors or meta property is required )
let doc: JSONAPI.Document = {
  jsonapi: { version: '1.0' }
};
```

## Copyright
&copy; 2017 [Mike North](https://github.com/mike-north), All Rights Reserved.
