# Redux Boot Express

[![Build Status](https://travis-ci.org/choko-org/redux-boot-express.svg?branch=master)](https://travis-ci.org/choko-org/redux-boot-express)

Redux Boot module to use [Express](http://expressjs.com/) web server.

## Install
```bash
npm install redux-boot-express --save
```

## Actions constants

```js
import {
  HTTP_REQUEST,
  HTTP_BOOT,
  HTTP_AFTER_BOOT
} from 'redux-boot-express'
```

## Usage

```js
import boot from 'redux-boot'
import webServerModule, {HTTP_REQUEST} from 'redux-boot-express'

const helloModule = {
  middleware({getState, dispatch}) {
    return next => action => {
      let nextResult = next(action)

      if (action.type === HTTP_REQUEST) {
        const {request, response} = action.payload
        response.send('Hello!')
      }

      return nextResult
    }
  }
}

const initialState = {
  variables: {
    port: 3020
  }
}

const modules = [
  webServerModule,
  helloModule
]

const app = boot(initialState, modules)
```

## License

[MIT](LICENSE.md)
