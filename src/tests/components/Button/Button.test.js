import * as React from 'react';
import { render } from '@testing-library/react-native';
import { plus } from '../../../assets/icons';
import { Button } from '../../../components/Button';

describe( 'Button', () => {
	describe( 'with the default props', () => {
		it( 'renders the Button component correctly', async () => {
			const component = render( <Button /> );
			expect( component.queryByTestId( 'button' ) ).not.toBeNull();
			expect( component.getByRole( 'button' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the size is small', () => {
		it( 'renders the small button', async () => {
			const component = render( <Button size="small" /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the size is medium', () => {
		it( 'renders the medium button', async () => {
			const component = render( <Button size="medium" /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the size is big', () => {
		it( 'renders the big button', async () => {
			const component = render( <Button size="big" /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the size is custom', () => {
		it( 'renders the button', async () => {
			const component = render( <Button size="custom" /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with button styles', () => {
		it( 'renders the button correctly', async () => {
			const buttonStyle = {
				borderRadius: 2,
				backgroundColor: 'black',
				height: 10,
				width: 10
			};
			const component = render( <Button buttonStyle={buttonStyle} /> );
			expect( component ).toMatchSnapshot();
		} );

		describe( 'with an icon', () => {
			it( 'renders the icon correctly', async () => {
				const buttonStyle = {
					iconStyle: {
						source: plus,
						tintColor: 'red'
					}
				};
				const component = render( <Button buttonStyle={buttonStyle} /> );
				expect( component.queryAllByTestId( 'icon' ) ).not.toBeNull();
				expect( component ).toMatchSnapshot();
			} );
		} );
	} );
} );
