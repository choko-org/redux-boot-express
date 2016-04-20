import express from 'express'
import {createAction} from 'redux-actions'
import {BOOT} from 'redux-boot'

export const HTTP_REQUEST = 'redux-boot/express/HTTP_REQUEST'
export const HTTP_BOOT = 'redux-boot/express/HTTP_BOOT'
export const HTTP_AFTER_BOOT = 'redux-boot/express/HTTP_AFTER_BOOT'

const initalState = {
  variables: {
    port: process.env.port || 3000
  }
}

export default {
  reducer(state, action) {

    if (action.type === BOOT) {
      return Object.assign({}, state, initalState)
    }

    return state
  },

  middleware({getState, dispatch}) {

    return next => async action => {
      let nextResult = next(action)

      if (action.type == BOOT) {

        // Create webserver.
        let httpServer = express()

        // Dispatch Http server Boot action.
        dispatch(httpBoot(httpServer))

        httpServer.use((request, response, nextHttp) => {

          // Dispatch Http Request Action.
          dispatch(httpRequest({request, response})).then(() => {
            nextHttp()
          })
        })

        // @TODO: Review express server variables names.
        const app = await new Promise((resolve, reject) => {
          const server = httpServer.listen(getState().variables.port, () => {
            resolve(server)
          })
        })

        dispatch(httpAfterBoot(app))
      }

      return nextResult
    }
  }
}

// Http request Action.
export const httpRequest = createAction(HTTP_REQUEST, async ({request, response}) => {
  return {
    request,
    response
  }
})

// Http server bootstrap Action.
export const httpBoot = createAction(HTTP_BOOT, (httpServer) => ({ httpServer }))

// Http after server bootstrap Action.
export const httpAfterBoot = createAction(HTTP_AFTER_BOOT, (httpServer) => ({ httpServer }))
