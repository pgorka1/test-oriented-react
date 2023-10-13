import { BaseSelector } from '../../models';
import { POKEMON_LIST_PAGE_SIZE } from './config';
import type { Pokemon, PokemonResult, PokemonsStore } from './models';

export interface PokemonsSelector {
    get listByPage(): (page: number) => PokemonResult[];

    get detailsByName(): (name: string) => Pokemon | null;
}

export class PokemonsSelectorImpl extends BaseSelector<PokemonsStore> implements PokemonsSelector {
    constructor(pokemonStore: PokemonsStore) {
        super(pokemonStore);
    }

    get listByPage(): (page: number) => PokemonResult[] {
        return (page: number) => {
            const start = page === 1 ? 0 : (page - 1) * POKEMON_LIST_PAGE_SIZE;
            const end = page === 1 ? POKEMON_LIST_PAGE_SIZE : (page - 1) * POKEMON_LIST_PAGE_SIZE + 10;
            return this.store.state.pokemons.slice(start, end);
        };
    }

    get detailsByName(): (name: string) => Pokemon | null {
        return (name: string) => {
            return this.store.state.details[name] ?? null;
        };
    }
}
