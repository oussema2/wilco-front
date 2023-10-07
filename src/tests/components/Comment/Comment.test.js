import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Comment } from '../../../components/Comment';

describe( '<Comment />', () => {
	let component;
	const testID = 'testing-comment-Component';
	const text = 'A comment text';
	const commentPilotWasPressed = jest.fn();
	const commentWasPressed = jest.fn();
	const pilotProfilePictureThumbnailSource = jest.fn();
	const commentPresenter = {
		text,
		commentPilotWasPressed,
		pilotProfilePictureThumbnailSource
	};

	const setUp = ( isPreviewComment ) => {
		component = render( <Comment
			testID={testID}
			commentPresenter={commentPresenter}
			commentWasPressed={commentWasPressed}
			isPreviewComment={isPreviewComment}
		/> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the Comment component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'pilotsInfo-HeaderView' ) ).toBeDefined();
			expect( component.queryByTestId( 'image' ) ).toBeDefined();
			expect( component.queryByTestId( 'text-Text' ) ).toHaveTextContent( text );
			expect( text ).toBeDefined( );

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the avatar is pressed', () => {
		it( 'calls the presenter\'s commentPilotWasPressed callback', () => {
			fireEvent.press( component.getByTestId( 'userAvatar-image' ) );
			expect( commentPilotWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the pilot name is pressed', () => {
		it( 'calls the presenter\'s commentPilotWasPressed callback', () => {
			fireEvent.press( component.getByTestId( 'pilotName-text' ) );
			expect( commentPilotWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the comment is a preview', () => {
		beforeEach( () => {
			jest.clearAllMocks();
			setUp( true );
		} );

		it( 'renders the Comment component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );

		it( 'calls the commentWasPressed callback', () => {
			fireEvent.press( component.getByTestId( 'comment-testID' ) );
			expect( commentWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
