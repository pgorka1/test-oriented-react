import type { PokemonResult } from './models/Pokemon';
import type { PokemonsRepository } from './repository';
import { POKEMON_LIST_PAGE_SIZE } from '../../../ui/config';
import { BaseInteractor } from '../../models/BaseInteractor';
import type { PokemonsStore } from './models/PokemonsStore';

export interface PokemonsInteractor {
    // fetchPokemon(pokemonName: string): Promise<Pokemon>;

    fetchPage(page: number): Promise<void>;

    setAll(pokemons: PokemonResult[]): void;
}

export class PokemonsInteractorImpl
    extends BaseInteractor<PokemonsRepository, PokemonsStore>
    implements PokemonsInteractor
{
    constructor(pokemonsRepository: PokemonsRepository, pokemonsStore: PokemonsStore) {
        super(pokemonsRepository, pokemonsStore);
    }

    // fetchPokemon(pokemonName: string): Promise<Pokemon> {
    //     return this.repository.fetchPokemon(pokemonName);
    // }

    async fetchPage(page: number): Promise<void> {
        const pokemonsPage = await this.repository.fetchPage(
            POKEMON_LIST_PAGE_SIZE,
            page === 1 ? 0 : (page - 1) * POKEMON_LIST_PAGE_SIZE,
        );

        const numberOfElements = page === 1 ? POKEMON_LIST_PAGE_SIZE - 1 : (page - 1) * POKEMON_LIST_PAGE_SIZE + 9;
        if (numberOfElements > this.store.state.pokemons.length)
            this.setAll([...this.store.state.pokemons, ...pokemonsPage.results]);
    }

    setAll(pokemons: PokemonResult[]): void {
        return this.store.setAll({ pokemons });
    }
}
