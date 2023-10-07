import { makeAutoObservable } from 'mobx';
import lodash from 'lodash';
import EditPilotProfilePresenter from '../../presenters/EditPilotProfilePresenter';
import PilotStore from '../../stores/PilotStore';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import PilotFactory from '../factories/PilotFactory';
import AircraftFactory from '../factories/AircraftFactory';
import { DISCARD_CHANGES_CONFIRMATION_MODAL } from '../../constants/modals';
import PilotInfoPresenter from '../../presenters/PilotInfoPresenter';
import NetworkError from '../../errors/NetworkError';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import CredentialsPresenter from '../../presenters/CredentialsPresenter';
import flushPromises from '../support/flushPromises';
import CredentialFactory from '../factories/CredentialFactory';
import RoleFactory from '../factories/RoleFactory';

describe( 'EditPilotProfilePresenter', () => {
	lodash.debounce = jest.fn( ( fn ) => fn );
	let store;
	let getCurrentPilotFromStore;
	const aircrafts = AircraftFactory.buildList( 2 );
	const certificates = [ ];
	const ratings = [ ];
	const roles = RoleFactory.buildList( 2 );
	const currentPilot = PilotFactory.build( {
		aircrafts, certificates, ratings, primaryAircraftId: aircrafts[ 0 ].id, roles
	} );
	const modalService = { open: jest.fn(), close: jest.fn() };
	const actionSheetService = { open: jest.fn() };
	const navigation = { goBack: jest.fn(), navigate: jest.fn() };
	const fetchCredentialsFromRemote = { execute: jest.fn() };
	const updatePilot = { execute: jest.fn() };
	const deleteAircraft = { execute: jest.fn() };
	const newPicture = { uri: 'new/picture', base64: 'base64picture' };
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn() };
	const analyticsService = { logDeleteAircraft: jest.fn(), logEditPilotProfile: jest.fn() };
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };
	const fetchRolesFromRemote = { execute: jest.fn() };
	const getRolesFromStore = { execute: jest.fn() };

	let presenter;

	const setUp = ( presenterParams ) => {
		presenter = new EditPilotProfilePresenter( {
			navigation,
			modalService,
			actionSheetService,
			getCurrentPilotFromStore,
			fetchCredentialsFromRemote,
			updatePilot,
			deleteAircraft,
			snackbarService,
			analyticsService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			fetchRolesFromRemote,
			getRolesFromStore,
			makeAutoObservable,
			...presenterParams
		} );

		presenter.rolesSelectionPresenter.setIsRolesSelectionModalVisible = jest.fn();
	};

	beforeEach( () => {
		jest.clearAllMocks();
		store = new PilotStore();
		store.add( currentPilot );
		store.setCurrentPilotId( currentPilot.id );
		currentPilot.roles = roles;

		getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store } );
		fetchCredentialsFromRemote.execute.mockResolvedValueOnce( {
			certificates: CredentialFactory.buildList( 2 ),
			ratings: CredentialFactory.buildList( 3 )
		} );
		setUp();
	} );

	describe( 'constructor()', () => {
		it( 'autofills the form with the current pilot data', () => {
			expect( presenter.form.values() ).toMatchObject( {
				firstName: currentPilot.firstName,
				lastName: currentPilot.lastName,
				description: currentPilot.description,
				homeAirport: currentPilot.homeAirport,
				primaryAircraftId: currentPilot.primaryAircraftId
			} );
		} );
	} );

	describe( '@rightHeaderButton', () => {
		it( 'returns the right header button props', () => {
			expect( presenter.rightHeaderButton ).toEqual( {
				onPress: expect.any( Function ),
				title: 'Cancel'
			} );
		} );

		it( 'navigates back on press', () => {
			presenter.rightHeaderButton.onPress();
			expect( navigation.goBack ).toHaveBeenCalled();
		} );

		describe( 'when there are unsaved changes', () => {
			beforeEach( () => {
				presenter.form.set( { description: 'dirty field' } );
			} );

			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => presenter.rightHeaderButton.onPress(),
				modal: DISCARD_CHANGES_CONFIRMATION_MODAL,
				actionExpect: () => {
					expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
				},
				modalService
			} );
		} );

		describe( 'when user has not roles', () => {
			beforeEach( () => {
				currentPilot.roles = [];
				setUp();
			} );

			describe( 'when user did not add any role', () => {
				it( 'shows message error in snackbar', () => {
					presenter.rightHeaderButton.onPress();
					expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: 'Please, add your roles.' } );
				} );
			} );

			describe( 'when there are unsaved roles', () => {
				it( 'shows message error in snackbar', () => {
					presenter.rolesSelectionPresenter.onSelectionsChange( [ { value: 1, label: 'New role' } ] );
					presenter.rolesSelectionPresenter.saveSelection();
					presenter.rightHeaderButton.onPress();
					expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: 'Please, save your changes.' } );
				} );
			} );
		} );
	} );

	describe( '@pilot', () => {
		it( 'returns the current pilot', () => {
			expect( presenter.pilot ).toBe( currentPilot );
		} );
	} );

	describe( '@pilotInfoPresenter', () => {
		it( 'returns a PilotInfoPresenter for the current pilot', () => {
			const { pilotInfoPresenter } = presenter;
			expect( pilotInfoPresenter ).toBeInstanceOf( PilotInfoPresenter );
			expect( pilotInfoPresenter.pilot ).toBe( presenter.pilot );
		} );
	} );

	describe( '@credentialsPresenter', () => {
		it( 'returns a CredentialsPresenter', () => {
			const { credentialsPresenter } = presenter;
			expect( credentialsPresenter ).toBeInstanceOf( CredentialsPresenter );
			expect( credentialsPresenter.pilot ).toBe( presenter.pilot );
		} );
	} );

	describe( '@profilePhoto', () => {
		describe( 'when no new photo was uploaded', () => {
			it( 'returns the pilot profile picture source', () => {
				expect( presenter.profilePhoto ).toEqual( currentPilot.profilePictureSource );
			} );
		} );

		describe( 'when a new photo was uploaded', () => {
			it( 'returns the new profile picture source', () => {
				presenter.onProfilePhotoSelected( newPicture );
				expect( presenter.profilePhoto ).toEqual( { uri: newPicture.uri } );
			} );
		} );
	} );

	describe( '@isSubmitButtonDisabled', () => {
		const fillAndValidate = ( values ) => {
			presenter.form.set( values );
			presenter.form.validate();
		};

		describe( 'when there are no unsaved changes', () => {
			it( 'returns true', () => {
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when there are unsaved changes', () => {
			describe( 'when form has changed', () => {
				it( 'returns false', async () => {
					await flushPromises();
					fillAndValidate( {
						firstName: 'some name'
					} );

					expect( presenter.isSubmitButtonDisabled ).toBe( false );
				} );
			} );

			describe( 'when community tags have changed', () => {
				it( 'returns false', async () => {
					presenter.communityTagsPresenter._setTags( [ 'tag 3' ] );
					await presenter.form.validate();
					expect( presenter.isSubmitButtonDisabled ).toBe( false );
				} );
			} );

			describe( 'when user roles have changed', () => {
				describe( 'when user change default roles', () => {
					it( 'returns false', async () => {
						presenter.rolesSelectionPresenter.onSelectionsChange( [ { value: 1, label: 'New role' } ] );
						presenter.rolesSelectionPresenter.saveSelection();
						await presenter.form.validate();
						expect( presenter.isSubmitButtonDisabled ).toBe( false );
					} );
				} );

				describe( 'when user change custom roles value', () => {
					it( 'returns false', async () => {
						presenter.rolesSelectionPresenter.form.set( { other: 'Role 3, Role 4' } );
						await presenter.form.validate();
						expect( presenter.isSubmitButtonDisabled ).toBe( false );
					} );
				} );
			} );
		} );

		describe( 'when first name is blank', () => {
			it( 'returns true', () => {
				fillAndValidate( { firstName: '' } );

				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when roles is blank', () => {
			it( 'returns true', async () => {
				presenter.rolesSelectionPresenter.onSelectionsChange( [] );
				presenter.rolesSelectionPresenter.saveSelection();
				await presenter.form.validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when last name is blank', () => {
			it( 'returns true', () => {
				fillAndValidate( { lastName: '' } );

				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when description exceeds the maximum amount of characters', () => {
			it( 'returns true', () => {
				fillAndValidate( { description: 'TooLong'.repeat( 50 ) } );

				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		it( 'updates the pilot profile', async () => {
			presenter.onProfilePhotoSelected( newPicture );
			await presenter.onSubmitSuccess( presenter.form );

			expect( updatePilot.execute ).toHaveBeenCalledWith(
				currentPilot.id,
				{
					firstName: currentPilot.firstName,
					lastName: currentPilot.lastName,
					description: currentPilot.description,
					homeAirport: currentPilot.homeAirport,
					primaryAircraftId: currentPilot.primaryAircraftId,
					totalHours: currentPilot.totalHours,
					profilePictureBase64: newPicture.base64,
					certificates: presenter.credentialsPresenter.certificatesForWs(),
					customCertificates: presenter.credentialsPresenter.customCertificatesNames,
					ratings: presenter.credentialsPresenter.ratingsForWs(),
					customRatings: presenter.credentialsPresenter.customRatingsNames,
					communityTags: presenter.communityTagsPresenter.tags,
					rolesIDs: presenter.rolesSelectionPresenter.itemsIDs,
					customRoles: presenter.rolesSelectionPresenter.customRolesNames
				}
			);
			expect( navigation.goBack ).toHaveBeenCalled();
		} );

		it( 'logs the edit pilot profile event', async () => {
			const { credentialsPresenter, communityTagsPresenter } = presenter;
			await presenter.onSubmitSuccess( presenter.form );

			const {
				firstName, lastName, description, homeAirport, primaryAircraftId
			} = presenter.form.values();

			expect( analyticsService.logEditPilotProfile ).toHaveBeenCalledWith( {
				firstNameHasChanged: firstName !== currentPilot.firstName,
				lastNameHasChanged: lastName !== currentPilot.lastName,
				descriptionHasChanged: description !== ( currentPilot.description || '' ),
				homeAirportHasChanged: homeAirport !== ( currentPilot.homeAirport || '' ),
				primaryAircraftHasChanged: primaryAircraftId !== currentPilot.primaryAircraftId,
				certificatesHaveChanged: credentialsPresenter.certificatesHaveChanged,
				ratingsHaveChanged: credentialsPresenter.ratingsHaveChanged,
				communityTagsHaveChanged: communityTagsPresenter.communityTagsHaveChanged,
				newProfilePhoto: !!presenter._newProfilePhoto
			} );
		} );

		it( 'shows an informative message in snackbar', async () => {
			await presenter.onSubmitSuccess( presenter.form );

			expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: 'Profile changes saved.' } );
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( presenter.form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					updatePilot.execute.mockRejectedValueOnce( new NetworkError() );
				},
				afterRequest: () => {
					expect( analyticsService.logEditPilotProfile ).toHaveBeenCalledTimes( 0 );
				}
			} );
		} );
	} );

	describe( '@clear()', () => {
		it( 'resets to the saved values', async () => {
			presenter.form.set( {
				firstName: 'some name',
				lastName: 'some last name',
				description: '',
				homeAirport: ''
			} );

			presenter.onProfilePhotoSelected( newPicture );
			presenter.clear();

			expect( presenter.isSubmitButtonDisabled ).toBe( true );
		} );
	} );

	describe( 'Delete aircraft', () => {
		const { primaryAircraftId } = currentPilot;
		const nonPrimaryAircraftId = currentPilot.aircrafts[ 1 ].id;

		beforeEach( () => {
			actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
				actions[ 0 ].onPress();
			} );
			modalService.open.mockImplementationOnce( ( _, { onConfirmPress } ) => {
				onConfirmPress();
			} );
		} );

		const deleteAircraftThroughOptions = ( aircraftId ) => {
			presenter.pilotInfoPresenter.aircraftOptionsWerePressed( aircraftId );
		};

		describe( 'when the deleted aircraft matches the one in the form', () => {
			it( 'assigns the pilot\'s current primary aircraft for the form', async () => {
				presenter.form.set( { primaryAircraftId: nonPrimaryAircraftId } );
				deleteAircraftThroughOptions( nonPrimaryAircraftId );
				await flushPromises();
				expect( presenter.form.values().primaryAircraftId ).toEqual( primaryAircraftId );
			} );
		} );

		describe( 'when the deleted aircraft does not match the one in the form', () => {
			it( 'does not change the primary aircraft in the form', async () => {
				deleteAircraftThroughOptions( nonPrimaryAircraftId );
				await flushPromises();
				expect( presenter.form.values().primaryAircraftId ).toEqual( primaryAircraftId );
			} );
		} );
	} );

	describe( '@placeholderCommunityInputText', () => {
		it( 'returns a placeholder text', () => {
			const expectedPlaceholder = 'Start typing your communities here';
			expect( presenter.placeholderCommunityInputText ).toEqual( expectedPlaceholder );
		} );
	} );

	describe( '@placeholderRolesInputText', () => {
		it( 'returns a roles input placeholder text', () => {
			const expectedRolesPlaceholder = 'Select your role in GA community';
			expect( presenter.placeholderRolesInputText ).toEqual( expectedRolesPlaceholder );
		} );
	} );

	describe( '@onRolesInputPressed', () => {
		it( 'calls to setIsRolesSelectionModalVisible from rolesSelectionPresenter', () => {
			presenter.onRolesInputPressed();

			expect( presenter.rolesSelectionPresenter.setIsRolesSelectionModalVisible )
				.toHaveBeenCalledWith( true );
		} );
	} );

	describe( '@rolesInputError', () => {
		describe( 'when user select roles', () => {
			it( 'returns null', () => {
				expect( presenter.rolesInputError ).toBeNull();
			} );
		} );

		describe( 'when user does not select any role yet', () => {
			it( 'returns error text', () => {
				presenter.rolesSelectionPresenter.modalWasOpened = true;
				presenter.rolesSelectionPresenter.onSelectionsChange( [] );
				presenter.rolesSelectionPresenter.saveSelection();
				expect( presenter.rolesInputError ).toEqual( 'This field is mandatory.' );
			} );
		} );
	} );
} );
