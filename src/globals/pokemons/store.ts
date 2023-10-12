import { makeAutoObservable } from 'mobx';
import { left, right } from 'fp-ts/lib/Either';

import type { AnyObject } from '../models/AnyObj';

import type { Either } from 'fp-ts/lib/Either';
import type { OperationResult } from '../models/OperationResult';

export interface Store<T> {
    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): Either<Error, null>;

    setAll(obj: T): OperationResult;
    get state(): T;
}

export class MobxStore<T extends AnyObject> implements Store<T> {
    storeState: T;

    constructor(initialState: T) {
        makeAutoObservable(this);
        this.storeState = initialState;
    }

    // duplicated code
    setOne<K extends keyof Partial<T>>(key: keyof Partial<T>, value: T[K]): Either<Error, null> {
        if (!this.state.hasOwnProperty.call(this.state, key)) return left(new Error('There is no such key!'));
        this.state[key] = value;
        return right(null);
    }

    setAll(obj: T): Either<Error, null> {
        this.storeState = obj;
        return right(null);
    }

    get state(): T {
        return this.storeState;
    }
}
