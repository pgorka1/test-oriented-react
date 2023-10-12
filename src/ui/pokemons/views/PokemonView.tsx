import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useRootProvider } from '../../../globals/contexts/root/useRootProvider';
import { useNotifications } from '../../../globals/contexts/notifications/useNotifications';
import { observer } from 'mobx-react-lite';
import { PokemonsViewController } from '../PokemonsViewController';

export const PokemonView = observer((): JSX.Element => {
    const pokemonsProvider = useRootProvider('pokemons');
    const notifications = useNotifications();

    const [controller] = useState(
        () => new PokemonsViewController(pokemonsProvider, (e: string) => notifications.setNotification('error', e)),
    );

    useEffect(() => {
        controller.fetchPage(1);
    }, []);

    const page = controller.state.page;
    return (
        <>
            {pokemonsProvider.selector.byPage(page).map(pokemon => (
                <PokemonCard name={pokemon.name ?? 'unknown'} url={pokemon.url ?? 0} />
            ))}
            <button style={{ marginTop: '24px' }} onClick={() => controller.changePage('prev')}>
                prev
            </button>
            <p>{page}</p>
            <button onClick={() => controller.changePage('next')}>next</button>
        </>
    );
});
