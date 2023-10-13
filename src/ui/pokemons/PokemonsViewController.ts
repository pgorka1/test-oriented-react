import type { PokemonsProvider } from '../../globals/domains/pokemons';
import { MobxStore } from '../../globals/domains/pokemons';
import { ViewController } from '../../globals/models';
import type { PokemonsViewState } from './models/ViewState';

export class PokemonsViewController extends ViewController<PokemonsViewState> {
    protected pokemonsProvider: PokemonsProvider;

    constructor(pokemonsProvider: PokemonsProvider, failureCb: (e: string) => void) {
        super(
            failureCb,
            new MobxStore<PokemonsViewState>({
                page: 1,
                pokemonSelected: null,
            }),
        );
        this.pokemonsProvider = pokemonsProvider;
    }

    async changePage(type: 'prev' | 'next') {
        const currentPage = this.state.page;
        const newPage = type === 'prev' ? currentPage - 1 : currentPage + 1;
        if (newPage < 0) return;
        this.viewStore.setOne('page', newPage);
        await this.pokemonsProvider.interactor.fetchPage(newPage);
    }

    async selectPokemon(name: string) {
        this.viewStore.setOne('pokemonSelected', name);
        await this.pokemonsProvider.interactor.fetchPokemon(name);
    }
}
