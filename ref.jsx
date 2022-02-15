class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.input = React.createRef();
    }
    handleClick() {
        console.log(this.input.current.value);
    }

    render() {
        console.log(this.input)
        return <div className={"container mt-4"}>
            <Field ref={this.input}/>
            <button onClick={this.handleClick}>Valider</button>
        </div>
    }
}

const Field = React.forwardRef((props, ref) => {
    return <div className={"form-group"}>
        <input type={"text"} ref={ref} className={"form-control"}/>
    </div>
})

ReactDOM.render(<App/>, document.querySelector('#app'))