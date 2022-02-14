const scaleNames = {
    'c': 'Celsius',
    'f': 'Fahrenheit'
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}


class BoilingVerdict extends React.Component {

    render() {
        if(this.props.celsius === '') {
            return null;
        }

        if(!this.isNumber(this.props.celsius)) {
            return <div className={"alert alert-danger"}>Température invalide</div>
        }

        if (this.props.celsius >=100) {
            return <div className={"alert alert-success"}>L'eau bout (temperature actuelle : {this.props.celsius}) </div>
        }

        return <div className={"alert alert-info"}>L'eau ne bout pas (temperature actuelle : {this.props.celsius})</div>
    }

    isNumber(number) {
        return !isNaN(parseFloat(number)) && !isNaN(number - 0)
    }
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const scaleName = scaleNames[this.props.scale]
        const name = "scale" + this.props.scale

        return <div className={"mb-3"}>
            <label htmlFor={name}>Temperature (en {scaleName})</label>
            <input type={"text"} id={name} className="form-control" value={this.props.temperature} onChange={this.props.onChange}/>
        </div>
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            temperature : 20,
            scale: 'scalec'
        }
    }

    handleChange(e) {
        this.setState({
            temperature: e.target.value,
            scale: e.target.id
        })
    }

    render () {
        const {temperature} = this.state
        let celsius;
        let fahrenheit;


        if (this.state.scale === "scalec") {
            celsius = temperature
            fahrenheit = toFahrenheit(celsius)
        } else {
            fahrenheit = temperature
            celsius = toCelsius(fahrenheit)
        }

        return <div className={"container mt-3"}>
            <TemperatureInput scale={"c"} temperature={celsius} onChange={this.handleChange}/>
            <TemperatureInput scale={"f"} temperature={fahrenheit} onChange={this.handleChange}/>
            <BoilingVerdict celsius={celsius}/>
        </div>
    }
}
ReactDOM.render(<Calculator/>, document.querySelector('#app'));