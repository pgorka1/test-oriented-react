import type { PokemonResult } from '../../../globals/domains/pokemons';

interface Props {
    isSelected: boolean;
    pokemonInfo: PokemonResult;
    selectPokemon(name: string): void;
}
const PokemonListItem = (props: Props): JSX.Element => {
    return (
        <div
            onClick={() => props.selectPokemon(props.pokemonInfo.name)}
            style={{
                height: '50px',
                width: '450px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                marginBottom: '4px',
                padding: '8px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                background: props.isSelected ? '#9a9a9a' : '#fff',
            }}
        >
            Pokemon: {props.pokemonInfo.name}, {props.pokemonInfo.url}
        </div>
    );
};

export default PokemonListItem;
