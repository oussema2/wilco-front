import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { FilterList } from '../../../components/FilterList';

describe( 'FilterList', () => {
	const testID = 'testID';

	describe( 'with default props', () => {
		it( 'renders the FilterList component correctly', () => {
			const component = render(
				<FilterList />
			);

			expect( component.queryByTestId( 'tags-component' ) ).toBeDefined();
		} );
	} );

	describe( 'with custom props', () => {
		it( 'uses the given testID', () => {
			const component = render(
				<FilterList testID={testID} />
			);

			expect( component.queryByTestId( testID ) ).toBeDefined();
		} );

		it( 'uses the given items', () => {
			const removeTagMock = jest.fn();
			const removeHashtagMock = jest.fn();

			const component = render(
				<FilterList
					tags={[ 'filter tag 1', 'filter tag 2' ]}
					hashtags={[ 'hashtag 1', 'hashtag 2' ]}
					onRemoveTagPress={removeTagMock}
					onRemoveHashtagPress={removeHashtagMock}
				/>
			);

			expect( component.queryByTestId( 'item0-tag-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'item1-tag-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'item0-hashtag-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'item1-hashtag-testID' ) ).toBeDefined();

			expect( component.queryByTestId( 'text-item0-tag-testID' ) ).toHaveTextContent( 'filter tag 1' );
			expect( component.queryByTestId( 'text-item1-tag-testID' ) ).toHaveTextContent( 'filter tag 2' );
			expect( component.queryByTestId( 'text-item0-hashtag-testID' ) ).toHaveTextContent( 'hashtag 1' );
			expect( component.queryByTestId( 'text-item1-hashtag-testID' ) ).toHaveTextContent( 'hashtag 2' );

			expect( component.queryByTestId( 'remove-item0-tag-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'remove-item1-tag-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'remove-item0-hashtag-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'remove-item1-hashtag-testID' ) ).toBeDefined();
		} );

		it( 'uses the given onRemove callback', () => {
			const removeTagMock = jest.fn();
			const removeHashtagMock = jest.fn();

			const component = render(
				<FilterList
					tags={[ 'tag 1', 'tag 2' ]}
					hashtags={[ 'hashtag 1', 'hashtag 2' ]}
					onRemoveTagPress={removeTagMock}
					onRemoveHashtagPress={removeHashtagMock}
				/>
			);

			fireEvent.press( component.queryByTestId( 'remove-item0-tag-testID' ) );
			fireEvent.press( component.queryByTestId( 'remove-item1-tag-testID' ) );

			fireEvent.press( component.queryByTestId( 'remove-item0-hashtag-testID' ) );
			fireEvent.press( component.queryByTestId( 'remove-item1-hashtag-testID' ) );

			expect( removeTagMock ).toHaveBeenCalledTimes( 2 );
			expect( removeTagMock ).toHaveBeenCalledWith( 'tag 1' );
			expect( removeTagMock ).toHaveBeenCalledWith( 'tag 2' );

			expect( removeHashtagMock ).toHaveBeenCalledTimes( 2 );
			expect( removeHashtagMock ).toHaveBeenCalledWith( '#hashtag 1' );
			expect( removeHashtagMock ).toHaveBeenCalledWith( '#hashtag 2' );
		} );
	} );
} );
