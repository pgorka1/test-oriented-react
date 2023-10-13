import React, { createContext } from 'react';
import { PokemonsProvider, ApiPokemonRepository, MobxStore } from '../../domains/pokemons';
import type { GlobalStore } from '../../models';
import type { PokemonsStoreState } from '../../domains/pokemons';
import { pokemonsStateFactory } from '../../factories/pokemonsStateFactory';

export const ServicesContext = createContext<GlobalStore | null>(null);

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const globalServicesFactory = (): GlobalStore => ({
    pokemons: new PokemonsProvider(
        new ApiPokemonRepository(),
        new MobxStore<PokemonsStoreState>(pokemonsStateFactory()),
    ),
});

export function RootSourcesProvider(props: Props): JSX.Element {
    return <ServicesContext.Provider value={globalServicesFactory()}>{props.children}</ServicesContext.Provider>;
}
