import type { Pokemon, PokemonPage } from './models/Pokemon';
import { Repository } from '../models/Repository';
import axios from 'axios';
import { ApiError } from '../models/helpers/ApiError';

export interface PokemonsRepository {
    fetchPokemon(pokemonName: string): Promise<Pokemon>;

    fetchPage(limit: number, offset: number): Promise<PokemonPage>;
}

export class ApiPokemonRepository extends Repository implements PokemonsRepository {
    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return (await pokemonResponse.json()) as Pokemon;
    }

    fetchPage(limit: number, offset: number): Promise<PokemonPage> {
        return axios
            .get<PokemonPage>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            .then(({ data }) => data)
            .catch(() => {
                throw new ApiError('something went wrong during fetching pokemons page');
            });
    }
}
