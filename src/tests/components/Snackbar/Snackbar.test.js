import React from 'react';
import { act, render } from '@testing-library/react-native';
import { Snackbar } from '../../../components/Snackbar';
import mockUseSnackbarService from '../../mocks/mockUseSnackbarService';
import SnackbarService from '../../../services/SnackbarService';

describe( '<Snackbar />', () => {
	let component;
	const snackbarService = new SnackbarService();
	const message = 'A message';
	const config = { message };

	const setUp = () => {
		component = render( <Snackbar /> );
	};

	const showSnackbar = () => {
		act( () => {
			snackbarService.showInfo( config );
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		mockUseSnackbarService( { service: snackbarService } );
		setUp();
	} );

	describe( 'when the snackbar is not visible', () => {
		it( 'renders the Snackbar as not visible', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the snackbar is visible', () => {
		it( 'renders the Snackbar as info', () => {
			showSnackbar();
			expect( component.queryByText( message ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when is a success message', () => {
		it( 'renders the Snackbar as success', () => {
			act( () => {
				snackbarService.showSuccess( config );
			} );
			expect( component.queryByText( message ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when is an error message', () => {
		it( 'renders the Snackbar as error', () => {
			act( () => {
				snackbarService.showSuccess( config );
			} );
			expect( component.queryByText( message ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
