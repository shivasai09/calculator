const formReducer=(state=[],action)=>{
    switch(action.type) {
        case 'ADD':
        return [...state ,action.history]
        case 'DELETE':
        return [...action.historyData]
        default:
        return state;
    }
}

export default formReducer;