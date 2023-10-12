import type { PokemonResult } from './models/Pokemon';
import { BaseSelector } from '../models/BaseSelector';
import { POKEMON_LIST_PAGE_SIZE } from '../../ui/config';
import type { PokemonsStore } from './models/PokemonsStore';

export interface PokemonsSelector {
    get all(): PokemonResult[];

    get byPage(): (page: number) => PokemonResult[];
}

export class PokemonsSelectorImpl extends BaseSelector<PokemonsStore> implements PokemonsSelector {
    constructor(pokemonStore: PokemonsStore) {
        super(pokemonStore);
    }

    get all(): PokemonResult[] {
        return this.store.state.pokemons;
    }

    get byPage(): (page: number) => PokemonResult[] {
        return (page: number) => {
            const start = page === 1 ? 0 : (page - 1) * POKEMON_LIST_PAGE_SIZE;
            const end = page === 1 ? POKEMON_LIST_PAGE_SIZE - 1 : (page - 1) * POKEMON_LIST_PAGE_SIZE + 9;
            return this.store.state.pokemons.slice(start, end);
        };
    }
}
