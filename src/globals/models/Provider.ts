export interface Provider<S, I> {
    get selector(): S;

    get interactor(): I;
}
