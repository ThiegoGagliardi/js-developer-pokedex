
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail)
{
   const pokemon = new Pokemon();

   const habilidades     = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
   const generos         = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
   const types           = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
   const [type]          = types;  
   
   pokemon.number        = pokemonDetail.id;
   pokemon.name          = pokemonDetail.name;   
   pokemon.types         = types
   pokemon.type          = type
   pokemon.type          = type;
   pokemon.img           = pokemonDetail.sprites.other.dream_world.front_default;
   pokemon.habilidades   = habilidades;   
   pokemon.altura        = pokemonDetail.height;
   pokemon.peso          = pokemonDetail.weight;  
   
   pokemonDetail.stats.forEach(function(status){       
    const pokemonStatus = new PokemonStatus();
       
       pokemonStatus.name  = status.stat.name;
       pokemonStatus.total = status.base_stat;

       pokemon.Status.push(pokemonStatus);
   })
   
   pokemon.vida             = pokemonDetail.stats[0].base_stat;
   pokemon.ataque           = pokemonDetail.stats[1].base_stat;
   pokemon.defesa           = pokemonDetail.stats[2].base_stat;
   pokemon.AtaqueEspecial   = pokemonDetail.stats[3].base_stat;
   pokemon.DefesaEspecial   = pokemonDetail.stats[4].base_stat;
   pokemon.velocidade       = pokemonDetail.stats[5].base_stat;   

   return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    
    return fetch(url)
        .then((response) => response.json())        
        .then(convertPokeApiDetailToPokemon);
}
