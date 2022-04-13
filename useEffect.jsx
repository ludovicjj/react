// useEffect
// Équivalent à componentDidMount, componentDidUpdate, componentWillUnmount dans les components sous forme de class.
function ComposantA () {
    const [state, setState] = React.useState(0);

    const handleClick = function () {
        setState(state => state + 1);
    }

    // Le premier paramètre un est callback qui sera exécuté lors du montage du composant (componentDidMount)
    // Le second paramètre (optionnel) est un tableau qui permet de définir les dépendances de ce hook (componentDidUpdate)
    //      Si le tableau ne contient aucune dépendance : Dans ce cas-là la fonction passée en premier paramètre ne sera exécuté que lors du montage du composant. (componentDidUpdate => false)
    //      Si le tableau contient une dépendance : Dans ce cas-là la fonction passée en premier paramètre ne sera exécuté que si la dépendance change. (componentDidUpdate => true/false)
    //      Si le second paramètre n'est pas préciser : Dans ce cas-là la fonction passée en premier paramètre sera exécuté systématique. (componentDidUpdate => true)
    // Voir ComposantB pour componentWillUnmount

    // Ici lorsque le composant est monté :
    // 1. modification du titre de la page.
    // 2. A chaque fois que "state" change, le titre de la page sera mis à jour
    React.useEffect(() => {
        document.title = 'count: ' + state;
    }, [state])

    return <button onClick={handleClick}>Valeur : {state}</button>
}

function ComposantB () {
    const [state, setState] = React.useState(0);

    // Ici lorsque le composant est monté :
    // Déclenchement d'un timer pour incrementer de 1 la valeur de "state" toutes les secondes
    // Dans ce cas, Ne pas mettre "state" comme dépendance :
    //      Execution du callback lors du montage du composant qui va incrementer "state"
    //      Le callback modifie la valeur de "state"
    //      "state" est modifier, re-execute le callback qui va créer un nouveau timer qui incrémentera à nouveau "state", etc...
    React.useEffect(() => {
        const timer = window.setInterval(function () {
            setState(state => state + 1)
        }, 1000)

        // retourne un callback de nettoyage équivalent à componentWillUnmount
        return function () {
            window.clearInterval(timer)
        }
    }, [])

    return <button >Valeur : {state}</button>
}

ReactDOM.render(
    <div>
        <ComposantB/>
    </div>,
    document.querySelector('#app')
)

// démonte le composant ComposantB au bout de 2 secondes
window.setTimeout(() => {
    ReactDOM.render(<div>Hello</div>, document.querySelector('#app'))
}, 2000)