# React

## Faire remonter l'état
Création d'un [calculateur de température](convert.jsx) qui détermine si l’eau bout à une température donnée.
## Penser en React
Création d’un [tableau de données de produits](products.jsx) proposant filtrage et recherche.
## Refs et DOM
[Transfert de refs](ref.jsx) vers des composants du DOM, pour les champs non contrôlé ou bibliothèques externe

## Hooks
- [useState](useState.jsx) permet d'ajouter un état local pour les composants sous forme de fonction.
- [useEffect](useEffect.jsx) permet aux fonctions composants de gérer des effets de bord. Il joue le même rôle que componentDidMount, componentDidUpdate, et componentWillUnmount dans les classes React
- [useMemo](useMemo.jsx) recalculera la valeur mémorisée seulement si une des entrées a changé. Cette optimisation permet d’éviter des calculs coûteux à chaque rendu.
- [useCallback](useCallback.jsx) recalculera la function mémorisée seulement si une des entrées a changé. Cette optimisation permet d’éviter des calculs coûteux à chaque rendu.
- [useRef](useRef.jsx) initialise une valeur qui persistera tout le long du cycle de vie du composant et qui fera référence a
  un node du DOM, généralement des champs non contrôlés par REACT  