import React, { createContext } from 'react';
import { PokemonsProvider, ApiPokemonRepository, MobxStore } from '../../domains/pokemons';
import type { GlobalStore } from '../../models';
import type { PokemonsStoreState } from '../../domains/pokemons';
import { pokemonsStateFactory } from '../../factories/pokemonsStateFactory';

export const ProvidersContext = createContext<GlobalStore | null>(null);

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const globalProvidersFactory = (): GlobalStore => ({
    pokemons: new PokemonsProvider(
        new ApiPokemonRepository(),
        new MobxStore<PokemonsStoreState>(pokemonsStateFactory()),
    ),
});

export function RootSourcesProvider(props: Props): JSX.Element {
    return <ProvidersContext.Provider value={globalProvidersFactory()}>{props.children}</ProvidersContext.Provider>;
}
