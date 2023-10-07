import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AddPhotosButton } from '../../../components/AddPhotosButton';
import GalleryHandlerService from '../../../services/GalleryHandlerService';

describe( '<AddPhotosButton />', () => {
	let component;
	const testID = 'add-photos-button-testID';
	const onPhotosSelected = jest.fn();
	const maxPhotosAllowed = 10;

	const setUp = ( props ) => {
		component = render(
			<AddPhotosButton
				testID={testID}
				onPhotosSelected={onPhotosSelected}
				maxPhotosAllowed={maxPhotosAllowed}
				{...props}
			/>
		);
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the AddPhotosButton component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByText( 'Add photo/s' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with custom title', () => {
		it( 'renders the AddPhotosButton component with the given title', () => {
			setUp( { title: 'Custom title' } );
			expect( component.queryByText( 'Custom title' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when user press the button', () => {
		it( 'calls to handleGalleryPermission', async () => {
			const galleryHandlerService = GalleryHandlerService.shared();
			const handleGalleryPermissionSpy = jest.spyOn( galleryHandlerService, 'handleGalleryPermission' );

			fireEvent.press( component.queryByTestId( testID ) );
			expect( handleGalleryPermissionSpy ).toHaveBeenCalled();
		} );
	} );
} );
