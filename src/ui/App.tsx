import React from 'react';
import { PokemonView } from './pokemons/views/PokemonView';
import { RootSourcesProvider } from '../globals/contexts/root/RootSourcesProvider';
import { NotificationsProvider } from '../globals/contexts/notifications/NotificationsProvider';

function App() {
    return (
        <NotificationsProvider>
            {/*TODO: change name*/}
            <RootSourcesProvider>
                <PokemonView />
            </RootSourcesProvider>
        </NotificationsProvider>
    );
}

export default App;
