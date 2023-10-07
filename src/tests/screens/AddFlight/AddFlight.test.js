import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useAddFlightWireframe from '../../../wireframes/useAddFlightWireframe';
import { FLIGHT } from '../../../constants/formFields/postForm';
import Form from '../../../forms/Form';
import fields from '../../../forms/postFields';
import AircraftFactory from '../../factories/AircraftFactory';
import AddFlight from '../../../screens/AddFlight/AddFlight';

describe( 'AddFlight', () => {
	let screen;
	const title = 'Share a flight';
	const aircraftSectionTitle = 'Aircraft Detail - Choose an aircraft';
	const addAircraftButtonText = 'Add an aircraft';
	const addAircraftButtonWasPressed = jest.fn();
	const isPostButtonDisabled = false;
	const selectableAircrafts = AircraftFactory.buildList( 2 );
	const selectedAircraftID = selectableAircrafts[ 0 ].id;
	const onAircraftSelected = jest.fn();
	const shouldShowFlightForm = false;
	const shouldShowAircraftFlights = false;
	const aircraftFlights = [];
	const shouldShowTrackSwitch = true;
	const shouldShowTrack = false;
	const toggleShowTrack = jest.fn();
	const trackSource = { uri: 'source' };
	const form = new Form( { fields } );
	const flightFormPresenter = {
		form: form.$( FLIGHT )
	};
	const route = { params: { previousScreen: '' } };

	const setUp = ( view = {}, props ) => {
		mockUseView(
			useAddFlightWireframe,
			{
				form,
				addAircraftButtonWasPressed,
				isPostButtonDisabled,
				selectableAircrafts,
				selectedAircraftID,
				onAircraftSelected,
				shouldShowFlightForm,
				flightFormPresenter,
				shouldShowAircraftFlights,
				aircraftFlights,
				shouldShowTrackSwitch,
				shouldShowTrack,
				toggleShowTrack,
				trackSource,
				...view
			} );

		screen = render( <AddFlight route={route} {...props} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the CreatePost screen correctly', () => {
		expect( screen.getByText( title ) ).toBeDefined();
		expect( screen.getByText( aircraftSectionTitle ) ).toBeDefined();
		expect( screen.getByText( addAircraftButtonText ) ).toBeDefined();
	} );

	describe( 'when there is not a new aircraft', () => {
		it( 'does not autoselect any aircraft', () => {
			setUp( );
			expect( onAircraftSelected ).not.toHaveBeenCalled();
		} );
	} );

	describe( 'when there is a new aircraft', () => {
		const newAircraftId = 7;

		it( 'autoselects the new aircraft', () => {
			setUp( {}, { route: { params: { newAircraftId } } } );
			expect( onAircraftSelected ).toHaveBeenCalledWith( newAircraftId );
		} );
	} );

	describe( 'when the add flight button is disabled', () => {
		it( 'renders the button as disabled', () => {
			setUp( { isPostButtonDisabled: true } );
			expect( screen.queryByTestId( 'add-flight-button' ) ).toBeDisabled();
		} );
	} );
} );
