/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreditCardLoading from '../credit-card-loading';

describe( '<CreditCardLoading>', () => {
	test( 'testing', () => {
		const initialState = {};
		const mockStore = configureStore();
		const store = mockStore( initialState );

		render(
			<Provider store={ store }>
				<CreditCardLoading />
			</Provider>
		);

		expect( document.body ).toMatchSnapshot();
	} );
} );
