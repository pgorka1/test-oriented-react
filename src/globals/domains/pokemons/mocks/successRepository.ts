import type { PokemonsRepository } from '../repository';
import type { Pokemon, PokemonPage } from '../models';
import { fakePokemonResultsFactory } from './pokemonResults';

export class SuccessMockPokemonsRepository implements PokemonsRepository {
    fetchPage(limit: number, offset: number): Promise<PokemonPage> {
        return Promise.resolve({
            count: 1000,
            next: `fake/next/${offset + limit + 1}`,
            previous: null,
            results: fakePokemonResultsFactory(limit, offset),
        });
    }

    fetchPokemon(name: string): Promise<Pokemon> {
        return Promise.resolve({
            weight: 100,
            height: 100,
            base_experience: '1',
            id: 1,
        });
    }
}
