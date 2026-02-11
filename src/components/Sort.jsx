
const sortAct =  {
    newest: (transactions) => {
        return [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date));
    },

    oldest: (transactions) => {
        return [...transactions].sort((a,b) => new Date(a.date) - new Date(b.date));
    },

    expense: (transactions) => {
        return  [...transactions].filter((transaction)=>transaction.type === "expense");
    },

    earnings: (transactions) => {
         return  [...transactions].filter((transaction)=>transaction.type === "earnings");
    }
}



export function handleSort(sortType, transactions){
    const action = sortAct[sortType];
    if(action) return action(transactions);
    return transactions;
}