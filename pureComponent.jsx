const POSTS = [
    {title: 'article 1', slug: 'article-1', author: 'vincent', checked: true},
    {title: 'article 2', slug: 'article-2', author: 'john', checked: true},
    {title: 'article 3', slug: 'article-3', author: 'bob', checked: false},
    {title: 'article 4', slug: 'article-4', author: 'paul', checked: true},
    {title: 'article 5', slug: 'article-5', author: 'jean', checked: true},
    {title: 'article 6', slug: 'article-6', author: 'thomas', checked: false},
]

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state= {
            onlyChecked: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState({
            [e.target.id] : e.target.checked
        })
    }

    render() {
        console.log("render app component");

        let postResult = [];
        this.props.posts.forEach(post => {
            if (this.state.onlyChecked && !post.checked) {
                return;
            }
            postResult.push(<PostCard post={post} key={post.slug}/>)
        })


        return <div className={"container mt-4"}>
            <FilterCard onlyChecked={this.state.onlyChecked} handleChange={this.handleChange}/>
            <div className={'row mt-4'}>
                {postResult}
            </div>
        </div>
    }

}
class FilterCard extends React.Component {
    render() {
        return <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                id="onlyChecked"
                checked={this.props.onlyChecked}
                onChange={this.props.handleChange}
            />
            <label className="form-check-label" htmlFor="onlyChecked">Afficher seulement les articles validés</label>
        </div>
    }
}
class PostCard extends React.PureComponent {
    render() {
        const post = this.props.post;
        const title = post.checked ? post.title : <span className={"text-danger"}>{post.title}</span>

        return <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{post.author}</h6>
            </div>
        </div>
    }
}


ReactDOM.render(<App posts={POSTS}/>, document.querySelector('#app'));

// Immutabilité :

// App est un composant pure. Au bout de 2 secondes App reçoit un tableau qui a subi une mutation,
// mais qui conserve toujours la même référence. Donc les propriétés de App n'ont pas changé, pas de nouveau rendu.
const POSTS2 = POSTS;
POSTS2.push({title: 'article 7', slug: 'article-7', author: 'jacques', checked: false});
window.setTimeout(function() {
    ReactDOM.render(<App posts={POSTS2}/>, document.querySelector('#app'));
}, 2000)


// App est un composant pure. Au bout de 4 secondes App reçoit un tableau qui incorpore les données précédentes,
// Ce tableau n'a pas la même ref que le précédent. Donc les propriétés de App ont changé, nouveau rendu.
const POSTS3 = [...POSTS2, {title: 'article 8', slug: 'article-8', author: 'henri', checked: false}];
window.setTimeout(function() {
    ReactDOM.render(<App posts={POSTS3}/>, document.querySelector('#app'));
}, 4000)