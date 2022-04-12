/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CVV from '../cvv-image';

describe( '<CVV>', () => {
	test( 'testing', () => {
		const initialState = {};
		const mockStore = configureStore();
		const store = mockStore( initialState );

		render(
			<Provider store={ store }>
				<CVV />
			</Provider>
		);

		expect( document.body ).toMatchSnapshot();
	} );
} );
