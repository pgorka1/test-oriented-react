import type { PokemonsProvider } from '../../globals/domains/pokemons/provider';
import { MobxStore } from '../../globals/domains/pokemons/store';
import { ViewController } from '../../globals/models/ViewController';

interface PokemonsViewState {
    page: number;
}

export class PokemonsViewController extends ViewController<PokemonsViewState> {
    protected pokemonsProvider: PokemonsProvider;

    constructor(pokemonsProvider: PokemonsProvider, failureCb: (e: string) => void) {
        super(
            failureCb,
            new MobxStore({
                page: 1,
            }),
        );
        this.pokemonsProvider = pokemonsProvider;
    }

    async changePage(type: 'prev' | 'next') {
        const currentPage = this.state.page;
        const newPage = type === 'prev' ? currentPage - 1 : currentPage + 1;
        this.viewStore.setOne('page', newPage);
        await this.fetchPage(newPage);
    }

    async fetchPage(page: number) {
        await this.pokemonsProvider.interactor.fetchPage(page);
    }
}
