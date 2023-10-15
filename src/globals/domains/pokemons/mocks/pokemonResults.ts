import type { PokemonResult } from '../models';

export const fakePokemonResultsFactory = (limit: number, offset: number): PokemonResult[] => {
    return [...Array(limit).keys()].map((num): PokemonResult => {
        const id = `${num + offset}`;
        return {
            name: id,
            url: `url/${id}`,
        };
    });
};
