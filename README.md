# Redux Boot Express
Redux Boot module to use [Express](http://expressjs.com/) web server.

## Install
```bash
npm install redux-boot-express --save
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
