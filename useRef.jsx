// creation d'une ref pour récupérer la valeur d'un champ non controller par REACT
// useRef permet de stocker une valeur et de faire référence à un object dans le DOM

// Exemple 1 :
// Creation d'une ref contenant null
// La ref fait référence à un input (champ non controller par REACT).
// A chaque click sur le bouton je debug la valeur de l'input
function ComposantA () {
    const input = React.useRef(null);

    const handleClick = function () {
        console.log(input.current.value);
    }

    return <div>
        <input type="text" ref={input}/>
        <button onClick={handleClick}>Afficher la valeur</button>
    </div>
}

// Exemple 2 :
// Creation d'une ref pour stocker un object.
// A chaque click, je modifie la valeur dans la référence.
function ComposantB () {
    const compteur = React.useRef({count: 0});

    const handleClick = function () {
        compteur.current.count++;
        console.log(compteur.current.count);
    }

    return <div>
        <button onClick={handleClick}>Cliquer pour incrementer</button>
    </div>
}

// Exemple 3 :
// Faire passer une ref (input) d'un composant parent à un composant enfant.
// Il n'est pas possible de passer la ref au composant enfant via la propriété "ref={}"
// Je stock la ref dans une propriété nommé "inputRef"
// Ensuite même procédure que ci-dessus. Le composant enfant (Compteur) récupère la ref et fait référence à l'input
function ComposantC () {
    const input = React.useRef(null);

    const handleClick = function () {
        console.log(input.current.value)
    }

    return <div>
        <Compteur onClick={handleClick} inputRef={input}/>
    </div>
}

function Compteur ({onClick, inputRef}) {
    return <div>
        <input type="text" ref={inputRef}/>
        <button onClick={onClick}>Recupere la valeur de l'input</button>
    </div>
}

ReactDOM.render(
    <ComposantC/>,
    document.querySelector('#app')
)