let pokemonRepository = (function () {
    let pokemonList = []; // empty array
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    let modalContainer = document.querySelector('#modal-container');

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
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
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
            hideLoadingMessage();
        }).catch(function(e) {
            console.error(e);
            hideLoadingMessage();
        })
    }
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        let typesList = [];
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            // item.types = details.types;  //This is the original code
            details.types.forEach(function(content){
                // console.log(content.type.name);
                typesList.push(content.type.name);
            })
            item.types = typesList;
            hideLoadingMessage();
        }).catch(function(e) {
            console.error(e);
            hideLoadingMessage();
        })
    }

    function showModal(image, title, text) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = title + "'s picture"

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;
        
        let contentElement = document.createElement('p');
        contentElement.innerText = text;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(imgElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');

    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            let image = pokemon.imageUrl;
            let title = pokemon.name;
            let text = "Height: " + pokemon.height;
            pokemonRepository.showModal(image, title, text);
        // use the code below to test
        // console.log(pokemon);
        // console.log(pokemon.imageUrl);
    });
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    function showLoadingMessage() {
        // Create a loading message element
        let loadingMessage = document.createElement('div');
        loadingMessage.innerText = 'Loading...';
        loadingMessage.id = 'loading-message';
        loadingMessage.style.position = 'fixed';
        loadingMessage.style.top = '0';
        loadingMessage.style.left = '0';

        // Append the loading message to the body or a specific container
        document.body.appendChild(loadingMessage);
    }
    function hideLoadingMessage() {
        // Remove the loading message element from the DOM
        let loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    // add Listener to close the modal when press Esc and click modalContainer area
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
    
    document.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            hideModal(); 
        }
    })

    return {
        add: add,
        getAll: getAll,
        getOne: getOne,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        showDetails: showDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage
    };
})();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(user) {
        pokemonRepository.addListItem(user);
    });
});

// setTimeout(choose = prompt("Please input the pokemon's mane."), 3000);
// setTimeout(pokemonRepository.getOne(choose),3000);
