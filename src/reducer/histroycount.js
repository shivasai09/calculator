const historyCounterReducer=(state=-1,action)=>{
    switch(action.type) {
        case 'ADD_HISTORY_COUNT':
        return state+1
        case 'SUBTRACT_HISTORY_COUNT':
        return state-1
        default:
        return state;
    }
}

export default historyCounterReducer