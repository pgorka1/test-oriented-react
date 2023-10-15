import { InMemoryStore } from '../../../mocks/store';
import { PokemonsSelectorImpl } from '../selector';
import { fakePokemonResultsFactory } from '../mocks/pokemonResults';
import type { PokemonsStoreState } from '../models';

describe('pokemons/selector', function () {
    describe('listByPage', function () {
        it('should select the data using listByPage', function () {
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: fakePokemonResultsFactory(2, 10),
                details: {},
            });
            const selector = new PokemonsSelectorImpl(mockStore);
            expect(selector.listByPage(1)).toStrictEqual([
                {
                    name: '10',
                    url: 'url/10',
                },
                {
                    name: '11',
                    url: 'url/11',
                },
            ]);
        });
    });
    describe('detailsByName', function () {
        it('should select the data using detailsByName when data exists', function () {
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
            const selector = new PokemonsSelectorImpl(mockStore);
            expect(selector.detailsByName('pikachu')).toStrictEqual({
                base_experience: 'high',
                height: 1,
                id: 101,
                weight: 1,
            });
        });

        it('should return null when pokemon entry does not exist', function () {
            const mockStore = new InMemoryStore<PokemonsStoreState>({
                pokemons: [],
                details: {},
            });
            const selector = new PokemonsSelectorImpl(mockStore);
            expect(selector.detailsByName('pikachu')).toStrictEqual(null);
        });
    });
});
