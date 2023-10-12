import type { PokemonResult } from './pokemons/models/Pokemon';
import type { Store } from './pokemons/store';

export type PokemonsStoreState = {
    pokemons: PokemonResult[];
};
export type PokemonsStore = Store<PokemonsStoreState>;
export class Selector<T> {
    store: Store<T>;

    constructor(store: Store<T>) {
        this.store = store;
    }
}

export interface PokemonsSelector {
    get all(): PokemonResult[];
    get byIndex(): (index: number) => PokemonResult | null;
}

// selectors
export class PokemonsSelectorImpl extends Selector<PokemonsStoreState> implements PokemonsSelector {
    constructor(pokemonStore: Store<PokemonsStoreState>) {
        super(pokemonStore);
    }

    get all(): PokemonResult[] {
        return this.store.state.pokemons;
    }

    get byIndex(): (index: number) => PokemonResult | null {
        return (index: number) => {
            const pokemon = this.store.state.pokemons[index]
            return pokemon ?? null;
        }
    }
}
