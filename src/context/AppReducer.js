export default (state, action) => {
    switch(action.type){
        case "SAVE_TOKEN":
            return{
                ...state,
                token: action.payload.token,
                ownerId: action.payload.id
            }
        case "SET_ACCOUNT":
            return{
                ...state,
                account: action.payload
            }
        case "SET_CONTRACT":
            return{
                ...state,
                contract: action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                token: '',
                ownerId: ''
            }
        default:
            return state;
    }
}