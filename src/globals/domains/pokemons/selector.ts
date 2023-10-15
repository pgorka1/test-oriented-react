import { BaseSelector } from '../../models';
import type { Pokemon, PokemonResult, PokemonsStore } from './models';
import { getRangeByPage } from './utils';

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
            const { start, end } = getRangeByPage(page);
            return this.store.state.pokemons.slice(start, end);
        };
    }

    get detailsByName(): (name: string) => Pokemon | null {
        return (name: string) => {
            return this.store.state.details[name] ?? null;
        };
    }
}
