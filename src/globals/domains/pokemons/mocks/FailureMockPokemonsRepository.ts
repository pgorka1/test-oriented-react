import type { PokemonsRepository } from '../repository';
import type { Pokemon, PokemonPage } from '../models';
import { ApiError } from '../../../models';

export class FailureMockPokemonsRepository implements PokemonsRepository {
    fetchPage(limit: number, offset: number): Promise<PokemonPage> {
        return Promise.reject(new ApiError('fetchPage error'));
    }

    fetchPokemon(name: string): Promise<Pokemon> {
        return Promise.reject(new ApiError('fetchPokemon error'));
    }
}
