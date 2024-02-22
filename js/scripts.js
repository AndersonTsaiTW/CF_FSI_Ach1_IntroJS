let pokemonList = [];

pokemonList[0] = {};
pokemonList[0].order = 1;
pokemonList[0].name = 'Bulbasaur';
pokemonList[0].height = 0.7;
pokemonList[0].weight = 6.9;
pokemonList[0].types = ['grass', 'poison'];
pokemonList[0].evolve = true;

pokemonList[1] = {};
pokemonList[1].order = 3;
pokemonList[1].name = 'Venusaur';
pokemonList[1].height = 2;
pokemonList[1].weight = 100;
pokemonList[1].types = ['grass', 'poison'];
pokemonList[1].evolve = false;

pokemonList[2] = {};
pokemonList[2].order = 6;
pokemonList[2].name = 'Charizard';
pokemonList[2].height = 1.7;
pokemonList[2].weight = 90.5;
pokemonList[2].types = ['fire', 'flying'];
pokemonList[2].evolve = false;

pokemonList[3] = {};
pokemonList[3].order = 19;
pokemonList[3].name = 'Rattata';
pokemonList[3].height = 0.3;
pokemonList[3].weight = 3.5;
pokemonList[3].types = ['normal'];
pokemonList[3].evolve = true;

pokemonList[4] = {};
pokemonList[4].order = 20;
pokemonList[4].name = 'Raticate';
pokemonList[4].height = 0.7;
pokemonList[4].weight = 18.5;
pokemonList[4].types = ['normal'];
pokemonList[4].evolve = false;

let heightList = [];
for (let i=0; i<pokemonList.length; i++){
    heightList[i] = pokemonList[i].height
}
let heightMax = Math.max.apply(null,heightList);

for (let i=0; i<pokemonList.length; i++){
    document.write('<br><br>' + pokemonList[i].name + '(height: ' + pokemonList[i].height +')')
    if (pokemonList[i].height === heightMax){
        document.write(' -- This is the BIGGEST pokemon!!!')
    }
}