// Creation d'une reference
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.input = React.createRef();
    }

    handleClick(e) {
        console.log(this.input.current.value);
    }

    render() {
        console.log(this.input);
        return <div>
            <input type="text" ref={this.input}/>
            <button onClick={this.handleClick}>Valider</button>
        </div>
    }
}

// Faire descendre la reference d'un composant parent a un enfant
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.input1 = React.createRef();
        this.input2 = React.createRef();
    }

    handleClick(e) {
        console.log(this.input1.current.value);
        console.log(this.input2.current.value);
    }

    render() {
        console.log(this.input);
        return <div className="container">
            <Field ref={this.input1}/>
            <Field2WithRef ref={this.input2}/>
            <button onClick={this.handleClick} className="btn btn-primary">Valider</button>
        </div>
    }
}
// Lorsque le composant qui reçoit la ref est une fonction :
const Field = React.forwardRef(function (props, ref) {
    return <div className="mb-3">
        <label htmlFor="nom" className="form-label">Nom</label>
        <input type="text" id="nom" name="nom" className="form-control" ref={ref}/>
    </div>
});
// Lorsque le composant qui reçoit la ref est une class :
// 1. creation du composant (Field2)
// 2. creation d'un composant de niveau supérieur (Field2WithRef) qui viendra décorer le composant de niveau inférieur (Field2)
// 3. utilisation du composant de niveau supérieur dans le composant parent
class Field2 extends React.Component {
    render () {
        return <div className="mb-3">
            <label htmlFor="prenom" className="form-label">Prenom</label>
            <input type="text" id="prenom" name="prenom" className="form-control" ref={this.props.forwardRef}/>
        </div>
    }
}
const Field2WithRef = React.forwardRef(function (props, ref) {
    return <Field2 forwardRef={ref} />
});

ReactDOM.render(<Main/>, document.querySelector('#app'))