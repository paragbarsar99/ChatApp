import { FETCH_ITEM } from '../Actions/AllTheAction'

const initialvalue = {
    data: null
}


export default FetchProductReducer = (state = initialvalue, action) => {

    switch (action.type) {
        case FETCH_ITEM: {
            return {
                data: action.payload
            }
        }
        default:
            return state
    }

}


