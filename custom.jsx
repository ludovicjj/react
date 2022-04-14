function useIncrement(start = 0, step = 1) {
    const [count, setCount] = React.useState(start);
    const increment = function () {
        setCount((count) => {
            return count + step
        })
    }
    return [count, increment];
}
function useToggle(initialValue = false) {
    const [value, setValue] = React.useState(initialValue)
    const toggle = function (e) {
        setValue(e.target.checked);
    }
    return [value, toggle]
}
function useAutoIncrement(start = 0, step = 1) {
    const [count, increment] = useIncrement()

    React.useEffect(function ()  {
        const timer = window.setInterval(function() {
            increment()
        }, 1000);

        return function () {
            window.clearInterval(timer)
        }
    }, []);

    return count;
}
function useFetch(url) {
    const [state, setState] = React.useState({
        items: [],
        loading: true,
        error: null
    });

    React.useEffect(function () {
        (async function() {
            await fetch(url).then((response) => {
                if(!response.ok) {
                    throw new Error("Bad response from server");
                }
                return response;
            }).then(async (returnedResponse) => {
                const data = await returnedResponse.json()
                setState({
                    items: data,
                    loading: false
                });
            }).catch((error) => {
                setState((state) => ({...state, loading: false, error: "request sent to the server failed."}));
                console.log('oops ' + error.message)
            });
        })()
    }, []);

    return [
        state.items,
        state.loading,
        state.error
    ];
}

function Count() {
    const count = useAutoIncrement(10);
    return <button>Count: {count}</button>
}

function PostTable() {
    const [posts, loading, error] = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=10")

    if(loading) {
        return <p>Chargement des articles en cours...</p>
    }

    if (error) {
        return <div>
            <h2>Liste des articles</h2>
            <p>{error}</p>
        </div>
    }

    return <div>
        <h2>Liste des articles</h2>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">title</th>
                <th scope="col">body</th>
            </tr>
            </thead>
            <tbody>
            {posts.map(function (post) {
                return <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}
function TodoList() {
    const [todos, loading, error] = useFetch("https://jsonplaceholder.typicode.com/todos?_limit=10")

    if(loading) {
        return <p>Chargement de la todolist en cours...</p>
    }

    if (error) {
        return <div>
            <h2>Todolist :</h2>
            <p>{error}</p>
        </div>
    }

    return <div>
        <h2>Todolist :</h2>
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
        </ul>
    </div>
}


function App() {
    const [compteurVisible, toggleCompteur] = useToggle(true)

    return <div className="container">
        <TodoList/>
        <PostTable/>
    </div>
}
ReactDOM.render(
    <React.StrictMode><App/></React.StrictMode>,
    document.querySelector('#app')
);