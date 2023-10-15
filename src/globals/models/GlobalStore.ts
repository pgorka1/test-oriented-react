import type { PokemonsProvider } from '../domains/pokemons';

export interface GlobalStore {
    pokemons: PokemonsProvider;
}
