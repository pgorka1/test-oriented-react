export interface Paginated<T> {
    count: number;
    next: number;
    previous: number;
    results: T;
}
