import type { Pokemon, PokemonPage, PokemonResult } from './models/Pokemon';
import { Repository } from '../models/Repository';
import type { TaskEither } from 'fp-ts/lib/TaskEither';
import * as TE from 'fp-ts/lib/TaskEither';
import axios from 'axios';
import { ApiError } from '../models/ApiError';

export interface PokemonsRepository {
    fetchPokemon(pokemonName: string): Promise<Pokemon>;

    fetchPage(limit: number, offset: number): TaskEither<Error, PokemonPage>;
}

export class ApiPokemonRepository extends Repository implements PokemonsRepository {
    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return (await pokemonResponse.json()) as Pokemon;
    }

    fetchPage(limit: number, offset: number): TaskEither<Error, PokemonPage> {
        // extract it
        return TE.tryCatch(
            () =>
                axios
                    .get<PokemonPage>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                    .then(({ data }) => data),
            () => new ApiError('something went wrong during fetching pokemons page'),
        );
    }
}
