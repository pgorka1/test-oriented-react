import type { Pokemon } from '../../../globals/domains/pokemons';

interface Props {
    details: Pokemon | null;
}

interface DetailsProps {
    children: JSX.Element | JSX.Element[];
}

const Details = (props: DetailsProps): JSX.Element => {
    return (
        <div
            style={{
                height: '100px',
                width: '450px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid black',
                marginBottom: '32px',
                padding: '16px',
                boxSizing: 'border-box',
            }}
        >
            {props.children}
        </div>
    );
};

const PokemonDetails = (props: Props): JSX.Element => {
    if (!props.details) {
        return (
            <Details>
                <span>No details available</span>
            </Details>
        );
    }
    return (
        <Details>
            <span>height: {props.details.height}</span>
            <span>weight: {props.details.weight}</span>
            <span>id: {props.details.id}</span>
            <span>base_experience: {props.details.base_experience}</span>
        </Details>
    );
};

export default PokemonDetails;
