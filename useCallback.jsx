// useCallback
// Le hook "useCallback" est un raccourci au hook "useMemo" lorsque l'on doit mémoriser une fonction
// premier argument : le callback à mémoriser
// second argument (optionnel) : un tableau de dépendance
// Si le tableau contient une dépendance et que celle-ci change, le hook "useCallback" se relance
// Si le tableau ne contient aucune dépendance (tableau vide), le hook "useCallback" ne se lancera qu'une seule fois lors du montage du composant
// Si on ne donne pas de tableau, le hook "useCallback" se re-lancera systématiquement lors du re-rendu du composant

// Le hook "useCallback" effectue la même chose que le hook "useMemo" pour mémoriser une fonction
// Mais sa syntaxe est plus simple
// On aura tendance à utiliser "useCallback" pour mémoriser des functions
// Et "useMemo" pour mémoriser des valeurs

function App() {
    const [count, setCount] = React.useState(0);

    // Avec "useMemo"
    // const handleClick = React.useMemo(function () {
    //     return function() {
    //         console.log('Hello world')
    //     }
    // }, [])

    // Avec "useCallback"
    const handleClick = React.useCallback(function() {
        console.log('Hello world')
    }, [])

    const incrementer = function () {
        setCount(count => count + 1)
    }

    return <div>
        <ComposantB onClick={handleClick}/>
        <button onClick={incrementer}>Incrementer : {count}</button>
    </div>
}

const ComposantB = React.memo(function({onClick}) {
    console.log('Composant B render');
    return <button onClick={onClick}>I am pure component</button>
})

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
)