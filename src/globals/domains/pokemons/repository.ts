import { Repository, ApiError } from '../../models';
import axios from 'axios';
import type { Pokemon, PokemonPage } from './models';

export interface PokemonsRepository {
    fetchPokemon(name: string): Promise<Pokemon>;

    fetchPage(limit: number, offset: number): Promise<PokemonPage>;
}

export class ApiPokemonRepository extends Repository implements PokemonsRepository {
    async fetchPokemon(name: string): Promise<Pokemon> {
        const pokemonResponse: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
