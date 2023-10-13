import React, { useEffect, useState } from 'react';
import PokemonListItem from '../components/PokemonListItem';
import { useRootProvider } from '../../../globals/contexts/root/useRootProvider';
import { useNotifications } from '../../../globals/contexts/notifications/useNotifications';
import { observer } from 'mobx-react-lite';
import { PokemonsViewController } from '../PokemonsViewController';
import PokemonDetails from '../components/PokemonDetails';

export const PokemonView = observer((): JSX.Element => {
    const pokemonsProvider = useRootProvider('pokemons');
    const notifications = useNotifications();

    const [controller] = useState(
        () => new PokemonsViewController(pokemonsProvider, (e: string) => notifications.setNotification('error', e)),
    );

    useEffect(() => {
        pokemonsProvider.interactor.fetchPage(1);
    }, []);

    const page = controller.state.page;
    return (
        <>
            <PokemonDetails details={pokemonsProvider.selector.detailsByName(controller.state.pokemonSelected ?? '')} />
            {pokemonsProvider.selector.listByPage(page).map(pokemon => (
                <PokemonListItem
                    key={pokemon.name}
                    isSelected={pokemon.name === controller.state.pokemonSelected}
                    selectPokemon={controller.selectPokemon.bind(controller)}
                    pokemonInfo={pokemon}
                />
            ))}
            <button style={{ marginTop: '24px' }} onClick={() => controller.changePage('prev')}>
                prev
            </button>
            <p>{page}</p>
            <button onClick={() => controller.changePage('next')}>next</button>
        </>
    );
});
