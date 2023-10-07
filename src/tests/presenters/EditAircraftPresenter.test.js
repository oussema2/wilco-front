import EditAircraftPresenter from '../../presenters/EditAircraftPresenter';
import AircraftFactory from '../factories/AircraftFactory';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import {
	DISCARD_CHANGES_CONFIRMATION_MODAL
} from '../../constants/modals';
import flushPromises from '../support/flushPromises';

describe( 'EditAircraftPresenter', () => {
	const previousScreen = 'previousScreen';
	const getAircraftFromStore = { execute: jest.fn() };
	const updateAircraft = { execute: jest.fn() };
	const navigation = { navigate: jest.fn() };
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn() };
	const analyticsService = { logEditAircraft: jest.fn() };
	const modalService = { open: jest.fn(), close: jest.fn() };
	const makeAutoObservable = jest.fn();
	let aircraft;
	let aircraftId;
	let presenter;

	const setUp = ( { aircraftParams } = {} ) => {
		jest.clearAllMocks();
		aircraft = AircraftFactory.build( aircraftParams );
		aircraftId = aircraft.id;
		getAircraftFromStore.execute.mockReturnValue( aircraft );
		presenter = new EditAircraftPresenter( {
			aircraftId,
			previousScreen,
			getAircraftFromStore,
			updateAircraft,
			navigation,
			snackbarService,
			analyticsService,
			modalService,
			makeAutoObservable
		} );
	};

	beforeEach( () => setUp() );

	describe( 'constructor()', () => {
		it( 'autofills make & model and tail number with those of the aircraft', () => {
			expect( presenter.form.values() ).toEqual( {
				makeAndModel: aircraft.makeAndModel,
				tailNumber: aircraft.tailNumber
			} );
		} );
	} );

	describe( 'get title()', () => {
		it( 'returns title for editing aircraft', () => {
			expect( presenter.title ).toEqual( 'Edit aircraft' );
		} );
	} );

	describe( 'get submitButtonTitle()', () => {
		it( 'returns title for saving aircraft changes button', () => {
			expect( presenter.submitButtonTitle ).toEqual( 'Save changes' );
		} );
	} );

	describe( 'get isSubmitButtonDisabled()', () => {
		const fillAndValidate = ( values ) => {
			presenter.form.set( values );
			presenter.form.validate();
		};

		beforeEach( () => presenter.form.validate() );

		describe( 'when no input was entered', () => {
			it( 'returns true', () => {
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when make and model was changed', () => {
			it( 'returns false', () => {
				fillAndValidate( { makeAndModel: 'Cirrus 22' } );
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when tail number was changed', () => {
			it( 'returns false', () => {
				fillAndValidate( { tailNumber: '123ABC' } );
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when picture was changed', () => {
			it( 'returns false', () => {
				presenter.onAvatarChange( 'fake asset' );
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when make and model was erased', () => {
			it( 'returns true', () => {
				fillAndValidate( { makeAndModel: '' } );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const formValues = {
			makeAndModel: 'make and model',
			tailNumber: '35325f'
		};

		const form = {
			values: () => formValues,
			clear: jest.fn()
		};

		describe( 'when the request does not fail', () => {
			describe( 'when there is a new picture', () => {
				it( 'updates the aircraft with its new picture', async () => {
					const newPictureBase64 = 'base64';
					presenter.onAvatarChange( { base64: newPictureBase64 } );

					await presenter.onSubmitSuccess( form );

					expect( updateAircraft.execute ).toHaveBeenCalledWith(
						aircraftId,
						{ ...formValues, base64Picture: newPictureBase64 }
					);
				} );
			} );

			describe( 'when there is not a new picture', () => {
				it( 'updates the aircraft without sending any picture', async () => {
					await presenter.onSubmitSuccess( form );
					expect( updateAircraft.execute ).toHaveBeenCalledWith( aircraftId, formValues );
				} );
			} );

			it( 'shows a successful message in snackbar', async () => {
				await presenter.onSubmitSuccess( form );
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( {
					message: 'Aircraft changes saved.'
				} );
			} );

			it( 'navigates back to the previous screen', async () => {
				await presenter.onSubmitSuccess( form );
				expect( navigation.navigate ).toHaveBeenCalledWith( previousScreen );
			} );

			it( 'logs the edit aircraft event', async () => {
				await presenter.onSubmitSuccess( form );

				expect( analyticsService.logEditAircraft ).toHaveBeenCalledWith( { previousScreen } );
			} );
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					updateAircraft.execute.mockRejectedValueOnce( new NetworkError() );
				},
				afterRequest: () => {
					expect( analyticsService.logEditAircraft ).toHaveBeenCalledTimes( 0 );
				}
			} );
		} );

		describe( 'when the onSubmitSuccess is called more than once', () => {
			it( 'updateAircraft is executed once', async () => {
				const newPictureBase64 = 'base64';
				presenter.onAvatarChange( { base64: newPictureBase64 } );

				presenter.onSubmitSuccess( form );
				presenter.onSubmitSuccess( form );
				presenter.onSubmitSuccess( form );

				expect( updateAircraft.execute ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'get avatarSource()', () => {
		describe( 'when a photo has not been added', () => {
			describe( 'when the aircraft has no photo', () => {
				it( 'returns null', () => {
					setUp( {
						aircraftParams: {
							pictureUrl: null
						}
					} );
					expect( presenter.avatarSource ).toBeNull();
				} );
			} );

			describe( 'when the aircraft has a photo', () => {
				it( 'returns an object with the aircraft photo URI', () => {
					const uri = 'aircraft photo URI';
					setUp( {
						aircraftParams: {
							pictureUrl: uri
						}
					} );
					expect( presenter.avatarSource ).toEqual( { uri } );
				} );
			} );
		} );

		describe( 'when a photo has been added', () => {
			it( 'returns an object with the added photo URI', () => {
				const uri = 'new photo URI';
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
				modal: DISCARD_CHANGES_CONFIRMATION_MODAL,
				actionExpect: () => {
					expect( navigation.navigate ).toHaveBeenCalledWith( previousScreen );
				},
				modalService
			} );
		};

		describe( 'when nothing was changed or added', () => {
			it( 'navigates back', () => {
				presenter.backButtonWasPressed( );

				expect( navigation.navigate ).toHaveBeenCalledWith( previousScreen );
			} );
		} );

		describe( 'when make and model was changed', () => {
			beforeEach( () => presenter.form.set( { makeAndModel: 'Sample make and model' } ) );
			itOpensConfirmationModalForCancelingCreation();
		} );

		describe( 'when tail number was changed', () => {
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
