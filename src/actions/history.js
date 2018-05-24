export const add=({expression='',value=0,selected=false}={})=>({
    type:'ADD',
    history:{
        expression,
        value,
        selected
    }
})

export const deleteHistory=(historyData)=>({
    type:'DELETE',
    historyData
})