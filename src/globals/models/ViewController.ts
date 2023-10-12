import type { Store } from '../pokemons/store';

type FailureCallback = (message: string) => void;

export class ViewController<T> {
    protected failureCallback: FailureCallback;
    protected viewStore: Store<T>;

    constructor(failureCallback: FailureCallback, viewStore: Store<T>) {
        this.failureCallback = failureCallback;
        this.viewStore = viewStore;
    }

    get state(): T {
        return this.viewStore.state;
    }
}
