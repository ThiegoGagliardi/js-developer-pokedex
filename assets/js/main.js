const pokemonList          = document.getElementById('pokemonList');
const loadMoreButton       = document.getElementById('loadMoreButton');
const pokemonStatusDetails = document.getElementById('pokemonDetail');

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" name=${pokemon.name} onclick="loadPokemonDetails(this)">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.img}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToDetail(pokemon) {
    return `
        <div class="detailPokemon ${pokemon.type}" id="${pokemon.name}">
           
           <div class="apresentacao">              
                <div class = "NameNumber">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.number}</span>
                </div>                
                <div>
                    <ul class="types">
                         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ul>                    
                </div>
                <div> 
                    <img src="${pokemon.img}" alt="${pokemon.name}"> 
                </div>
           </div>

            <div class="status">            
                <div class="sobre">
                    <label class="title">Altura:</label><label class="total">${pokemon.altura}</label><br>
                    <label class="title">Peso:</label><label class="total">${pokemon.peso}</label><br>
                    <label class="title">Habilidades:</label>                    
                    ${pokemon.habilidades.map((habilidade) => `<label class="habilidade ${pokemon.type}">${habilidade}</label><br>`).join('')}                    
                </div>               
                <div class="statusbase">
                    ${pokemon.Status.map((status) => `<label class="title"> ${status.name}:</label><label class="total">${status.total}</label> <br>`).join('')}
                </div>    
            </div>                                
        </div>        
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadPokemonDetails(element){
    pokemonStatusDetails.classList.toggle("hide");
    pokemonList.classList.toggle("disable");

    const name = element.getAttribute("name");
        
    pokeApi.getPokemon(name).then((pokemon) => {
        const newHtml = convertPokemonToDetail(pokemon);
        pokemonStatusDetails.innerHTML = newHtml
    })
}

