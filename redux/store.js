import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import reducer from './reducer.js'
import rootSaga from './sagas.js'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, thunk]
const enhancers = [applyMiddleware(...middlewares)]

const store = createStore(reducer, applyMiddleware(sagaMiddleware, thunk))
sagaMiddleware.run(rootSaga)

export default store
