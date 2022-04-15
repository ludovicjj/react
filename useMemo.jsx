// useMemo:
// premier argument : un callback qui mémorisera une valeur et qui sera exécuté lors du rendu
// second argument (optionnel) : un tableau de dépendance

// Chose à NE PAS FAIRE dans le callback de "useMemo" :
// Par exemple, les effets de bord doivent être effectué par useEffect, et non useMemo.

// Exemple 1 :
// Arrête l'exécution durant quelques secondes
// @Param int duration format millisecondes
function wait(duration) {
    const start = Date.now();
    while(true) {
        if(Date.now() - start > duration) {
            return true;
        }
    }
}

// Simule un encodage...
// Renvoie juste le nombre de millisecondes écoulées depuis le 1er janvier 1970
function encode(number) {
    wait(1000)
    return Date.now()
}

function ComposantA () {
    const [name, setName] = React.useState('John');
    const [number, setNumber] = React.useState(0);

    const handleChange = function(e) {
        if (e.target.getAttribute('name') === 'name') {
            setName(e.target.value)
        }

        if (e.target.getAttribute('name') === 'number') {
            setNumber(e.target.value)
        }
    }

    // EXECUTE et Mémorise la valeur de la fonction "encode" lors du montage du composant
    // tant que "number" ne change pas ne re-execute pas le callback (similaire à "useEffect")
    // Si le tableau de dépendance n'est pas fourni, une nouvelle valeur sera calculée à chaque appel (similaire à componentDidUpdate => true)
    const encoded = React.useMemo(function() {
        return encode(number);
    }, [number])

    return <div className="container">
        <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" name="name" id="name" value={name} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="number">Nombre</label>
            <input type="number" name="number" id="number" value={number} onChange={handleChange}/>
        </div>
        <h2>Valeur encoder</h2>
        <p>{encoded}</p>
    </div>
}

// Exemple 2 : utilisation de "useMemo" pour conserver la référence des callback

// Création d'un composant pure sous forme de fonction
const ComposantB = React.memo(function({onClick}) {
    console.log('Composant B render');
    return <button onClick={onClick}>I am pure component</button>
})

// Bien que le ComposantB soit un composant pur, il sera re-rendu systématiquement dans le cas ci-dessous :
// 1. Lorsqu'on clique sur le bouton "incrementer" cela provoque un changement d'état de "count" appartenant au composant "App".
// 2. Le composant "App" effectue donc un nouveau rendu.
// 3. Lors de ce re-rendu, "App" va recréer la constante "handleClick" qui contiendra une nouvelle fonction.
// 2. Lorsque "ComposantB" reçoit "handleClick" dans ces props, il considère que la fonction est différente
// (Bien que la logic dans la fonction est identique, la fonction n'est plus le même object car la référence a changé)
// 3. Donc le "ComposantB" effectue un nouveau rendu

// Solution :
// Utilisation de "useMemo" sur la fonction passée à "ComposantB"

function App() {
    const [count, setCount] = React.useState(0);

    // bad
    // const handleClick = function () {
    //     console.log('Hello world')
    // }

    // good
    const handleClick = React.useMemo(function () {
        return function() {
            console.log('Hello world')
        }
    }, [])

    const incrementer = function () {
        setCount(count => count + 1)
    }

    return <div>
        <ComposantB onClick={handleClick}/>
        <button onClick={incrementer}>Incrementer : {count}</button>
    </div>
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
)