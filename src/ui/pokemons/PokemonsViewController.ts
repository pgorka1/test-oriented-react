import type { PokemonsProvider } from '../../globals/domains/pokemons';
import { MobxStore } from '../../globals/domains/pokemons';
import { ApiError, ViewController } from '../../globals/models';
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
        if (newPage < 1) return;
        this.viewStore.setOne('page', newPage);
        try {
            await this.pokemonsProvider.interactor.fetchPage(newPage);
        } catch (e) {
            if (e instanceof ApiError) {
                this.failureCallback(e.message);
            }
            this.failureCallback('Something went wrong with changing page');
        }
    }

    async selectPokemon(name: string) {
        this.viewStore.setOne('pokemonSelected', name);
        try {
            await this.pokemonsProvider.interactor.fetchPokemon(name);
        } catch (e) {
            if (e instanceof ApiError) {
                this.failureCallback(e.message);
            }
            this.failureCallback('Something went wrong with changing page');
        }
    }
}
