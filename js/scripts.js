let pokemonList = [];

pokemonList[0] = {order : 1, name : 'Bulbasaur', height : 0.7, weight : 6.9, types : ['grass', 'poison'], evolve : true};
pokemonList[1] = {order : 3, name : 'Venusaur', height : 2, weight : 100, types : ['grass', 'poison'], evolve : false};
pokemonList[2] = {order : 6, name : 'Charizard', height : 1.7, weight : 90.5, types : ['fire', 'flying'], evolve : false};
pokemonList[3] = {order : 19, name : 'Rattata', height : 0.3, weight : 3.5, types : ['normal'], evolve : true};
pokemonList[4] = {order : 20, name : 'Raticate', height : 0.7, weight : 18.5, types : ['normal'], evolve : false};

let heightList = [];
for (let i=0; i<pokemonList.length; i++){
    heightList[i] = pokemonList[i].height
}
let heightMax = Math.max.apply(null,heightList);

pokemonList.forEach(function(user) {
    document.write('<br><br>' + user.name + '(height: ' + user.height +')')
    if (user.height === heightMax){
        document.write(' -- This is the BIGGEST pokemon!!!')
    }
})