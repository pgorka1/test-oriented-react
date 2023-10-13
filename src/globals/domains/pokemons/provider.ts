import type { PokemonsRepository } from './repository';
import { PokemonsSelectorImpl } from './selector';
import type { PokemonsSelector } from './selector';
import { BaseProvider } from '../../models';
import type { PokemonsInteractor } from './interactor';
import { PokemonsInteractorImpl } from './interactor';
import type { Provider } from '../../models';
import type { PokemonsStore } from './models';

export class PokemonsProvider<
        SE extends PokemonsSelector = PokemonsSelector,
        IN extends PokemonsInteractor = PokemonsInteractor,
        R extends PokemonsRepository = PokemonsRepository,
        S extends PokemonsStore = PokemonsStore,
    >
    extends BaseProvider<SE, IN>
    implements Provider<SE, IN>
{
    constructor(pokemonsRepository: R, pokemonsStore: S) {
        // @ts-ignore-next-line (ignoring error about different subtypes constraints)
        super(new PokemonsSelectorImpl(pokemonsStore), new PokemonsInteractorImpl(pokemonsRepository, pokemonsStore));
    }

    get selector(): SE {
        return this.storeSelector;
    }

    get interactor(): IN {
        return this.storeInteractor;
    }
}
