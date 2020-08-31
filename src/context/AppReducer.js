export default (state, action) => {
    switch(action.type){
        case "SAVE_TOKEN":
            return{
                ...state,
                token: action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                token: ''
            }
        default:
            return state;
    }
}