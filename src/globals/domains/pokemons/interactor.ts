import type { PokemonsRepository } from './repository';
import { POKEMON_LIST_PAGE_SIZE } from './config';
import { BaseInteractor } from '../../models';
import type { PokemonsStore } from './models';

export interface PokemonsInteractor {
    fetchPokemon(name: string): Promise<void>;

    fetchPage(page: number): Promise<void>;
}

export class PokemonsInteractorImpl
    extends BaseInteractor<PokemonsRepository, PokemonsStore>
    implements PokemonsInteractor
{
    constructor(pokemonsRepository: PokemonsRepository, pokemonsStore: PokemonsStore) {
        super(pokemonsRepository, pokemonsStore);
    }

    async fetchPokemon(name: string): Promise<void> {
        const details = this.store.state.details;
        if (details[name] !== undefined) return;

        const { id, height, base_experience, weight } = await this.repository.fetchPokemon(name);
        this.store.setOne('details', {
            ...this.store.state.details,
            [name]: {
                id,
                height,
                weight,
                base_experience,
            },
        });
    }

    async fetchPage(page: number): Promise<void> {
        const start = page === 1 ? 0 : (page - 1) * POKEMON_LIST_PAGE_SIZE;
        const end = page === 1 ? POKEMON_LIST_PAGE_SIZE : (page - 1) * POKEMON_LIST_PAGE_SIZE + 10;

        if (this.store.state.pokemons.slice(start, end).length === 10) return;
        const pokemonsPage = await this.repository.fetchPage(
            POKEMON_LIST_PAGE_SIZE,
            page === 1 ? 0 : (page - 1) * POKEMON_LIST_PAGE_SIZE,
        );

        const numberOfElements = page === 1 ? POKEMON_LIST_PAGE_SIZE : (page - 1) * POKEMON_LIST_PAGE_SIZE + 10;
        if (numberOfElements > this.store.state.pokemons.length)
            this.store.setOne('pokemons', [...this.store.state.pokemons, ...pokemonsPage.results]);
    }
}
