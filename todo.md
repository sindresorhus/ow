# TODO

- Write it in TypeScript so we get great docs.

- Make it easy to extend and add custom predicates

- Parse out the input string literal when possible to create good error messages:

```js
// Before
ow(obj.foo, ow.string);
// ArgumentError: Expected argument to be of type `string` but received type `null`

// After
ow(obj.foo, ow.string);
// ArgumentError: Expected argument `obj.foo` to be of type `string` but received type `null`
```

- Ability to reuse validations:

```js
const checkUsername = ow.create(ow.string.minLength(4));
checkUsername(username);
```

- At some point would be nice to parse the source on error and show the error pointing to the source. Using https://www.npmjs.com/package/babel-code-frame

- Ability to use custom assertions. Should be very easy to create. We can't bundle it all.


---


Feedback from Sam: https://gist.github.com/SamVerschueren/6e1c7e9f3183dbe1b7d8909c6ff07337
