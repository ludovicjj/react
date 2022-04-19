// "useLayoutEffect" :
// Le hook useLayoutEffect est très semblable au hook useEffect, cependant il a quelques differences :

// Le code dans le "useEffect" est asynchrone :
// (Le code à l'intérieur du hook ne sera pas exécuté avant que le rendu de nos changements soit fait)
// Si on a des opérations lourdes dans le "useEffect", cela n'affectera pas le temps de rendu

// Le code dans le "useLayoutEffect" est synchrone :
// Si on a des opérations lourdes dans le "useLayoutEffect", cela ralentira le temps de rendu.
// Un des AVANTAGES du hook "useLayoutEffect" est qu'il PERMET DE MODIFIER le DOM AVANT le rendu

// Exemple :
// Utilisation de "useLayoutEffect" pour modifier la couleur du text du bouton
// Si "count" est pair, le text est en rouge
// Si "count" est impair, le text est en vert
function ComponentA () {
    const [count, setCount] = React.useState(0);
    const color = React.useRef(null);

    const increment = React.useCallback(() => {
        setCount(count => count + 1)
    }, []);

    React.useLayoutEffect(() => {
        if (count % 2 === 0) {
            color.current.style.color = 'red'
        } else {
            color.current.style.color = 'green'
        }

    }, [count])

    return <div>
        <button onClick={increment} ref={color}>Valur : {count}</button>
    </div>
}

function wait(duration) {
    const start = Date.now();
    while(true) {
        if (Date.now() - start > duration) {
            return true;
        }
    }
}

ReactDOM.render(
    <ComponentA/>,
    document.querySelector('#app')
)