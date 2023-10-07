import * as React from 'react';
import { render } from '@testing-library/react-native';
import Preferences from '../../../screens/Preferences/Preferences';
import mockUseView from '../../mocks/mockUseView';
import * as usePreferencesWireframe from '../../../wireframes/usePreferencesWireframe';

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn(),
	useFocusEffect: () => jest.fn()
} ) );

describe( 'Preferences', () => {
	let screen;
	const headerTitleText = 'My preferences';
	const subHeaderText = 'Sub header text';
	const otherAirportsTitleText = 'Other Airports';

	const preferredAirportsPresenter = { preferredAirportsHaveChanged: false, preferredAirports: [] };

	const setUp = ( view = {} ) => {
		mockUseView(
			usePreferencesWireframe,
			{
				headerTitleText,
				subHeaderText,
				preferredAirportsPresenter,
				...view
			}
		);

		screen = render( <Preferences /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the Preferences screen correctly', () => {
		expect( screen.queryByTestId( 'preferences-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'preferences-navigation-bar-testID' ) ).toHaveTextContent( headerTitleText );
		expect( screen.queryByTestId( 'sub-header-testID' ) ).toHaveTextContent( subHeaderText );
		expect( screen.queryByTestId( 'other-airports-title-testID' ) ).toHaveTextContent( otherAirportsTitleText );
		expect( screen.queryByTestId( 'airport-input-testID' ) ).not.toBeNull();
	} );
} );
