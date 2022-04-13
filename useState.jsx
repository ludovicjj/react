// Le hook useState permet d'initialiser un état dans des composants sous forme de fonction.
// Ce qui n'était possible que dans les composants sous forme de class.
// Ne pas utiliser useState dans une condition ou une boucle.
// useState retourne un tableau de deux valeurs. Respectivement l'état et le callback pour modifier l'état.

function ComposantA () {
    // Déclare une nouvelle variable d'état, qu'on va appeler "count" et qui est initialisé avec la valeur 0
    const [count, setCount] = React.useState(0);

    const handleClick = function(e) {
        e.preventDefault();
        setCount(10)
    }

    return <button onClick={handleClick}>Valeur : {count}</button>
}

function ComposantB () {
    // Déclare une nouvelle variable d'état, qu'on va appeler "state" qui est un object
    const [state, setState] = React.useState({
        firstname: 'john',
        lastname: 'doe'
    });

    // Contrairement au setState dans les composants sous forme de class,
    // il n'y a pas de fusion des objects.
    // Pour ce faire, il faudra renvoyer un nouvel object qui contiendra l'état precedent
    const handleClick = function(e) {
        e.preventDefault();
        setState((state) => {
            return {...state, age: 42}
        })
    }

    return <button onClick={handleClick}>Valeur : {JSON.stringify(state)}</button>
}

// Un autre exemple sur l'avantage des hooks :
// 1. Création d'un hook personnalisé qui prendra en charge l'incrémentation d'une valeur.
// 2. Ce hook (comme le hook useState de React) retourne un tableau avec Respectivement l'état et le callback modificateur de l'état.
// Ce hook peut être réutilisable dans n'importe quel composant.
function useIncrementer () {
    const [count, setCount] = React.useState(0);
    const increment = function () {
        setCount(count => {
            return count + 1;
        })
    }

    return [count, increment];
}

// Grace a ce hook personnalisé, on peut isoler une partie de la logic en dehors du composant
function ComposantC () {
    const [count, increment] = useIncrementer();

    return <button onClick={increment}>Valeur : {count}</button>
}

ReactDOM.render(
    <div>
        <ComposantA/>
        <ComposantB/>
        <ComposantC/>
    </div>,
    document.querySelector('#app')
)