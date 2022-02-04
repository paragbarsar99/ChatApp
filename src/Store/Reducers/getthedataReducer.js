import {FETCH_ITEM, USER_LIST} from '../Actions/AllTheAction';

const initialvalue = {
  data: {name: ''},
  isLoading: true,
};
const UserListInit = {
  data: [],
  isLoading: true,
};

export const FetchAllUsersDataReducer = (state = initialvalue, action) => {
  switch (action.type) {
    case FETCH_ITEM: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
export const UserListReducer = (state = UserListInit, action) => {
  switch (action.type) {
    case USER_LIST: {
      return{
         ...state,
         data:action.payload,
         isLoading:false
      }  
    }
    default:
      return state;
  }
};
