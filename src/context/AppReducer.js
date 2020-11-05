export default (state, action) => {
    switch(action.type){
        case "SAVE_TOKEN":
            return{
                ...state,
                token: action.payload.token,
                ownerId: action.payload.id
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