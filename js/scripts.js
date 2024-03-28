let pokemonRepository = (function () {
    let pokemonList = []; // empty array
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
            console.log('Add ' + pokemon.name + ' to the list successfully.')
        } else {
            console.log('It is not complete pokemon data!');
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
        button.classList.add('btn');
        button.classList.add('btn-success');

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        listItem.classList.add('list-group-item');
        listItem.appendChild(button);
        pokeList.appendChild(listItem);
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
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
        $('.modal-content').empty();

        let modalHeader = $('<div class="modal-header"></div>');
        let modalHeaderGrid = $('<div class="row align-items-center"></div>');

        let modalHeaderGridImg = $('<div class="col-auto"></div>');
        let imgElement = $('<img>').attr('src', image).attr('alt', title + "'s picture").addClass('img-fluid');
        modalHeaderGridImg.append(imgElement);
        
        let modalHeaderGridTitle = $('<div class="col"></div>');
        let titleElement = $('<h5 class="modal-title" id="exampleModalLabel">'+title+'</h5>');
        modalHeaderGridTitle.append(titleElement);
        
        modalHeaderGridImg.appendTo(modalHeaderGrid);
        modalHeaderGridTitle.appendTo(modalHeaderGrid);        

        let closeButtonElement = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>').on('click', hideModal);
        modalHeader.append(modalHeaderGrid, closeButtonElement);
        
        let modalBody = $('<div class="modal-body"></div>');
        let contentElement = $('<p>').text(text);
        modalBody.append(contentElement);

        let modalFooter = $('<div class="modal-footer"></div>');
        let closeButton = $('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
        // let saveButton = $('<button type="button" class="btn btn-primary">Save changes</button>');
        // modalFooter.append(closeButton, saveButton);
        modalFooter.append(closeButton);

        $('.modal-content').append(modalHeader, modalBody, modalFooter);
        
        $('#exampleModal').modal('show');

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
        $('#exampleModal').modal('hide');
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

