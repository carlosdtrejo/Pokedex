const container: HTMLElement | any = document.getElementById("app") //allow you to access arbitrary properties, even ones that don’t exist
const pokemons: number = 150

interface IPokemon {
    id: number,
    name: string,
    image: string,
    type: string
}

// Promise<void>: Means that the funciton won't return a value
const getPokemon = async (id: number): Promise<void> => { //It make take time to fetch data, hence we use an asynchronous function that returns a Promise of type void
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //Response?
    const pokemon: any = await data.json()
    const pokemonType: string = pokemon.types.map((poke:any) => poke.type.name).join(", ")

    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType
    }

    showPokemon(transformedPokemon)
}

const fetchData = (): void => { //void: the absence of having any type at all
    for (let i: number = 1; i <= pokemons; i++) {
        getPokemon(i)
    }
}

const showPokemon = (pokemon: IPokemon): void => { //returns no value
    let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
    container.innerHTML += output
}

fetchData()