import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { RemovableImage } from '../../../components/RemovableImage';
import { home } from '../../../assets/icons';

describe( 'RemovableImage', () => {
	const defaultImage = home;
	const removeOnPress = jest.fn();

	describe( 'with the default props', () => {
		it( 'renders the RemovableImage component correctly', async () => {
			const { component, queryByTestId } = render(
				<RemovableImage source={defaultImage} removeOnPress={removeOnPress} />
			);
			expect( queryByTestId( 'image' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the remove button is pressed', () => {
		it( 'calls removeOnPress', () => {
			const { queryByTestId } = render(
				<RemovableImage source={defaultImage} removeOnPress={removeOnPress} />
			);
			fireEvent.press( queryByTestId( 'removeImageButton' ) );
			expect( removeOnPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
