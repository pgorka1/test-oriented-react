import type { PokemonsStoreState } from '../domains/pokemons';

export const pokemonsStateFactory = (): PokemonsStoreState => ({
    pokemons: [],
    details: {},
});
