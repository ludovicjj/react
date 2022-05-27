// createPortal provient de ReactDOM.
// Il permet de rendre un composant a un autre endroit du DOM, principalement utiliser pour les modales et les messages d'alerte
// ReactDOM.createPortal(child, container)
// child: le virtual DOM,
// container : élément du DOM ou rendre child

// Example :
// Le composant "Modal" est un enfant de "App"
// Normalement "Modal" est monté dans le DOM en tant qu’enfant de "App" :
function App() {
    const [modal, setModal] = React.useState(false)

    const showModal = function() {
        setModal(true)
    }

    const hideModal = function() {
        setModal(false)
    }

    const style = {
        transform: "translateY(1px)",
    }

    return <div className="container my-4">
        <div className="card" style={style}>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <button onClick={showModal} className="btn btn-primary">Go somewhere</button>
                {modal && <Modal close={hideModal}/>}
            </div>
        </div>
    </div>
}

// Utilisation de "createPortal" pour rendre le composant dans un autre nœud du DOM. Ici "document.body"
function Modal({close}) {

    return ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </React.Fragment>
    , document.body)
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
)