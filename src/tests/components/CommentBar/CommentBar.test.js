import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CommentBar } from '../../../components/CommentBar';

describe( '<CommentBar />', () => {
	let component;
	const testID = 'testing-CommentBar-Component';
	const onReplyPressed = jest.fn();

	const setUp = () => {
		component = render( <CommentBar testID={testID} onReplyPressed={onReplyPressed} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the CommentBar component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( 'comment-Input' ) ).toBeDefined();
			expect( component.queryByTestId( 'reply-TextButton' ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when reply button is pressed', () => {
		it( 'calls onPress', () => {
			const replyButton = component.queryByTestId( 'reply-TextButton' );
			fireEvent.press( replyButton );
			expect( onReplyPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
