import React, { createContext } from 'react';
import { PokemonsProvider } from '../../domains/pokemons/provider';
import { ApiPokemonRepository } from '../../domains/pokemons/repository';
import type { GlobalStore } from '../../models/GlobalStore';
import { MobxStore } from '../../domains/pokemons/store';

export const ServicesContext = createContext<GlobalStore | null>(null);

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const globalServicesFactory = (): GlobalStore => ({
    // add factories
    pokemons: new PokemonsProvider(new ApiPokemonRepository(), new MobxStore({ pokemons: [] })),
});

export function RootSourcesProvider(props: Props): JSX.Element {
    return <ServicesContext.Provider value={globalServicesFactory()}>{props.children}</ServicesContext.Provider>;
}
