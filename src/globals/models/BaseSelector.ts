import type { Store } from '../store';

export class BaseSelector<T extends Store<unknown>> {
    protected store: T;

    constructor(store: T) {
        this.store = store;
    }
}
