const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchProduct: '',
            stockOnly: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const key = e.target.id;
        let value = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
        this.setState({
            [key]: value
        })
    }

    render() {
        const products = this.props.products;

        return <div className={"container mt-4"}>
            <h3 className="mb-3">Filtrer des produits</h3>
            <SearchBar
                searchProduct={this.state.searchProduct}
                stockOnly={this.state.stockOnly}
                onChange={this.handleChange}
            />
            <ProductTable
                searchProduct={this.state.searchProduct}
                stockOnly={this.state.stockOnly}
                products={products}
            />
        </div>
    }
}
class SearchBar extends React.Component {
    render() {
        const {searchProduct, stockOnly, onChange} = this.props

        return <form>
            <div className="mb-3">
                <input type="text" id="searchProduct" className="form-control" value={searchProduct} onChange={onChange}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="stockOnly" checked={stockOnly} onChange={onChange}/>
                <label className="form-check-label" htmlFor="stockOnly">Only show products in stock</label>
            </div>
        </form>
    }
}

class ProductTable extends React.Component {
    render() {
        let flag = '';
        let result = []
        const {stockOnly, searchProduct, products} = this.props;

        products.forEach( (product, index) => {
            if (flag !== product.category) {
                flag = product.category;
                result.push(<ProductCategoryRow key={product.category} category={product.category}/>)
            }

            if (
                (stockOnly && product.stocked === false) || (product.name.toLowerCase().indexOf(searchProduct) === -1)
            ) {
                return;
            }
            result.push(<ProductRow product={product} key={index}/>)
        })


        return <table className="table">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            {result}
            </tbody>
        </table>
    }
}

class ProductRow extends React.PureComponent {
    render() {
        const product = this.props.product
        console.log('Render products');
        return <tr className={product.stocked === false ? 'out' : ''}>
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return <tr>
            <td colSpan="2" className="table-active">{category}</td>
        </tr>
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.querySelector('#products'));