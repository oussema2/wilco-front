import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { ActionSheet } from '../../../components/ActionSheet';
import { ActionSheetProvider } from '../../../providers/ActionSheetProvider';
import mockUseActionSheetService from '../../mocks/mockUseActionSheetService';
import ActionSheetService from '../../../services/ActionSheetService';

describe( '< ActionSheet/>', () => {
	let component;
	const mockOnPress = jest.fn();
	const actionSheetService = new ActionSheetService();
	const config = {
		actions: [ {
			title: 'Test Action', destructive: true, onPress: mockOnPress
		} ]
	};

	const setUp = () => {
		component = render( <ActionSheet />, { wrapper: ActionSheetProvider } );
	};

	const openActionSheet = () => {
		act( () => {
			actionSheetService.open( config );
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		mockUseActionSheetService( { service: actionSheetService } );
		setUp();
	} );

	describe( 'when the actionSheet is closed', () => {
		it( 'renders the ActionSheet as not visible', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the actionSheet is open', () => {
		it( 'renders the ActionSheet as visible', () => {
			openActionSheet();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when an action button is pressed', () => {
		it( 'calls on press and closes the action sheet', () => {
			openActionSheet();
			fireEvent.press( component.getByText( 'Test Action' ) );
			expect( mockOnPress ).toHaveBeenCalledTimes( 1 );
			expect( actionSheetService.isOpen ).toBe( false );
		} );
	} );

	describe( 'when the cancel button is pressed', () => {
		it( 'closes the action sheet', () => {
			openActionSheet();
			fireEvent.press( component.getByText( 'Cancel' ) );
			expect( actionSheetService.isOpen ).toBe( false );
		} );
	} );
} );
