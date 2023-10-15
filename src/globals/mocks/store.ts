import type { AnyObject } from '../models';
import type { Store } from '../store';

export class InMemoryStore<T extends AnyObject> implements Store<T> {
    private storeState: T;

    constructor(initialState: T) {
        this.storeState = initialState;
    }

    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): void {
        this.state[key] = value;
    }

    setAll(obj: T): void {
        this.storeState = obj;
    }

    get state(): T {
        return this.storeState;
    }
}
