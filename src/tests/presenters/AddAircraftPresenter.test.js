import AddAircraftPresenter from '../../presenters/AddAircraftPresenter';
import Form from '../../forms/Form';
import AircraftFactory from '../factories/AircraftFactory';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import {
	CANCEL_AIRCRAFT_CONFIRMATION_MODAL
} from '../../constants/modals';
import flushPromises from '../support/flushPromises';

describe( 'AddAircraftPresenter', () => {
	const navigation = {
		navigate: jest.fn()
	};
	const createAircraft = { execute: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	const analyticsService = { logNewAircraft: jest.fn() };
	const makeAutoObservable = jest.fn();
	const modalService = { open: jest.fn(), close: jest.fn() };
	const previousScreen = 'previousScreen';
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new AddAircraftPresenter( {
			navigation,
			previousScreen,
			createAircraft,
			snackbarService,
			analyticsService,
			modalService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( 'get title()', () => {
		it( 'returns title for adding aircraft', () => {
			expect( presenter.title ).toEqual( 'Add an aircraft' );
		} );
	} );

	describe( 'get submitButtonTitle()', () => {
		it( 'returns title for submitting new aircraft button', () => {
			expect( presenter.submitButtonTitle ).toEqual( 'Add aircraft' );
		} );
	} );

	describe( 'get isSubmitButtonDisabled()', () => {
		const fillAndValidate = ( values ) => {
			presenter.form.set( values );
			presenter.form.validate();
		};

		describe( 'when no input was entered', () => {
			it( 'returns true', () => {
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when only tail number was filled', () => {
			it( 'returns true', () => {
				fillAndValidate( { tailNumber: '123ABC' } );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when only picture was chosen', () => {
			it( 'returns true', () => {
				presenter.onAvatarChange( 'fake asset' );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when make and model was filled', () => {
			it( 'returns false', () => {
				fillAndValidate( { makeAndModel: 'Cirrus 22' } );
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when make and model was filled and then erased', () => {
			it( 'returns true', () => {
				fillAndValidate( { makeAndModel: 'Cirrus 22' } );
				fillAndValidate( { makeAndModel: '' } );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const newAircraft = AircraftFactory.build();
		const formValues = {
			makeAndModel: 'make and model',
			tailNumber: '35325f'
		};

		const form = {
			values: () => ( formValues ),
			clear: jest.fn()
		};

		const itLogsTheNewAircraftEvent = () => {
			it( 'logs the new aircraft event', async () => {
				await presenter.onSubmitSuccess( form );

				expect( analyticsService.logNewAircraft ).toHaveBeenCalledTimes( 1 );
			} );
		};

		describe( 'when the request does not fail', () => {
			beforeEach( () => {
				createAircraft.execute.mockResolvedValueOnce( newAircraft );
			} );

			describe( 'when there is a new photo', () => {
				it( 'creates the aircraft with its image', async () => {
					const base64 = 'base64';
					presenter.onAvatarChange( { base64 } );

					await presenter.onSubmitSuccess( form );

					expect( createAircraft.execute ).toHaveBeenCalledWith( {
						...formValues,
						base64Picture: base64
					} );
					expect( navigation.navigate ).toHaveBeenCalledWith(
						previousScreen,
						{ newAircraftId: newAircraft.id }
					);
				} );

				itLogsTheNewAircraftEvent();
			} );

			describe( 'when there is not a new photo', () => {
				it( 'creates the aircraft without an image', async () => {
					await presenter.onSubmitSuccess( form );

					expect( createAircraft.execute ).toHaveBeenCalledWith( {
						...formValues,
						base64Picture: undefined
					} );
					expect( navigation.navigate ).toHaveBeenCalledWith(
						previousScreen,
						{ newAircraftId: newAircraft.id }
					);
				} );

				itLogsTheNewAircraftEvent();
			} );
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					createAircraft.execute.mockRejectedValueOnce( new NetworkError() );
				}
			} );
		} );

		describe( 'when the onSubmitSuccess is called more than once', () => {
			it( 'createAircraft is executed once', async () => {
				const newPictureBase64 = 'base64';
				presenter.onAvatarChange( { base64: newPictureBase64 } );

				presenter.onSubmitSuccess( form );
				presenter.onSubmitSuccess( form );
				presenter.onSubmitSuccess( form );

				expect( createAircraft.execute ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'get avatarSource()', () => {
		describe( 'when a photo has not been added', () => {
			it( 'returns null', () => {
				expect( presenter.avatarSource ).toBeNull();
			} );
		} );

		describe( 'when a photo has been added', () => {
			it( 'returns an object with the photo uri', () => {
				const uri = 'test uri';

				presenter.onAvatarChange( { uri } );
				expect( presenter.avatarSource ).toEqual( { uri } );
			} );
		} );
	} );

	describe( '@onAvatarChange', () => {
		it( 'sets the new aircraft photo', () => {
			const newPhoto = { uri: 'test' };
			presenter.onAvatarChange( newPhoto );

			expect( presenter.avatarSource.uri ).toBe( newPhoto.uri );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		const itOpensConfirmationModalForCancelingCreation = () => {
			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => presenter.backButtonWasPressed( ),
				modal: CANCEL_AIRCRAFT_CONFIRMATION_MODAL,
				actionExpect: () => {
					expect( navigation.navigate ).toHaveBeenCalledWith(
						previousScreen,
						{ newAircraftId: undefined }
					);
				},
				modalService
			} );
		};

		describe( 'when nothing was filled or added', () => {
			it( 'navigates back', () => {
				presenter.backButtonWasPressed( );

				expect( navigation.navigate ).toHaveBeenCalledWith(
					previousScreen,
					{ newAircraftId: undefined }
				);
			} );
		} );

		describe( 'when make and model was entered', () => {
			beforeEach( () => presenter.form.set( { makeAndModel: 'Sample make and model' } ) );
			itOpensConfirmationModalForCancelingCreation();
		} );

		describe( 'when tail number was entered', () => {
			beforeEach( () => presenter.form.set( { tailNumber: 'Tail number example' } ) );
			itOpensConfirmationModalForCancelingCreation();
		} );

		describe( 'when a photo has been added', () => {
			beforeEach( () => {
				const uri = 'test uri';
				presenter.onAvatarChange( { uri } );
			} );
			itOpensConfirmationModalForCancelingCreation();
		} );
	} );

	describe( '@isLoading', () => {
		const formValues = {
			makeAndModel: 'make and model',
			tailNumber: '35325f'
		};

		const form = {
			values: () => formValues,
			clear: jest.fn()
		};

		describe( 'when it did not finish the request to web service', () => {
			it( 'returns true', () => {
				presenter.onSubmitSuccess( form );
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when it finished the request to web service', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isLoading ).toBe( false );
			} );
		} );
	} );
} );
