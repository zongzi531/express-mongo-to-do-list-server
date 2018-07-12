# express-mongo-to-do-list-server


## Has problems in building

**1. Warning message with ESLint**

```bash
[ESLINT_LEGACY_OBJECT_REST_SPREAD] DeprecationWarning: The 'parserOptions.ecmaFeatures.experimentalObjectRestSpread' option is deprecated. Use 'parserOptions.ecmaVersion' instead. (found in "standard")
```

You can try this script fix this problem.

```bash
npm install eslint-config-standard@next --save-dev
```

[standard/eslint-config-standard issues #114](https://github.com/standard/eslint-config-standard/issues/114)

**2. DeprecationWarning: useNewUrlParser: true**

```bash
DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
```

You can try this code fix this problem.

```javascript
const mongoose = require('mongoose')

const opts = { useNewUrlParser: true }

mongoose.connect('mongodb://localhost:27017/database', opts)
```

[Automattic/mongoose issues #6667](https://github.com/Automattic/mongoose/issues/6667)

**3. MongoDB Shell in Mac**

```bash
brew services start mongodb

brew services stop mongodb

brew services restart mongodb
```

**4. HTTP request logger middleware for node.js**

[expressjs/morgan](https://github.com/expressjs/morgan)

**5. About some key information encryption**

You can use DES, AES, RSA, Base64, MD5, SHA1, etc...
