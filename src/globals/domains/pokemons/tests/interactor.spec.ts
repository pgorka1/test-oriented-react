import { PokemonsInteractorImpl } from '../interactor';
import { InMemoryStore } from '../../../mocks/store';
import { fakePokemonResultsFactory } from '../mocks/pokemonResults';
import type { PokemonsStoreState } from '../models';
import { SuccessMockPokemonsRepository } from '../mocks/successRepository';

describe('pokemons/interactor', function () {
    describe('fetchPage', function () {
        it('should fetch page', async function () {
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const interactor = new PokemonsInteractorImpl(new SuccessMockPokemonsRepository(), mockStore);
            await interactor.fetchPage(1);
            expect(mockStore.state).toStrictEqual({
                details: {},
                pokemons: [
                    {
                        name: 'first',
                        url: 'fakeurl/1',
                    },
                    {
                        name: 'second',
                        url: 'fakeurl/2',
                    },
                ],
            });
        });

        it("shouldn't fetch page when there is already data fetched", async function () {
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: fakePokemonResultsFactory(5, 10),
                details: {},
            });
            const interactor = new PokemonsInteractorImpl(new SuccessMockPokemonsRepository(), mockStore);
            await interactor.fetchPage(1);

            // using offset to see if data that was fetched previously is not overriden by new one
            expect(mockStore.state.pokemons).toStrictEqual([
                {
                    name: '10',
                    url: 'url/10',
                },
                {
                    name: '11',
                    url: 'url/11',
                },
                {
                    name: '12',
                    url: 'url/12',
                },
                {
                    name: '13',
                    url: 'url/13',
                },
                {
                    name: '14',
                    url: 'url/14',
                },
            ]);
        });
    });

    describe('fetchPokemon', function () {
        it('should fetch and store pokemon when there is no entry available', async function () {
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const interactor = new PokemonsInteractorImpl(new SuccessMockPokemonsRepository(), mockStore);
            await interactor.fetchPokemon('pikachu');
            expect(mockStore.state).toStrictEqual({
                details: {
                    pikachu: {
                        base_experience: '1',
                        height: 100,
                        id: 1,
                        weight: 100,
                    },
                },
                pokemons: [],
            });
        });

        it("shouldn't fetch pokemon when there is already an entry available", async function () {
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {
                    pikachu: {
                        weight: 1,
                        height: 1,
                        id: 101,
                        base_experience: 'high',
                    },
                },
            });
            const interactor = new PokemonsInteractorImpl(new SuccessMockPokemonsRepository(), mockStore);
            await interactor.fetchPokemon('pikachu');

            // the old entry should still exist
            expect(mockStore.state).toStrictEqual({
                details: {
                    pikachu: {
                        weight: 1,
                        height: 1,
                        id: 101,
                        base_experience: 'high',
                    },
                },
                pokemons: [],
            });
        });
    });
});
