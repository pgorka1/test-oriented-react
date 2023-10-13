import type { PokemonResult } from './PokemonResult';

export interface PokemonPage {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}
