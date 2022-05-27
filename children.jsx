function App() {

    const tabArray = [...new Array(2)].map((v, k) => {
        return <Tab key={k} title={`Onlglet ${k}`}>
            {` ${k} : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique quis elit ac dignissim.
            Vivamus iaculis gravida ligula, ac sollicitudin nunc porta id. Phasellus hendrerit eleifend lorem.
            Donec tortor lorem, tristique sed congue sit amet, suscipit id turpis.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Donec ullamcorper tellus eget lectus malesuada, in suscipit lorem accumsan. Sed pulvinar sed est a varius.
            Integer sed imperdiet lorem.
            Quisque vitae bibendum risus. Ut sed pellentesque mauris, ultricies malesuada erat.
            Mauris faucibus erat a neque feugiat, id gravida orci gravida.
            Cras tincidunt odio ac leo cursus, vel porta felis aliquet. Fusce a turpis felis.`}
        </Tab>
    });

    return <Tabs>
        {tabArray}
        <Tab title="Premier onglet">
            Premier : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique quis elit ac dignissim.
            Vivamus iaculis gravida ligula, ac sollicitudin nunc porta id. Phasellus hendrerit eleifend lorem.
            Donec tortor lorem, tristique sed congue sit amet, suscipit id turpis.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Donec ullamcorper tellus eget lectus malesuada, in suscipit lorem accumsan. Sed pulvinar sed est a varius.
            Integer sed imperdiet lorem.
            Quisque vitae bibendum risus. Ut sed pellentesque mauris, ultricies malesuada erat.
            Mauris faucibus erat a neque feugiat, id gravida orci gravida.
            Cras tincidunt odio ac leo cursus, vel porta felis aliquet. Fusce a turpis felis.
        </Tab>
        <Tab title="Second onglet">
            Second : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique quis elit ac dignissim.
            Vivamus iaculis gravida ligula, ac sollicitudin nunc porta id. Phasellus hendrerit eleifend lorem.
            Donec tortor lorem, tristique sed congue sit amet, suscipit id turpis.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Donec ullamcorper tellus eget lectus malesuada, in suscipit lorem accumsan. Sed pulvinar sed est a varius.
            Integer sed imperdiet lorem.
            Quisque vitae bibendum risus. Ut sed pellentesque mauris, ultricies malesuada erat.
            Mauris faucibus erat a neque feugiat, id gravida orci gravida.
            Cras tincidunt odio ac leo cursus, vel porta felis aliquet. Fusce a turpis felis.
        </Tab>
    </Tabs>
}

function Tabs({children}) {
    // children : [Array(2), {…}, {…}]
    // Renvoie la liste des enfants sous la forme d'un flat array ou chaque enfant est doté d’une key
    // flat array : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
    // childrenArray : [{…}, {…}, {…}, {…}]
    const childrenArray = React.Children.toArray(children);


    // State : conserve la clé du premier enfant
    const [current, setCurrent] = React.useState(childrenArray[0].key);


    const handleClick = React.useCallback(function(key) {
        console.log(key)
    }, []);

    // Modification des props des enfants (<Tab>), seulement possible lors du clonage.
    // ajout d'une clé "active": bool et "selected": bool dans les props
    // Seul l'enfant dont la clé correspond avec "current" aura la valeur true pour "active" et "selected"
    const childrenCloned = childrenArray.map(child => (
        React.cloneElement(
            child,
            {active: child.key === current, selected: child.key === current}
        )
    ))

    return <React.Fragment>
        <ul className="nav nav-pills mb-3">
            {childrenCloned.map((child) => {
                return <li className="nav-item" key={child.key}>
                    <a
                        className={`nav-link ${child.props.active ? 'active': ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrent(child.key)
                        }}
                        href="#"
                    >
                        {child.props.title}
                    </a>
                </li>
            })}
        </ul>
        <section className="tab-container">
            {childrenCloned}
        </section>
    </React.Fragment>
}


const Tab = React.memo(function tabContent(props) {
    console.log('render');
    return <div hidden={!props.selected}>{props.children}</div>;
})

ReactDOM.render(
    <React.StrictMode>
        <div className="container"><App /></div>
    </React.StrictMode>,
    document.querySelector('#app')
)