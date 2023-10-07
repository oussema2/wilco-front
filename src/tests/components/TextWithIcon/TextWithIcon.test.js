import React from 'react';
import { render } from '@testing-library/react-native';
import { TextWithIcon } from '../../../components/TextWithIcon';
import { aircraft } from '../../../assets/icons';

describe( '<TextWithIcon />', () => {
	describe( 'with the default props', () => {
		it( 'renders the TextWithIcon component correctly', async () => {
			const component = render( <TextWithIcon icon={aircraft} /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a text', () => {
		it( 'renders the TextWithIcon component correctly', async () => {
			const text = 'label';
			const component = render( <TextWithIcon icon={aircraft}>{text}</TextWithIcon> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a numberOfLines', () => {
		it( 'renders the TextWithIcon component correctly', async () => {
			const component = render( <TextWithIcon
				icon={aircraft}
				numberOfLines={1}
			/>
			);

			expect( component ).toMatchSnapshot();
		} );
	} );
} );
