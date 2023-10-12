export class BaseProvider<S, I> {
    protected readonly storeSelector: S;
    protected readonly storeInteractor: I;

    constructor(selector: S, interactor: I) {
        this.storeSelector = selector;
        this.storeInteractor = interactor;
    }
}
