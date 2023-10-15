import type { PokemonsRepository } from './repository';
import { POKEMON_LIST_PAGE_SIZE } from './config';
import { BaseInteractor } from '../../models';
import type { PokemonsStore } from './models';
import { getRangeByPage } from './utils';

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
        const pokemons = this.store.state.pokemons;
        const { start, end } = getRangeByPage(page);
        if (pokemons.slice(start, end).length === POKEMON_LIST_PAGE_SIZE) return;
        const pokemonsPage = await this.repository.fetchPage(POKEMON_LIST_PAGE_SIZE, start);
        this.store.setOne('pokemons', [...pokemons, ...pokemonsPage.results]);
    }
}
