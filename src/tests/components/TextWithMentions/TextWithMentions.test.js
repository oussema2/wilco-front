import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TextWithMentions from '../../../components/TextWithMentions/TextWithMentions';

describe( '<TextWithMentions />', () => {
	let component;
	const testID = 'testing-MentionInput-Component';
	const mockOnPressMention = jest.fn();
	const mockOnPressHashtag = jest.fn();
	const setUp = ( props ) => {
		component = render( <TextWithMentions
			testID={testID}
			onMentionPress={mockOnPressMention}
			onHashtagPress={mockOnPressHashtag}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the TextWithMentions component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with no default props', () => {
		describe( 'when value has a mention', () => {
			const expectedText = '@David';

			beforeEach( () => {
				setUp( { value: 'hi @[David](1)' } );
			} );

			it( 'renders the TextWithMentions component correctly', () => {
				expect( component.queryByTestId( '1-@' ) ).toBeDefined();
				expect( component.queryByTestId( '1-@' ) ).toHaveTextContent( expectedText );
				expect( component.queryByTestId( testID ) ).toHaveTextContent( expectedText );
			} );

			describe( 'when a mention is pressed', () => {
				it( 'calls to onPress callback', () => {
					fireEvent.press( component.getByText( expectedText ) );
					expect( mockOnPressMention ).toHaveBeenCalledTimes( 1 );
				} );
			} );
		} );

		describe( 'when value has a airport', () => {
			it( 'renders the TextWithMentions component correctly', () => {
				setUp( { value: 'hi +EZE' } );
				const expectedText = 'EZE';
				expect( component.queryByTestId( '+EZE' ) ).toBeDefined();
				expect( component.queryByTestId( '+EZE' ) ).toHaveTextContent( expectedText );
				expect( component.queryByTestId( testID ) ).toHaveTextContent( expectedText );
			} );
		} );

		describe( 'when value has a hashtag', () => {
			const testHashtagPartType = ( { expectedText, customTestID, trigger = '#' } ) => {
				it( 'renders the TextWithMentions component correctly', () => {
					expect( component.queryByTestId( customTestID ) ).toBeDefined();
					expect( component.queryByTestId( customTestID ) ).toHaveTextContent( `${trigger}${expectedText}` );
				} );

				describe( 'when a hashtag is pressed', () => {
					it( 'calls to onPress callback', () => {
						fireEvent.press( component.queryByTestId( customTestID ) );
						expect( mockOnPressHashtag ).toHaveBeenCalledWith( expectedText );
					} );
				} );
			};

			beforeEach( () => {
				setUp( { value: 'hello #barcelona #[madrid](5)' } );
			} );

			describe( 'with a default hashtag', () => {
				const expectedText = 'barcelona';
				const customTestID = '#barcelona';
				testHashtagPartType( { expectedText, customTestID } );
			} );

			describe( 'with a triggered hashtag', () => {
				const expectedText = 'madrid';
				const customTestID = '3-#';
				testHashtagPartType( { expectedText, customTestID } );
			} );
		} );
	} );
} );
