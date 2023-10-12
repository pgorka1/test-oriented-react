import { Service } from '../models/Service';
import type { PokemonsRepository } from './repository';
import { PokemonsSelectorImpl, PokemonsSelector, PokemonsStore } from '../PokemonsSelector';
import type { PokemonsInteractor } from '../PokemonsInteractor';
import { PokemonsInteractorImpl } from '../PokemonsInteractor';

export interface Provider<S, I> {
    get selector(): S;

    get interactor(): I;
}

export class PokemonsProvider<R extends PokemonsRepository = PokemonsRepository, S extends PokemonsStore = PokemonsStore>
    extends Service<R, S>
    implements Provider<PokemonsSelector, PokemonsInteractor>
{
    constructor(pokemonsRepository: R, pokemonsStore: S) {
        // TODO: change to super(pokemonsSelector, pokemonsinteractor)
        super(pokemonsRepository, pokemonsStore);
        this.pokemonsSelector = new PokemonsSelectorImpl(pokemonsStore);
        this.pokemonsInteractor = new PokemonsInteractorImpl(pokemonsRepository, pokemonsStore);
    }

    private readonly pokemonsSelector: PokemonsSelector;
    private readonly pokemonsInteractor: PokemonsInteractor;

    get interactor(): PokemonsInteractor {
        return this.pokemonsInteractor;
    }

    get selector(): PokemonsSelector {
        return this.pokemonsSelector;
    }
}
