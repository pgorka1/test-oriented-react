import { makeAutoObservable } from 'mobx';
import type { AnyObject } from '../../models';

export interface Store<T> {
    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): void;

    setAll(obj: T): void;

    get state(): T;
}

export class MobxStore<T extends AnyObject> implements Store<T> {
    private storeState: T;

    constructor(initialState: T) {
        makeAutoObservable(this);
        this.storeState = initialState;
    }

    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): void {
        if (!this.state.hasOwnProperty.call(this.state, key)) throw new Error('There is no such property');
        this.state[key] = value;
    }

    setAll(obj: T): void {
        this.storeState = obj;
    }

    get state(): T {
        return this.storeState;
    }
}
