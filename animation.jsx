function Square({text}) {
    return <div className="square">
        {text}
    </div>
}

function Animation() {
    const [open, setOpen] = React.useState(true);

    const toggle = function () {
        setOpen(open => !open)
    }

    return <div>
        <button onClick={toggle}>Afficher/masquer l'element</button>
        <Fade visible={open} duration={1000}>
            <Square text="un text de test"/>
        </Fade>
        <p>Hello world</p>
    </div>
}

function Fade({visible, children, duration = 1000}) {
    const VISIBLE = 1;
    const HIDDEN = 2;
    const ENTERING = 3;
    const LEAVING = 4;

    // visible = true -> VISIBLE
    // visible = false -> HIDDEN
    const [state, setState] = React.useState(visible ? VISIBLE : HIDDEN)

    // VISIBLE = fade
    // HIDDEN, ENTERING, LEAVING = fade out
    let className = state === VISIBLE ? "fade" : "fade out";

    // Modification de "state" en fonction de visible
    React.useEffect(() => {
        if(!visible) {
            setState(LEAVING);
        } else {
            setState((state) => {
                return state === HIDDEN ? ENTERING : VISIBLE
            })
        }
    },[visible])

    React.useEffect(() => {
        if (state === LEAVING) {
            let timer = setTimeout(() => {
                setState(HIDDEN)
            },duration);
            return function () {
                clearTimeout(timer);
            }
        }

        if (state === ENTERING) {
            document.body.offsetWidth
            setState(VISIBLE)
        }
    }, [state])

    if (state === HIDDEN) {
        return null;
    }

    let style = {
        transitionDuration: `${duration}ms`,
        transitionProperty: 'opacity, transform'
    }
    if (state !== VISIBLE) {
        style.opacity = 0;
        style.transform = 'translateX(10px)';
    }

    return <div style={style}>{children}</div>
}

ReactDOM.render(
    <React.StrictMode><Animation/></React.StrictMode>,
    document.querySelector('#app')
)