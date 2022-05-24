// Utilisation du hook useReducer
// useReducer args:
// reducer => callback qui contient la logique sous forme de switch case.
// initialArg => état local initial.
// init => {optional} callback qui permet d'extraire la logique pour calculer l’état local initial hors du réducteur.

function init(initValue) {
    return {count: initValue};
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            if (state.count <= 0) {
                return state;
            }
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error("Action " + action.type + " unknow")
    }
}

function App ({initialCount}) {
    const [count, dispatch] = React.useReducer(reducer, initialCount, init);
    return <div>
        Compteur : {JSON.stringify(count)}<br/>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</button>
    </div>
}

ReactDOM.render(
    <App initialCount={0} />,
    document.querySelector('#app')
)