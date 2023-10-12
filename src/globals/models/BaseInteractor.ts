export class BaseInteractor<R, S> {
    repository: R;
    store: S;

    constructor(repository: R, store: S) {
        this.repository = repository;
        this.store = store;
    }
}
