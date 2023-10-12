import type { Store } from '../pokemons/store';

export class BaseSelector<T extends Store<unknown>> {
    store: T;

    constructor(store: T) {
        this.store = store;
    }
}
