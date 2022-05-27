# React

## Faire remonter l'état
Création d'un [calculateur de température](convert.jsx) qui détermine si l’eau bout à une température donnée.
## Penser en React
Création d’un [tableau de données de produits](products.jsx) proposant filtrage et recherche.
## Refs et DOM
[Transfert de refs](ref.jsx) vers des composants du DOM, pour les champs non contrôlé ou bibliothèques externe

## Hooks
- [useState](useState.jsx) permet d'ajouter un état local pour les composants sous forme de fonction.
- [useEffect](useEffect.jsx) permet aux composants sous forme de fonction de gérer des effets de bord. Il joue le même rôle que componentDidMount, componentDidUpdate, et componentWillUnmount dans les classes React
- [useMemo](useMemo.jsx) recalculera la valeur mémorisée seulement si une des entrées a changé. Cette optimisation permet d’éviter des calculs coûteux à chaque rendu.
- [useCallback](useCallback.jsx) recalculera la function mémorisée seulement si une des entrées a changé. Cette optimisation permet d’éviter des calculs coûteux à chaque rendu.
- [useRef](useRef.jsx) initialise une valeur qui persistera tout le long du cycle de vie du composant et qui fera référence a
  un node du DOM, généralement des champs non contrôlés par REACT
- [useLayoutEffect](useLayoutEffect.jsx) permet de modifier le DOM avant le rendu, car s’exécute de manière synchrone. Sa signature est identique à "useEffect"
- [useReducer](useReducer.jsx) est souvent préférable à useState quand vous avez une logique d’état local complexe qui comprend plusieurs sous-valeurs, ou quand l’état suivant dépend de l’état précédent.
## Context
- [Le Contexte](context.jsx) offre un moyen de partager des valeurs comme celles-ci entre des composants sans avoir à explicitement passer une prop à chaque niveau de l’arborescence. Peut être utilisé pour des composants sous forme de **fonction** et de **class**
- [documentation des context](https://fr.reactjs.org/docs/context.html#gatsby-focus-wrapper)

## Les portails
- [Les portails](portal.jsx) fournissent une excellente solution pour afficher des composants enfants dans un nœud DOM qui existe en dehors de la hiérarchie DOM du composant parent.
- [documentation des portails](https://fr.reactjs.org/docs/portals.html)

## Manipuler les enfants
- [manipuler les composants enfants](children.jsx) dans React grâce aux méthodes **React.Children.toArray()** et **React.cloneElement()**
- [documentation transformation d'éléments](https://reactjs.org/docs/react-api.html#transforming-elements)