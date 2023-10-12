import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', function () {
    it('should render App correctly', function () {
        render(<App />);
        expect(screen.getByText('Starter')).toBeInTheDocument();
    });
});
