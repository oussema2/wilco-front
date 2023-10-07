import noop from '../../helpers/noop';
import PreferredAirportsPresenter from '../../presenters/PreferredAirportsPresenter';

describe( 'PreferredAirportsPresenter', () => {
	let presenter;
	const initialPreferredAirports = [];
	const homeAirport = 'AAA';
	const pilot = {
		airports: initialPreferredAirports,
		homeAirport
	};

	const snackbarService = { showInfo: jest.fn(), showError: jest.fn() };

	const createPresenter = ( params ) => {
		presenter = new PreferredAirportsPresenter( {
			pilot,
			snackbarService,
			makeAutoObservable: noop,
			...params
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		createPresenter();
	} );

	describe( 'constructor()', () => {
		describe( 'when the user does not has a list of preferred airports', () => {
			it( 'initializes with the correct data', () => {
				expect( presenter.preferredAirports ).toEqual( initialPreferredAirports );
				expect( presenter._snackbarService ).toEqual( snackbarService );
			} );
		} );

		describe( 'when the user has a list of preferred airports', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				let otherPilotPreferredAirports = [ 'AAA', 'BBB' ];
				let otherPilotHomeAirport = 'AAA';
				let otherPilot = {
					airports: otherPilotPreferredAirports,
					homeAirport: otherPilotHomeAirport
				};
				createPresenter( { pilot: otherPilot } );
			} );

			it( 'initializes with the correct data', () => {
				const expectedPreferredAirports = [ 'BBB' ];
				expect( presenter.preferredAirports ).toEqual( expectedPreferredAirports );
			} );
		} );
	} );

	describe( '@preferredAirports', () => {
		it( 'returns a airports', () => {
			const airport = 'EZE';
			presenter.addNewPreferredAirport( airport );

			const expectedPreferredAirports = [ airport ];
			expect( presenter.preferredAirports ).toEqual( expectedPreferredAirports );
		} );
	} );

	describe( '@addNewPreferredAirport', () => {
		describe( 'when array airports are empty', () => {
			it( 'adds new airport to array preferred airports', () => {
				presenter._setPreferredAirports( [] );
				presenter.addNewPreferredAirport( 'EZE' );
				expect( presenter.preferredAirports ).toEqual( [ 'EZE' ] );
				expect( presenter.hasError ).toBe( false );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when airport already exists', () => {
			it( 'doesn\'t add a airport and shows a snackbar', () => {
				presenter._setPreferredAirports( [] );
				const airport = 'EZE';
				presenter.addNewPreferredAirport( airport );
				presenter.addNewPreferredAirport( airport );

				expect( presenter.preferredAirports ).toEqual( [ airport ] );
				expect( presenter.preferredAirports ).not.toEqual( [ airport, airport ] );
				expect( snackbarService.showError ).toHaveBeenCalledWith( { message: 'The entered airport is already being used.' } );
			} );
		} );

		describe( 'when the entered airport is the same as pilot home airport', () => {
			it( 'doesn\'t add a airport and shows a snackbar', () => {
				presenter._setPreferredAirports( [] );
				presenter.addNewPreferredAirport( homeAirport );

				expect( presenter.preferredAirports ).toEqual( [ ...presenter.preferredAirports ] );
				expect( presenter.preferredAirports ).not
					.toEqual( [ ...presenter.preferredAirports, homeAirport ] );
				expect( snackbarService.showError ).toHaveBeenCalledWith( { message: 'The entered airport is already being used.' } );
			} );
		} );

		describe( 'when airport is empty', () => {
			it( 'doesn\'t add a airport and shows a snackbar', () => {
				presenter._setPreferredAirports( [] );
				const airport = '';
				presenter.addNewPreferredAirport( airport );

				expect( presenter.preferredAirports ).toEqual( [ ] );
				expect( presenter.preferredAirports ).not.toEqual( [ airport ] );
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: 'The airport shouldn\'t be empty.' } );
			} );
		} );

		describe( 'when selected airports count is equals to maximum allowed airports', () => {
			it( 'doesn\'t add a new airport', () => {
				const arrayAirports = [];
				Array.from( Array( 10 ) ).forEach( ( x, i ) => {
					presenter.addNewPreferredAirport( `AIR${i}` );
					arrayAirports.push( `AIR${i}` );
				} );

				const airport = 'ROM';
				presenter.addNewPreferredAirport( airport );

				expect( presenter.preferredAirports ).toEqual( arrayAirports );
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: 'You reached the limit of 10 preferences.' } );
			} );
		} );

		describe( 'when airport is not valid', () => {
			describe( 'when airport has more than 4 letters', () => {
				it( 'doesn\'t add a airport', () => {
					presenter._setPreferredAirports( [] );
					const airport = 'AIRPORT';
					presenter.addNewPreferredAirport( airport );

					expect( presenter.preferredAirports ).toEqual( [ ] );
					expect( presenter.preferredAirports ).not.toEqual( [ airport ] );
					expect( presenter.hasError ).toBe( true );
				} );

				describe( 'when the input changes', () => {
					it( 'the error disappears', () => {
						presenter._setPreferredAirports( [] );
						const airport = 'AIRPORT';
						const setValue = jest.fn( ( value ) => value );

						presenter.addNewPreferredAirport( airport );
						expect( presenter.hasError ).toBeTruthy();

						presenter.onInputChange( 'VALUE', setValue );
						expect( setValue ).toHaveBeenCalledTimes( 1 );
						expect( presenter.hasError ).toBeFalsy();
					} );
				} );
			} );

			describe( 'when airport has special characters', () => {
				it( 'doesn\'t add a airport', () => {
					presenter._setPreferredAirports( [] );
					const airport = 'AR;';
					presenter.addNewPreferredAirport( airport );

					expect( presenter.preferredAirports ).toEqual( [ ] );
					expect( presenter.preferredAirports ).not.toEqual( [ airport ] );
					expect( presenter.hasError ).toBe( true );
				} );
			} );
		} );
	} );

	describe( '@removePreferredAirport', () => {
		describe( 'when array airports are empty', () => {
			it( 'does nothing', () => {
				presenter._setPreferredAirports( [] );
				presenter.removePreferredAirport( 'EZE' );
				expect( presenter.preferredAirports ).toEqual( [ ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when only one airport exists', () => {
			it( 'removes that airport correctly', () => {
				const airport = 'EZE';
				presenter._setPreferredAirports( [ airport ] );
				expect( presenter.preferredAirports ).toEqual( [ airport ] );
				presenter.removePreferredAirport( airport );

				expect( presenter.preferredAirports ).toEqual( [ ] );
				expect( presenter.preferredAirports ).not.toEqual( [ airport ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'When more than one airport exists', () => {
			it( 'removes a airport correctly', () => {
				presenter._setPreferredAirports( [] );
				const airport = 'MAD';
				const otherAirport = 'BCN';
				presenter._setPreferredAirports( [ airport, otherAirport ] );
				expect( presenter.preferredAirports ).toEqual( [ airport, otherAirport ] );

				presenter.removePreferredAirport( airport );

				expect( presenter.preferredAirports ).toEqual( [ otherAirport ] );
				expect( presenter.preferredAirports ).not.toEqual( [ airport, otherAirport ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@preferredAirportsHaveChanged', () => {
		describe( 'when airports no changed', () => {
			it( 'returns false', () => {
				expect( presenter.preferredAirportsHaveChanged ).toEqual( false );
			} );
		} );

		describe( 'when airports have changed', () => {
			it( 'returns true', () => {
				presenter._setPreferredAirports( [ 'ROM' ] );
				expect( presenter.preferredAirportsHaveChanged ).toEqual( true );
			} );
		} );
	} );

	describe( '@hasAnyPreferredAirport', () => {
		describe( 'without airports', () => {
			it( 'returns false', () => {
				expect( presenter.hasAnyPreferredAirport ).toBeFalsy( );
			} );
		} );

		describe( 'with airports', () => {
			beforeEach( () => {
				presenter.addNewPreferredAirport( 'EZE' );
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyPreferredAirport ).toBeTruthy( );
			} );
		} );
	} );

	describe( '@maxPreferredAirports', () => {
		it( 'returns the maximum quantity of airports that can be set as preferred', () => {
			const maxPreferredAirports = 10;
			expect( presenter.maxPreferredAirports ).toBe( maxPreferredAirports );
		} );
	} );

	describe( 'when presenter has initial airports', () => {
		const airports = [ 'EZE', 'MAD' ];
		const otherPilot = {
			airports
		};

		beforeEach( () => {
			jest.clearAllMocks();

			presenter = new PreferredAirportsPresenter( {
				pilot: otherPilot,
				snackbarService,
				makeAutoObservable: noop
			} );
		} );

		it( 'sets initial airports as airports', () => {
			expect( presenter.preferredAirports ).toEqual( airports );
		} );
	} );

	describe( '@hasNewPreferredAirports', () => {
		const airports = [ 'EZE', 'MAD' ];
		const otherPilot = {
			airports
		};

		beforeEach( () => {
			jest.clearAllMocks();

			presenter = new PreferredAirportsPresenter( {
				pilot: otherPilot,
				snackbarService,
				makeAutoObservable: noop
			} );
		} );

		describe( 'when the user does not add a new preferred airport', () => {
			it( 'returns false', () => {
				expect( presenter.hasNewPreferredAirports ).toEqual( false );
			} );
		} );

		describe( 'when the user adds a new preferred airport', () => {
			it( 'returns true', () => {
				const airport = 'BCN';
				presenter.addNewPreferredAirport( airport );
				expect( presenter.hasNewPreferredAirports ).toEqual( true );
			} );
		} );
	} );
} );
