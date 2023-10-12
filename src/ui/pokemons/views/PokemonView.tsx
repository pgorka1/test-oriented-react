import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useRootProvider } from '../../../globals/useRootProvider';
import { PokemonViewService } from '../PokemonViewService';
import { useNotifications } from '../../../globals/useNotifications';
import { observer } from 'mobx-react-lite';

export const PokemonView = observer((): JSX.Element => {
    const pokemonsProvider = useRootProvider('pokemons');
    const notifications = useNotifications();

    const [pokemonViewService] = useState(
        () => new PokemonViewService(pokemonsProvider, (e: string) => notifications.setNotification('error', e)),
    );


    useEffect(() => {
            pokemonViewService.fetchPage(1);
    }, []);

    return (
        <>
            {pokemonsProvider.selector.all.map(pokemon => (
                <PokemonCard name={pokemon.name ?? 'unknown'} url={pokemon.url ?? 0} />
            ))}
            <button
                style={{ marginTop: '24px' }}
                onClick={() => pokemonViewService.changePage('prev')}
            >
                prev
            </button>
            <p>{pokemonViewService.page}</p>
            <button onClick={() => pokemonViewService.changePage('next')}>next</button>
        </>
    );
});

// to consider
// the logic with -1 and +1 can be extracted to service
