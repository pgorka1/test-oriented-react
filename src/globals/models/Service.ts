import type { Repository } from './Repository';
import type { Store } from '../pokemons/store';

export class Service<R extends Repository, S extends Store<unknown>> {
    private readonly repository: R;
    private readonly store: S;

    constructor(repository: R, store: S) {
        this.repository = repository;
        this.store = store;
    }
}
