import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { EditAvatar } from '../../../components/EditAvatar';
import GalleryHandlerService from '../../../services/GalleryHandlerService';

describe( '<EditAvatar />', () => {
	let component;
	const testID = 'edit-avatar-component-testID';
	const buttonTestID = 'edit-avatar-button-testID';
	const imageTestID = 'edit-avatar-image-testID';
	const onAvatarChange = jest.fn();

	const setUp = ( props ) => {
		component = render( <EditAvatar
			testID={testID}
			onAvatarChange={onAvatarChange}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the EditAvatar component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the variant is "aircraft', () => {
		describe( 'when no source is provided', () => {
			it( 'renders the button with text "Add aircraft photo"', () => {
				setUp( { variant: 'aircraft' } );
				expect( component.queryByText( 'Add aircraft photo' ) ).toBeDefined();
				expect( component ).toMatchSnapshot();
			} );
		} );

		describe( 'when a source is provided', () => {
			it( 'renders the provided image source and the button with text "Change aircraft photo"', () => {
				setUp( { variant: 'aircraft', source: { uri: 'sample_uri' } } );
				expect( component.queryByText( 'Change aircraft photo' ) ).toBeDefined();
				expect( component ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when the variant is "user"', () => {
		describe( 'when no source is provided', () => {
			it( 'renders the button with text "Add profile photo"', () => {
				setUp( { variant: 'user' } );
				expect( component.queryByText( 'Add profile photo' ) ).toBeDefined();
				expect( component ).toMatchSnapshot();
			} );
		} );

		describe( 'when a source is provided', () => {
			it( 'renders the provided image source and the button with text "Change profile photo"', () => {
				setUp( { variant: 'user', source: { uri: 'sample_uri' } } );
				expect( component.queryByText( 'Change profile photo' ) ).toBeDefined();
				expect( component ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when user press the button', () => {
		it( 'calls to handleGalleryPermission', async () => {
			const galleryHandlerService = GalleryHandlerService.shared();
			const handleGalleryPermissionSpy = jest.spyOn( galleryHandlerService, 'handleGalleryPermission' );

			fireEvent.press( component.queryByTestId( buttonTestID ) );
			expect( handleGalleryPermissionSpy ).toHaveBeenCalled();
		} );
	} );

	describe( 'when user press the avatar', () => {
		it( 'calls to handleGalleryPermission', async () => {
			const galleryHandlerService = GalleryHandlerService.shared();
			const handleGalleryPermissionSpy = jest.spyOn( galleryHandlerService, 'handleGalleryPermission' );

			fireEvent.press( component.queryByTestId( imageTestID ) );
			expect( handleGalleryPermissionSpy ).toHaveBeenCalled();
		} );
	} );
} );
