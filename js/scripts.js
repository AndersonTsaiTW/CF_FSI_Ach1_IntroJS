let pokemonRepository = (function () {

    let pokemonList = []; // empty array
    pokemonList[0] = {order : 1, name : 'Bulbasaur', height : 0.7, weight : 6.9, types : ['grass', 'poison'], evolve : true};
    pokemonList[1] = {order : 3, name : 'Venusaur', height : 2, weight : 100, types : ['grass', 'poison'], evolve : false};
    pokemonList[2] = {order : 6, name : 'Charizard', height : 1.7, weight : 90.5, types : ['fire', 'flying'], evolve : false};
    pokemonList[3] = {order : 19, name : 'Rattata', height : 0.3, weight : 3.5, types : ['normal'], evolve : true};
    pokemonList[4] = {order : 20, name : 'Raticate', height : 0.7, weight : 18.5, types : ['normal'], evolve : false};

    return {
      add: function(pokemon) {
        if (typeof pokemon === 'object' && 
        Object.keys(pokemon).join() === Object.keys(pokemonList[0]).join()) {
            // here using the array.join() to change the objectKeys(array) to string
            // because object and array are not equal even though they look totally the same
            pokemonList.push(pokemon);
            console.log('Add ' + pokemon.name + ' to the list successfully.')
        } else {
            console.log('It is not complete pokemon data!')
        }
      },
      getAll: function() {
        return pokemonList;
      },
      getOne: function(name) {
        pokemonList.forEach(function(pokemon) {
            if (pokemon.name === name) {
                console.log(pokemon)
            }
        })
    }
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
    document.write('<br><br>' + user.name + '(height: ' + user.height +')')
    if (user.height === heightMax){
        document.write(' -- This is the BIGGEST pokemon!!!')
    }
})

setTimeout(choose = prompt("Please input the pokemon's mane."), 3000); // Run this in 1000ms
setTimeout(pokemonRepository.getOne(choose),3000);
