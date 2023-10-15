import { InMemoryStore } from '../../globals/mocks/store';
import {
    MockPokemonsRepository,
    SuccessMockPokemonsRepository,
} from '../../globals/domains/pokemons/mocks/successRepository';
import type { PokemonsStoreState } from '../../globals/domains/pokemons';
import { PokemonsProvider } from '../../globals/domains/pokemons';
import { PokemonsViewController } from './PokemonsViewController';
import { fakePokemonResultsFactory } from '../../globals/domains/pokemons/mocks/pokemonResults';

const mockFailureCb = jest.fn();

describe('PokemonsViewController', function() {
    describe('viewState', function() {
        it('viewState is reflected correctly', function() {
            const mockRepository = new SuccessMockPokemonsRepository();
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const pokemonsProvider = new PokemonsProvider(mockRepository, mockStore);
            const pokemonsViewController = new PokemonsViewController(pokemonsProvider, mockFailureCb);
            expect(pokemonsViewController.state).toStrictEqual({
                page: 1,
                pokemonSelected: null,
            });
        });
    });
    describe('changePage', function() {
        it('does not change page when triggering prev and on first page', async function() {
            const mockRepository = new SuccessMockPokemonsRepository();
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const pokemonsProvider = new PokemonsProvider(mockRepository, mockStore);
            const pokemonsViewController = new PokemonsViewController(pokemonsProvider, mockFailureCb);
            await pokemonsViewController.changePage('prev');
            expect(pokemonsViewController.state).toStrictEqual({
                page: 1,
                pokemonSelected: null,
            });
        });

        it('changes page correctly', async function() {
            const mockRepository = new SuccessMockPokemonsRepository();
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const pokemonsProvider = new PokemonsProvider(mockRepository, mockStore);
            const pokemonsViewController = new PokemonsViewController(pokemonsProvider, mockFailureCb);
            await pokemonsViewController.changePage('next');
            expect(pokemonsViewController.state).toStrictEqual({
                page: 2,
                pokemonSelected: null,
            });
        });

        it('handles api error', async function() {
            const mockRepository = new SuccessMockPokemonsRepository();
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const pokemonsProvider = new PokemonsProvider(mockRepository, mockStore);
            const pokemonsViewController = new PokemonsViewController(pokemonsProvider, mockFailureCb);
            await pokemonsViewController.changePage('next');
            expect(pokemonsViewController.state).toStrictEqual({
                page: 2,
                pokemonSelected: null,
            });
        });
    });

    describe('selectPokemon', function() {
        it('selects pokemon correctly', async function() {
            const mockRepository = new SuccessMockPokemonsRepository();
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: fakePokemonResultsFactory(3, 0),
                details: {
                    '0': {
                        id: 0,
                        height: 100,
                        weight: 100,
                        base_experience: 'low',
                    },
                },
            });
            const pokemonsProvider = new PokemonsProvider(mockRepository, mockStore);
            const pokemonsViewController = new PokemonsViewController(pokemonsProvider, mockFailureCb);
            await pokemonsViewController.selectPokemon('0');
            expect(pokemonsViewController.state).toStrictEqual(
                {
                    'page': 1,
                    'pokemonSelected': '0',
                },
            );
        });

    });
});
