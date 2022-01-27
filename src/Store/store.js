import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './Reducers/index'

const middleware = [thunk]

export default store = createStore(
    rootReducers,
    applyMiddleware(...middleware)

)
