import Form from '../../forms/Form';
import PilotFactory from '../factories/PilotFactory';
import FlightFactory from '../factories/FlightFactory';
import AircraftFactory from '../factories/AircraftFactory';
import {
	FLIGHT, FROM, TO, DEPARTURE_TIME, ARRIVAL_TIME
} from '../../constants/formFields/postForm';
import FlightFormPresenter from '../../presenters/FlightFormPresenter';
import FlightToDisplay from '../../entitiesToDisplay/FlightsToDisplay';
import FlightAwareTrackFactory from '../factories/FlightAwareTrackFactory';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import { aircraftOptionsExamples } from '../sharedExamples/aircraftOptions';
import AddFlightPresenter from '../../presenters/AddFlightPresenter';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import {
	DISCARD_CHANGES_CONFIRMATION_MODAL
} from '../../constants/modals';

describe( 'AddFlightPresenter', () => {
	const aircrafts = AircraftFactory.buildList( 3 );
	let flights = FlightFactory.buildList( 3 );
	const currentPilot = PilotFactory.build( { aircrafts } );
	const getCurrentPilotFromStore = { execute: jest.fn() };
	const fetchAircraftFlights = { execute: jest.fn() };
	const getFlightTrack = { execute: jest.fn() };
	const deleteAircraft = { execute: jest.fn() };
	const navigation = {
		goBack: jest.fn(),
		navigate: jest.fn()
	};
	const modalService = { open: jest.fn(), close: jest.fn() };
	const actionSheetService = { open: jest.fn() };
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn() };
	const analyticsService = {
		logNewPost: jest.fn(),
		logDeleteAircraft: jest.fn()
	};
	const makeAutoObservable = jest.fn();
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		getCurrentPilotFromStore.execute.mockReturnValue( currentPilot );
		presenter = new AddFlightPresenter( {
			getCurrentPilotFromStore,
			fetchAircraftFlights,
			getFlightTrack,
			deleteAircraft,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
			expect( presenter.fetchAircraftFlights ).toEqual( fetchAircraftFlights );
			expect( presenter.getFlightTrack ).toEqual( getFlightTrack );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( presenter.form ).toMatchSnapshot();
			expect( presenter.selectedAircraftID ).toBeNull();
			expect( presenter.flightFormPresenter ).toBeInstanceOf( FlightFormPresenter );
			expect( presenter.flightFormPresenter.form ).toEqual( presenter.form.$( FLIGHT ) );
			expect( presenter.selectedFlightID ).toBeNull();
			expect( presenter.shouldShowTrack ).toBe( false );
			expect( presenter.form.$( FLIGHT ).$( FROM ).disabled ).toBe( true );
			expect( presenter.form.$( FLIGHT ).$( TO ).disabled ).toBe( true );
			expect( presenter.form.$( FLIGHT ).$( DEPARTURE_TIME ).disabled ).toBe( true );
			expect( presenter.form.$( FLIGHT ).$( ARRIVAL_TIME ).disabled ).toBe( true );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@selectableAircrafts()', () => {
		it( 'gets the current pilot from store and returns its aircrafts', () => {
			expect( presenter.selectableAircrafts ).toEqual( currentPilot.aircrafts );
		} );
	} );

	describe( '@onAircraftSelected', () => {
		const checkFlightFormDisabledProperty = ( bool ) => {
			expect( presenter.form.$( FLIGHT ).$( FROM ).disabled ).toBe( bool );
			expect( presenter.form.$( FLIGHT ).$( TO ).disabled ).toBe( bool );
			expect( presenter.form.$( FLIGHT ).$( DEPARTURE_TIME ).disabled ).toBe( bool );
			expect( presenter.form.$( FLIGHT ).$( ARRIVAL_TIME ).disabled ).toBe( bool );
		};

		const theFlightFormStaysDisabled = () => {
			// eslint-disable-next-line jest/expect-expect
			it( 'the flight form stays disabled', () => {
				checkFlightFormDisabledProperty( true );
			} );
		};

		const onAircraftSelectedError = () => {
			const mockFetchAircraftFlightsForError = () => {
				aircrafts[ 0 ].flights = [];
				fetchAircraftFlights.execute.mockRejectedValueOnce( new NetworkError() );
			};

			beforeEach( () => {
				aircrafts[ 0 ].flights = [];
				presenter.onAircraftSelected( aircrafts[ 0 ].id );
				mockFetchAircraftFlightsForError();
			} );

			it( 'calls the fetchAircraftFlights', () => {
				expect( presenter.fetchAircraftFlights.execute ).toHaveBeenCalledWith(
					aircrafts[ 0 ]
				);
			} );

			it( 'starts loading', () => {
				expect( presenter.isLoadingFlights ).toBe( true );
			} );

			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onAircraftSelected( aircrafts[ 0 ].id ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: mockFetchAircraftFlightsForError
			} );

			it( 'finishes loading upon completion', async () => {
				await presenter.onAircraftSelected( aircrafts[ 0 ].id );
				expect( presenter.isLoadingFlights ).toBe( false );
			} );
		};

		const checkLoadingValue = () => {
			it( 'starts loading flights', () => {
				expect( presenter.isLoadingFlights ).toBe( true );
			} );

			it( 'finishes loading flights upon completion', async () => {
				await presenter.onAircraftSelected( aircrafts[ 0 ].id );
				expect( presenter.isLoadingFlights ).toBe( false );
			} );
		};

		describe( 'when there was no selected aircraft before', () => {
			describe( '@selectedAircraftID', () => {
				beforeEach( () => presenter.onAircraftSelected( aircrafts[ 0 ].id ) );

				it( 'sets the aircraft with the given ID as selected', () => {
					expect( presenter.selectedAircraftID ).toEqual( aircrafts[ 0 ].id );
				} );

				checkLoadingValue();
			} );

			describe( 'when the aircraft has tail number and no flights', () => {
				beforeEach( () => {
					aircrafts[ 0 ].flights = [];
					presenter.onAircraftSelected( aircrafts[ 0 ].id );
					fetchAircraftFlights.execute.mockImplementationOnce( () => {
						aircrafts[ 0 ].flights = flights;
					} );
				} );

				describe( 'when the request does not fail', () => {
					it( 'calls the fetchAircraftFlights', () => {
						expect( presenter.fetchAircraftFlights.execute ).toHaveBeenCalledWith(
							aircrafts[ 0 ]
						);
					} );

					it( 'sets the flights to the flightListPresenter', () => {
						const flightsToDisplay = flights.map( ( flight ) => new FlightToDisplay( { flight } ) );
						const expectedItems = new Map( flightsToDisplay.map( ( flight ) => [ flight.id, flight ]
						) );
						expect( presenter.flightListPresenter.items ).toEqual( expectedItems );
					} );

					checkLoadingValue();

					theFlightFormStaysDisabled();
				} );

				describe( 'when the request fails', () => {
					onAircraftSelectedError();

					theFlightFormStaysDisabled();
				} );
			} );

			describe( 'when the aircraft has tail number and flights', () => {
				beforeEach( () => {
					aircrafts[ 0 ].flights = flights;
					presenter.onAircraftSelected( aircrafts[ 0 ].id );
				} );

				it( 'doesn\'t call fetchAircraftFlights', () => {
					expect( presenter.fetchAircraftFlights.execute ).not.toHaveBeenCalled();
				} );

				it( 'doesn\'t start loading', () => {
					expect( presenter.isLoadingFlights ).toBe( false );
				} );

				it( 'sets the flights to the flightListPresenter', () => {
					const flightsToDisplay = flights.map( ( flight ) => new FlightToDisplay( { flight } ) );
					const expectedItems = new Map( flightsToDisplay.map( ( flight ) => [ flight.id, flight ]
					) );
					expect( presenter.flightListPresenter.items ).toEqual( expectedItems );
				} );

				theFlightFormStaysDisabled();
			} );

			describe( 'when the aircraft doesn\'t have tail number', () => {
				beforeEach( () => {
					const aircraft = aircrafts[ 0 ];
					aircraft.tailNumber = null;
					presenter.onAircraftSelected( aircraft.id );
				} );

				// eslint-disable-next-line jest/expect-expect
				it( 'enables the flight form', () => {
					checkFlightFormDisabledProperty( false );
				} );
			} );
		} );

		describe( 'when there was a selected aircraft before', () => {
			beforeEach( () => presenter.onAircraftSelected( aircrafts[ 1 ].id ) );

			describe( 'when the given selected aircraft ID is different', () => {
				it( 'sets the aircraft with the given ID as selected', () => {
					presenter.onAircraftSelected( aircrafts[ 0 ].id );
					expect( presenter.selectedAircraftID ).toEqual( aircrafts[ 0 ].id );
				} );
			} );

			describe( 'when the given selected aircraft ID is the same', () => {
				beforeEach( () => presenter.onAircraftSelected( aircrafts[ 1 ].id ) );

				it( 'clears the aircraft selection', () => {
					expect( presenter.selectedAircraftID ).toEqual( null );
				} );

				// eslint-disable-next-line jest/expect-expect
				it( 'disables the flight form', () => {
					checkFlightFormDisabledProperty( true );
				} );
			} );
		} );
	} );

	describe( '@onFlightSelected', () => {
		describe( '@selectedFlightID', () => {
			beforeEach( () => {
				aircrafts[ 0 ].flights = flights;
				presenter.onAircraftSelected( aircrafts[ 0 ].id );
				presenter.onFlightSelected( flights[ 0 ].id );
			} );

			it( 'sets the flight with the given ID as selected', () => {
				expect( presenter.selectedFlightID ).toEqual( flights[ 0 ].id );
			} );
		} );
	} );

	describe( '@shouldShowFlightForm', () => {
		describe( 'when there is no aircraft selected', () => {
			it( 'returns false', () => {
				expect( presenter.shouldShowFlightForm ).toBeFalsy();
			} );
		} );

		describe( 'when the aircraft doesn\'t have tail number', () => {
			it( 'returns true', () => {
				aircrafts[ 2 ].tailNumber = null;
				presenter.onAircraftSelected( aircrafts[ 2 ].id );
				expect( presenter.shouldShowFlightForm ).toBe( true );
			} );
		} );

		describe( 'when there is an aircraft selected', () => {
			describe( 'when the aircraft has tail number', () => {
				describe( 'when the user doesn\'t check "Add flight manually" option', () => {
					it( 'returns false', () => {
						aircrafts[ 2 ].tailNumber = 'SE12DF';
						presenter.onAircraftSelected( aircrafts[ 2 ].id );
						expect( presenter.shouldShowFlightForm ).toBe( false );
					} );
				} );

				describe( 'when the user check "Add flight manually" option', () => {
					it( 'returns true', () => {
						aircrafts[ 2 ].tailNumber = 'SE12DF';
						presenter.onAircraftSelected( aircrafts[ 2 ].id );
						presenter.toggleFlightFormManually();
						expect( presenter.shouldShowFlightForm ).toBe( true );
					} );
				} );
			} );
		} );
	} );

	describe( '@shouldShowAircraftFlights', () => {
		describe( 'when there is no aircraft selected', () => {
			it( 'returns false', () => {
				expect( presenter.shouldShowAircraftFlights ).toBeFalsy();
			} );
		} );

		describe( 'when there is an aircraft selected', () => {
			describe( 'when the aircraft has tail number', () => {
				it( 'returns true', () => {
					aircrafts[ 2 ].tailNumber = 'SE12DF';
					presenter.onAircraftSelected( aircrafts[ 2 ].id );
					expect( presenter.shouldShowAircraftFlights ).toBe( true );
				} );
			} );

			describe( 'when the aircraft doesn\'t have tail number', () => {
				it( 'returns false', () => {
					aircrafts[ 2 ].tailNumber = null;
					presenter.onAircraftSelected( aircrafts[ 2 ].id );
					expect( presenter.shouldShowAircraftFlights ).toBe( false );
				} );
			} );
		} );
	} );

	describe( '@aircraftFlights', () => {
		it( 'returns aircraft flights', () => {
			aircrafts[ 2 ].flights = flights;
			presenter.onAircraftSelected( aircrafts[ 2 ].id );
			const expectedFlights = flights.map( ( flight ) => new FlightToDisplay( { flight } ) );

			expect( presenter.aircraftFlights ).toEqual( expectedFlights );
		} );
	} );

	describe( '@aircraftFlightsToPresent', () => {
		beforeEach( () => {
			presenter.onAircraftSelected( aircrafts[ 2 ].id );
		} );

		describe( 'without flights', () => {
			it( 'returns an empty list', () => {
				aircrafts[ 2 ].flights = [];

				expect( presenter.aircraftFlightsToPresent ).toEqual( [] );
			} );
		} );

		describe( 'with 5 flights', () => {
			it( 'returns one page of flights', () => {
				flights = FlightFactory.buildList( 5 );
				aircrafts[ 2 ].flights = flights;
				const expectedFlights = flights.map( ( flight ) => new FlightToDisplay( { flight } ) );

				expect( presenter.aircraftFlightsToPresent ).toEqual( [ expectedFlights ] );
			} );
		} );

		describe( 'with 6 flights', () => {
			it( 'returns two pages of flights', () => {
				flights = FlightFactory.buildList( 6 );
				aircrafts[ 2 ].flights = flights;
				const expectedFlights = flights.map( ( flight ) => new FlightToDisplay( { flight } ) );

				expect( presenter.aircraftFlightsToPresent ).toEqual(
					[ expectedFlights.slice( 0, 5 ), [ expectedFlights[ 5 ] ] ]
				);
			} );
		} );
	} );

	describe( '@shouldShowTrackSwitch', () => {
		describe( 'when there is no flight selected', () => {
			it( 'returns false', () => {
				expect( presenter.shouldShowTrackSwitch ).toBe( false );
			} );
		} );

		describe( 'when there is a flight selected', () => {
			describe( 'when the selected aircraft has tail number', () => {
				it( 'returns true', () => {
					flights = FlightFactory.buildList( 5 );
					aircrafts[ 2 ].flights = flights;
					aircrafts[ 2 ].tailNumber = 'SE12DF';
					presenter.onAircraftSelected( aircrafts[ 2 ].id );
					presenter.onFlightSelected( flights[ 0 ].id );

					expect( presenter.shouldShowTrackSwitch ).toBe( true );
				} );
			} );

			describe( 'when the selected aircraft doesn\'t have tail number', () => {
				it( 'returns false', () => {
					flights = FlightFactory.buildList( 5 );
					aircrafts[ 2 ].flights = flights;
					aircrafts[ 2 ].tailNumber = null;
					presenter.onAircraftSelected( aircrafts[ 2 ].id );
					presenter.onFlightSelected( flights[ 0 ].id );

					expect( presenter.shouldShowTrackSwitch ).toBe( false );
				} );
			} );
		} );
	} );

	describe( '@toggleShowTrack', () => {
		describe( 'when the track is being shown', () => {
			it( 'hides it', () => {
				presenter._shouldShowTrack = true;
				presenter.toggleShowTrack();
				expect( presenter.shouldShowTrack ).toBe( false );
			} );
		} );

		describe( 'when the track is hidden', () => {
			describe( 'when the request does not fail', () => {
				beforeEach( () => {
					flights = FlightFactory.buildList( 3 );
					aircrafts[ 2 ].flights = flights;
					aircrafts[ 2 ].tailNumber = null;
					presenter.onAircraftSelected( aircrafts[ 2 ].id );
					presenter.onFlightSelected( flights[ 0 ].id );

					presenter.toggleShowTrack();
				} );

				it( 'starts loading track', () => {
					expect( presenter.isLoadingTrack ).toBe( true );
				} );

				it( 'fetches and shows the flight track', () => {
					expect( presenter.shouldShowTrack ).toBe( true );
					expect( getFlightTrack.execute ).toHaveBeenCalledWith( { flight: flights[ 0 ] } );
				} );

				it( 'finishes loading track upon completion', async () => {
					await presenter.toggleShowTrack();
					expect( presenter.isLoadingTrack ).toBe( false );
				} );
			} );

			describe( 'when the request fails', () => {
				const mockGetFlightTrackForError = () => {
					getFlightTrack.execute.mockRejectedValueOnce( new NetworkError() );
				};

				beforeEach( () => {
					flights = FlightFactory.buildList( 4 );
					aircrafts[ 2 ].flights = flights;
					aircrafts[ 2 ].tailNumber = null;
					presenter.onAircraftSelected( aircrafts[ 2 ].id );
					presenter.onFlightSelected( flights[ 0 ].id );

					presenter.toggleShowTrack();
					mockGetFlightTrackForError();
				} );

				it( 'starts loading track', () => {
					expect( presenter.isLoadingTrack ).toBe( true );
				} );

				itShowsRequestErrorInSnackbar( {
					request: () => presenter.toggleShowTrack( ),
					snackbarServiceMock: snackbarService,
					expectedMessage: 'Connection error. Please try again.',
					beforeRequest: mockGetFlightTrackForError
				} );
			} );
		} );
	} );

	describe( '@toggleFlightFormManually', () => {
		describe( 'when the flight form is showing', () => {
			it( 'hides it', () => {
				presenter._shouldShowFlightFormManually = true;
				presenter.toggleFlightFormManually();
				expect( presenter.shouldShowFlightFormManually ).toBe( false );
			} );
		} );

		describe( 'when the flight form is hidden', () => {
			it( 'shows it', () => {
				presenter._shouldShowFlightFormManually = false;
				presenter.toggleFlightFormManually();
				expect( presenter.shouldShowFlightFormManually ).toBe( true );
			} );
		} );
	} );

	describe( '@trackSource', () => {
		describe( 'when there is no flight selected', () => {
			it( 'returns null', () => {
				expect( presenter.trackSource ).toBe( null );
			} );
		} );

		describe( 'when there is a flight selected', () => {
			it( 'returns the source of the flight track', () => {
				const track = FlightAwareTrackFactory.build();
				flights = FlightFactory.buildList( 6 );
				aircrafts[ 2 ].flights = flights;
				presenter.onAircraftSelected( aircrafts[ 2 ].id );
				presenter.onFlightSelected( flights[ 0 ].id );
				presenter._selectedFlight.addTrack( track );

				expect( presenter.trackSource ).toEqual( track.trackSource );
			} );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when nothing is loading', () => {
			it( 'returns false', () => {
				expect( presenter.isLoading ).toBe( false );
			} );
		} );

		describe( 'when loading flights', () => {
			it( 'returns true', () => {
				presenter._setIsLoadingFlights( true );
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when loading a track', () => {
			it( 'returns true', () => {
				presenter._setIsLoadingTrack( true );
				expect( presenter.isLoading ).toBe( true );
			} );
		} );
	} );

	describe( '@isPostButtonDisabled', () => {
		const setValidInputs = () => {
			presenter.form.$( FLIGHT ).$( FROM ).set( 'AAA' );
			presenter.form.$( FLIGHT ).$( TO ).set( 'BBB' );
			presenter.form.$( FLIGHT ).$( DEPARTURE_TIME ).set( new Date() );
			presenter.form.$( FLIGHT ).$( ARRIVAL_TIME ).set( new Date() );
		};
		const validate = () => presenter.form.validate();

		describe( 'when nothing is filled or selected', () => {
			beforeEach( () => {
				presenter.onAircraftSelected( null );
			} );
			it( 'returns true', () => {
				expect( presenter.isPostButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when a flight is selected', () => {
			beforeEach( () => {
				aircrafts[ 0 ].flights = flights;
				presenter.onAircraftSelected( aircrafts[ 0 ].id );
				presenter.onFlightSelected( flights[ 0 ].id );
			} );
			it( 'returns false', () => {
				expect( presenter.isPostButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when a flight is filled manually after select an aircraft', () => {
			beforeEach( () => {
				aircrafts[ 0 ].flights = flights;
				presenter.onAircraftSelected( aircrafts[ 0 ].id );
				presenter.toggleFlightFormManually();
			} );

			describe( 'when flight form does not have any error', () => {
				it( 'returns false', async () => {
					setValidInputs();
					await validate();
					expect( presenter.isPostButtonDisabled ).toBe( false );
				} );
			} );

			describe( 'when flight form has an error', () => {
				it( 'returns true', async () => {
					setValidInputs();
					presenter.form.$( FLIGHT ).$( FROM ).set( '' );
					await validate();
					expect( presenter.isPostButtonDisabled ).toBe( true );
				} );
			} );
		} );
	} );

	aircraftOptionsExamples( {
		onAircraftOptionsPressed: ( aircraftId ) => presenter.onAircraftOptionsPressed( aircraftId ),
		aircraftId: aircrafts[ 1 ].id,
		deleteAircraft,
		modalService,
		actionSheetService,
		snackbarService,
		analyticsService
	} );

	describe( '@onBackArrowPressed()', () => {
		describe( 'when nothing was filled or added', () => {
			it( 'navigates back', () => {
				presenter.onBackArrowPressed();
				expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
			} );
		} );

		describe( 'when an aircraft was selected', () => {
			beforeEach( () => {
				presenter.onAircraftSelected( aircrafts[ 0 ].id );
			} );

			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => presenter.onBackArrowPressed(),
				modal: DISCARD_CHANGES_CONFIRMATION_MODAL,
				actionExpect: () => {
					expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
				},
				modalService
			} );
		} );
	} );
} );
