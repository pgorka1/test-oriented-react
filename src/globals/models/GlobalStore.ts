import type { PokemonsProvider } from '../domains/pokemons/provider';

export interface GlobalStore {
    pokemons: PokemonsProvider;
}
