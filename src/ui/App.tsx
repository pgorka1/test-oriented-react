import React from 'react';
import { PokemonView } from './pokemons/views/PokemonView';
import { RootServicesProvider } from '../globals/RootServicesProvider';
import { NotificationsProvider } from '../globals/NotificationsProvider';

function App() {
    return (
        <NotificationsProvider>
            {/*TODO: change name*/}
            <RootServicesProvider>
                <PokemonView />
            </RootServicesProvider>
        </NotificationsProvider>
    );
}

export default App;
