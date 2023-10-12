import type { PokemonPage, PokemonResult } from './pokemons/models/Pokemon';
import type { PokemonsRepository } from './pokemons/repository';
import type { Pokemon } from './pokemons/models/Pokemon';
import { map, TaskEither } from 'fp-ts/TaskEither';
import type * as TE from 'fp-ts/TaskEither';
import { POKEMON_LIST_PAGE_SIZE } from '../ui/config';
import type { PokemonsStore } from './PokemonsSelector';
import type { OperationResult } from './models/OperationResult';

export class Interactor<R, S> {
    repository: R;
    store: S;

    constructor(repository: R, store: S) {
        this.repository = repository;
        this.store = store;
    }
}

export interface PokemonsInteractor {
    fetchPokemon(pokemonName: string): Promise<Pokemon>;

    fetchPage(page: number): TaskEither<Error, PokemonResult[]>;

    setAll(pokemons: PokemonResult[]): OperationResult;
}

// actions
export class PokemonsInteractorImpl extends Interactor<PokemonsRepository, PokemonsStore> implements PokemonsInteractor {
    constructor(pokemonsRepository: PokemonsRepository, pokemonsStore: PokemonsStore) {
        super(pokemonsRepository, pokemonsStore);
    }

    fetchPage(page: number): TE.TaskEither<Error, PokemonResult[]> {
        return map((pokemonPage: PokemonPage) => pokemonPage.results)(this.repository.fetchPage(
            POKEMON_LIST_PAGE_SIZE,
            page === 1 ? 0 : page * POKEMON_LIST_PAGE_SIZE,
        ));
    }

    fetchPokemon(pokemonName: string): Promise<Pokemon> {
        return this.repository.fetchPokemon(pokemonName);
    }

    setAll(pokemons: PokemonResult[]): OperationResult {
        return this.store.setAll({ pokemons });
    }
}
