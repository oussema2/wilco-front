import React from 'react';
import { render } from '@testing-library/react-native';
import { TrackSwitch } from '../../../components/TrackSwitch';
import noop from '../../../helpers/noop';

describe( '<TrackSwitch />', () => {
	let component;

	const setUp = ( props ) => {
		component = render(
			<TrackSwitch
				shouldShowTrack={false}
				toggleShowTrack={noop}
				trackSource={{ uri: 'image-source' }}
				{...props}
			/> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'displays a title and a switch', () => {
		expect( component.getByText( 'Add track' ) ).toBeDefined();
		expect( component.getByRole( 'switch' ) ).toBeDefined();
		expect( component.queryByTestId( 'image' ) ).toBeNull();
	} );

	describe( 'when the track should be shown', () => {
		beforeEach( () => {
			setUp( { shouldShowTrack: true } );
		} );

		it( 'displays it', () => {
			expect( component.getByTestId( 'image' ) ).toBeDefined();
		} );
	} );
} );
