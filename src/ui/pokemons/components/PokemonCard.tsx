import type { PokemonResult } from '../../../globals/pokemons/models/Pokemon';

type Props = PokemonResult;

const PokemonCard = (props: Props): JSX.Element => {
    return (
        <div
            style={{
                height: '100px',
                width: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            Pokemon Card: {props.name}, {props.url}
        </div>
    );
};

export default PokemonCard;
