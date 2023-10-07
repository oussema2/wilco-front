import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import PilotProfile from '../../../screens/PilotProfile/PilotProfile';
import * as usePilotProfileWireframe from '../../../wireframes/usePilotProfileWireframe';
import PilotFactory from '../../factories/PilotFactory';
import PostFlightPresenterBuilder from '../../../presenters/Builders/PostFlightPresenterBuilder';
import PostFlightFactory from '../../factories/PostFlightFactory';

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'PilotProfile', () => {
	let screen;
	const pilotId = 1;
	const route = { params: { pilotId } };
	const backButtonWasPressed = jest.fn();
	const editProfileButtonWasPressed = jest.fn();
	const navigationBarTitle = 'navigation bar title';
	const pilot = PilotFactory.build();

	const setUp = ( view = {}, isRefreshing = false ) => {
		mockUseView(
			usePilotProfileWireframe,
			{
				navigationBarTitle,
				pilot,
				backButtonWasPressed,
				editProfileButtonWasPressed,
				hasBasicInfo: true,
				hasLatestFlights: true,
				hasAnyCredential: false,
				certificates: pilot.certificates,
				ratings: pilot.ratings,
				latestFlightsPresenters: [ ],
				isRefreshing,
				...view
			}
		);

		screen = render( <PilotProfile route={route} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the PilotProfile screen correctly', () => {
		expect( screen.getByTestId( 'pilotProfile-screen' ) ).toBeDefined();
		expect( screen.getByTestId( 'recentFlights-title' ) ).toBeDefined();
		expect( screen.getByText( navigationBarTitle ) ).toBeDefined();
		expect( screen.getByText( 'Edit profile' ) ).toBeDefined();
		expect( screen.getByText( 'Recent Flights' ) ).toBeDefined();
	} );

	it( 'displays the profile\'s basic info', () => {
		expect( screen.getByText( pilot.name ) ).toBeDefined();
		expect( screen.getByText( pilot.description ) ).toBeDefined();
		expect( screen.getByText( pilot.homeAirport ) ).toBeDefined();
		expect( screen.getByText( pilot.primaryAircraft.makeAndModel ) ).toBeDefined();
	} );

	describe( 'when the profile is missing basic info', () => {
		const noBasicInfoText = 'no basic info';

		beforeEach( () => {
			setUp( { hasBasicInfo: false, noBasicInfoText } );
		} );

		it( 'displays the no basic info text', () => {
			expect( screen.getByText( pilot.name ) ).toBeDefined();
			expect( screen.getByText( noBasicInfoText ) ).toBeDefined();
		} );
	} );

	describe( 'with latest flights', () => {
		const postFlight = PostFlightFactory.build();
		const presenter = PostFlightPresenterBuilder.build( {
			postFlight
		} );

		beforeEach( () => {
			setUp( { latestFlightsPresenters: [ presenter ] } );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'recentFlights-flatList' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'recentFlightItem-component' ) ).not.toBeNull();
			expect( setUp.latestFlightsPresenters ).not.toBeNull();
			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'without latest flights', () => {
		beforeEach( () => {
			setUp( { latestFlightsPresenters: [ ] } );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'recentFlights-flatList' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'recentFlightItem-component' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'with credentials', () => {
		beforeEach( () => {
			setUp( {
				certificates: [ pilot.certificates ],
				ratings: [ pilot.ratings ],
				hasAnyCredential: true
			} );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.getByTestId( 'credentials-component' ) ).toBeDefined();
			expect( screen.getByTestId( 'credentials-title' ) ).not.toBeNull();
			expect( screen.getByText( 'Credentials' ) ).toBeDefined();
			expect( screen.queryByTestId( 'empty-state-credentials-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'credentials-data-testID' ) ).not.toBeNull();
			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'without credentials', () => {
		beforeEach( () => {
			setUp( { certificates: [ ], ratings: [ ], hasAnyCredential: false } );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.getByTestId( 'credentials-component' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'credentials-title' ) ).not.toBeNull();
			expect( screen.getByText( 'Credentials' ) ).toBeDefined();
			expect( screen.queryByTestId( 'empty-state-credentials-testID' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'credentials-data-testID' ) ).toBeNull();
			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'with communities', () => {
		beforeEach( () => {
			setUp( {
				communityTags: [ pilot.communityTags ],
				hasCommunityTags: true
			} );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.getByTestId( 'communities-component' ) ).toBeDefined();
			expect( screen.getByTestId( 'communities-title' ) ).not.toBeNull();
			expect( screen.getByText( 'Communities' ) ).toBeDefined();
			expect( screen.queryByTestId( 'empty-state-communities-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'communities-data-testID' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'without communities', () => {
		beforeEach( () => {
			setUp( { communityTags: [ ], hasCommunityTags: false } );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.getByTestId( 'communities-component' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'communities-title' ) ).not.toBeNull();
			expect( screen.getByText( 'Communities' ) ).toBeDefined();
			expect( screen.queryByTestId( 'empty-state-communities-testID' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'communities-data-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'with total hours', () => {
		beforeEach( () => {
			setUp( { totalHours: '11 hours', hasTotalHours: true } );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.getByTestId( 'total-hours-component' ) ).toBeDefined();
			expect( screen.getByTestId( 'total-hours-title' ) ).not.toBeNull();
			expect( screen.getByText( 'Total Hours' ) ).toBeDefined();
			expect( screen.queryByTestId( 'empty-state-total-hours-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'total-hours-data-testID' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'without total hours', () => {
		beforeEach( () => {
			setUp( { totalHours: '', hasTotalHours: false } );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.queryByTestId( 'pilotProfile-screen' ) ).not.toBeNull();
			expect( screen.getByTestId( 'total-hours-component' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'total-hours-title' ) ).not.toBeNull();
			expect( screen.getByText( 'Total Hours' ) ).toBeDefined();
			expect( screen.queryByTestId( 'empty-state-total-hours-testID' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'total-hours-data-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'when the app is refreshing', () => {
		beforeEach( () => {
			setUp( {
				isRefreshing: true
			} );
		} );

		it( 'renders the PilotProfile screen correctly', () => {
			expect( screen.getByTestId( 'pilotProfile-screen' ) ).toBeDefined();
			expect( screen.getByTestId( 'recentFlights-title' ) ).toBeDefined();
			expect( screen.getByText( navigationBarTitle ) ).toBeDefined();
			expect( screen.getByText( 'Edit profile' ) ).toBeDefined();
			expect( screen.getByText( 'Recent Flights' ) ).toBeDefined();

			expect( screen ).toMatchSnapshot();
		} );
	} );
} );
