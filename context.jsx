
// Le Contexte nous permet de transmettre une prop profondément dans l’arbre des
// composants sans la faire passer explicitement à travers tous les composants.
// Crée un contexte avec un objet vide comme valeur par défaut.
const formContext = React.createContext({});

function App() {

    const handleSubmit = React.useCallback(function (value) {
        console.log(value);
    }, []);

    return <div className="container">
        <FormWithContext defaultValue={{firstName: "John", lastName: "Doe"}} onSubmit={handleSubmit}>
            <FormField name="firstName">Prénom</FormField>
            <FormField name="lastName">Nom</FormField>
            <PrimaryButton>Envoyer</PrimaryButton>
        </FormWithContext>
    </div>
}

// Utilise un Provider pour passer le thème plus bas dans l’arbre.
// N’importe quel composant peut le lire, quelle que soit sa profondeur.
// Dans cet exemple, je passe un object avec :
// 1- les propriétés contenues dans l'état (destructuration)
// 2- handleChange : le callback pour le pour la modification des champs.
function FormWithContext ({defaultValue, onSubmit, children}) {
    // state
    const [state, setState] = React.useState(defaultValue);

    // Modifier state
    // attention : si on utilise e.target dans setState(), il faut utiliser e.persist() avant le setState() (react v16 and antérieur)
    // ref: https://stackoverflow.com/questions/49500255/warning-this-synthetic-event-is-reused-for-performance-reasons-happening-with#answer-64420103
    // ref: https://reactjs.org/docs/legacy-event-pooling.html
    const handleChange = React.useCallback(function (name, value) {
        setState((state) => {
            return {
                ...state,
                [name]: value
            }
        })
    })

    // Context
    const value = React.useMemo(function () {
        return {
            ...state,
            handleChange
        }
    }, [state, handleChange]);

    const handleSubmit = React.useCallback(function(e) {
        e.preventDefault();
        onSubmit(value)
    }, [value]);

    return <form onSubmit={handleSubmit}>
        <formContext.Provider value={value}>
            {children}
        </formContext.Provider>
    </form>
}
function FormField({name, children}) {
    const context = React.useContext(formContext);
    const handleChange = React.useCallback(function (e) {
        context.handleChange(e.target.name, e.target.value)
    }, [context.handleChange]);

    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" className="form-control" name={name} id={name} value={context[name]} onChange={handleChange}/>
    </div>
}

function PrimaryButton({children}) {
    return <button type="submit" className="btn btn-primary mt-2">{children}</button>
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
)