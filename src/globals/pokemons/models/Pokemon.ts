export interface Pokemon {
    name: string;
    base_experience: number;
}

export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonPage {
    count: number;
    next: string | null
    previous: string | null
    results: PokemonResult[]
}
