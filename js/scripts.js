let pokemonRepository = (function () {

    let pokemonList = []; // empty array
    pokemonList[0] = {order : 1, name : 'Bulbasaur', height : 0.7, weight : 6.9, types : ['grass', 'poison'], evolve : true};
    pokemonList[1] = {order : 3, name : 'Venusaur', height : 2, weight : 100, types : ['grass', 'poison'], evolve : false};
    pokemonList[2] = {order : 6, name : 'Charizard', height : 1.7, weight : 90.5, types : ['fire', 'flying'], evolve : false};
    pokemonList[3] = {order : 19, name : 'Rattata', height : 0.3, weight : 3.5, types : ['normal'], evolve : true};
    pokemonList[4] = {order : 20, name : 'Raticate', height : 0.7, weight : 18.5, types : ['normal'], evolve : false};

    function add(pokemon) {
        if (typeof pokemon === 'object' && 
        Object.keys(pokemon).join() === Object.keys(pokemonList[0]).join()) {
            // here using the array.join() to change the objectKeys(array) to string
            // because object and array are not equal even though they look totally the same
            pokemonList.push(pokemon);
            console.log('Add ' + pokemon.name + ' to the list successfully.')
        } else {
            console.log('It is not complete pokemon data!')
        }
    }
    function getAll() {
        return pokemonList;
    }
    function getOne(name) {
        pokemonList.forEach(function(pokemon) {
            if (pokemon.name === name) {
                console.log(pokemon)
            }
        })
    }
    function addListItem(pokemon) {
        let pokeList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button')
        button.innerText = pokemon.name;
        button.classList.add('pokemon-list-button');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
        // return pokemon.name;
    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        getOne: getOne,
        addListItem: addListItem
    };
})();
  
  console.log(pokemonRepository.getAll()); // []
  pokemonRepository.add({ name: 'Pikachu' });
  pokemonRepository.add({ order : 8, name : 'Kameil', height : 1, weight : 22.5, types : ['water'], evolve : true});
  console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]

let heightMax = 0;
pokemonRepository.getAll().forEach(function(user) {
    if (heightMax < user.height) {
        heightMax = user.height
    }
})
pokemonRepository.getAll().forEach(function(user) {
    pokemonRepository.addListItem(user);
})

// setTimeout(choose = prompt("Please input the pokemon's mane."), 3000);
// setTimeout(pokemonRepository.getOne(choose),3000);
