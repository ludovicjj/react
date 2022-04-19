// useEffect
// Le code dans le "useEffect" est asynchrone :
// (Le code à l'intérieur du hook ne sera pas exécuté avant que le rendu de nos changements soit fait)
// Si on a des opérations lourdes dans le "useEffect", cela n'affectera pas le temps de rendu
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
    // 2. À chaque fois que "state" change, le titre de la page sera mis à jour
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

// Comportement du "useEffect" avec et sans dépendance :
// 1. Si aucune dépendance n'est fourni :
// le "useEffect" se lance lors du montage du composant.
// À chaque modification de l'état le "useEffect" se relance (equivalent a un componentDidUpdate => true)

// 2. Si un tableau vide de dépendance est fourni :
// le "useEffect" se lance lors du montage du composant.
// À chaque modification de l'état le "useEffect" NE SE RELANCE PAS (equivalent a un componentDidUpdate => false)

// 3. Si un tableau de dépendance est fourni et contient "state" (dans ce cas):
// le "useEffect" se lance lors du montage du composant.
// À chaque fois que "state" change de valeur (dans ce cas lors d'un click) le "useEffect" se relance
function ComposantC () {
    const [state, setState] = React.useState(0);

    const handleChange = function() {
        setState(state => state + 1);
    }

    React.useEffect(() => {
        console.log('component mount')
    })
    return <button onClick={handleChange}>Valeur : {state}</button>
}

ReactDOM.render(
    <div>
        <ComposantC/>
    </div>,
    document.querySelector('#app')
)