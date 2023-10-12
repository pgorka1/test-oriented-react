import type { Store } from '../domains/pokemons/store';

export class BaseSelector<T extends Store<unknown>> {
    store: T;

    constructor(store: T) {
        this.store = store;
    }
}
