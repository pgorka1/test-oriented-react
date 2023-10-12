import type { LocalStore } from '../../globals/models/LocalStore';
import type { PokemonViewState } from './models/ViewState';
import { LocalStoreImpl } from '../../globals/models/LocalStore';
import type { PokemonsProvider } from '../../globals/pokemons/provider';
import * as E from 'fp-ts/Either';

export class PokemonViewService {
    protected pokemonsProvider: PokemonsProvider;
    protected viewState: LocalStore<PokemonViewState>;
    failureCb: (e: string) => void;

    constructor(pokemonService: PokemonsProvider, failureCb: (e: string) => void) {
        this.pokemonsProvider = pokemonService;
        this.failureCb = failureCb;
        this.viewState = new LocalStoreImpl({
            page: 1,
        });
    }

    changePage(type: 'prev' | 'next') {
        const currentPage =  this.viewState.getOne('page');
        const newPage = type === 'prev' ? currentPage -1 : currentPage + 1
        this.viewState.setOne('page', newPage);
    }

    get page(): number {
        return this.viewState.getOne('page');
    }

    async fetchPage(page: number) {
        const result = await this.pokemonsProvider.interactor.fetchPage(page)();
        if (E.isLeft(result)) {
            return this.failureCb(result.left.message);
        }
        this.pokemonsProvider.interactor.setAll(result.right);
    }
}
