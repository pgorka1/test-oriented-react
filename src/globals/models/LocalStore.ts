import type { AnyObject } from './AnyObj';
import { Either, left, right } from 'fp-ts/lib/Either';
import { makeAutoObservable } from 'mobx';
import type { Store } from '../pokemons/store';

export interface LocalStore<T> extends Store<T> {
    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): Either<Error, null>;

    setAll(obj: T): Either<Error, null>;

    getAll(): T;

    getOne<K extends keyof Partial<T>>(key: K): T[K];
}

export class LocalStoreImpl<T extends AnyObject> implements LocalStore<T> {
    state: T;

    constructor(initialState: T) {
        makeAutoObservable(this);
        this.state = initialState;
    }

    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): Either<Error, null> {
        if (!this.state.hasOwnProperty.call(this.state, key)) return left(new Error('There is no such key!'));
        this.state[key] = value;
        return right(null);
    }

    setAll(obj: T): Either<Error, null> {
        this.state = obj;
        return right(null);
    }

    getAll(): T {
        return this.state;
    }

    getOne<K extends keyof Partial<T>>(key: K): T[K] {
        return this.state[key];
    }
}
