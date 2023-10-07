import PilotProfilePresenter from '../../presenters/PilotProfilePresenter';
import PilotFactory from '../factories/PilotFactory';
import PilotStore from '../../stores/PilotStore';
import GetEntityFromStore from '../../interactors/GetEntityFromStore';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import CurrentPilotProfilePresenter from '../../presenters/CurrentPilotProfilePresenter';
import OtherPilotProfilePresenter from '../../presenters/OtherPilotProfilePresenter';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import GetPostsByPilotFromStore from '../../interactors/GetPostsByPilotFromStore';
import MockRootStore from '../mocks/MockRootStore';
import MockModalService from '../mocks/MockModalService';
import MockActionSheetService from '../mocks/MockActionSheetService';
import CredentialFactory from '../factories/CredentialFactory';
import flushPromises from '../support/flushPromises';
import { meatballsMenu, settings } from '../../assets/icons';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import { BLOCK_USER_CONFIRMATION_MODAL } from '../../constants/modals';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import WilcoError from '../../errors/WilcoError';
import RoleFactory from '../factories/RoleFactory';

describe( 'PilotProfilePresenter', () => {
	let pilotId;
	let profileOwner;
	let store;
	let getPilotFromStore;
	let getCurrentPilotFromStore;
	let	fetchPilotFromRemote;
	const navigation = { goBack: jest.fn(), navigate: jest.fn() };
	const analyticsService = {
		logViewOwnProfile: jest.fn(),
		logViewAnotherUserProfile: jest.fn()
	};
	const fetchPostsFromRemote = {
		execute: jest.fn(),
		setPagination: jest.fn(),
		resetPagination: jest.fn()
	};
	const blockUser = { execute: jest.fn() };
	const getPostsFromStore = new GetPostsByPilotFromStore( { store } );
	const rootStore = new MockRootStore();
	const modalService = new MockModalService();
	const actionSheetService = new MockActionSheetService();
	const snackbarService = { showInfo: jest.fn(), showError: jest.fn(), showSuccess: jest.fn() };

	let presenter;

	const setUp = ( presenterParams ) => {
		presenter = new PilotProfilePresenter( {
			pilotId,
			navigation,
			getPilotFromStore,
			getCurrentPilotFromStore,
			fetchPilotFromRemote,
			analyticsService,
			fetchPostsFromRemote,
			getPostsFromStore,
			rootStore,
			modalService,
			actionSheetService,
			snackbarService,
			blockUser,
			...presenterParams
		} );
	};

	const setUpOwnProfile = ( presenterParams ) => {
		const pilot = PilotFactory.build();
		store.add( pilot );
		store.setCurrentPilotId( pilot.id );
		profileOwner = pilot;

		return setUp( {
			pilotId: undefined, ...presenterParams
		} );
	};

	const setUpOtherPilotProfile = ( presenterParams = {} ) => {
		const pilot = PilotFactory.build();
		store.add( pilot );
		pilotId = pilot.id;
		profileOwner = pilot;
		presenterParams.getCurrentPilotFromStore = {
			execute: jest.fn().mockReturnValue( pilot )
		};
		return setUp( presenterParams );
	};

	const setUpOtherPilotProfileNotAlreadyFetched = ( presenterParams ) => {
		const pilot = PilotFactory.build();
		pilotId = pilot.id;
		profileOwner = pilot;

		return setUp( presenterParams );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		fetchPilotFromRemote = { execute: jest.fn() };
		pilotId = null;
		profileOwner = null;
		store = new PilotStore();
		getPilotFromStore = new GetEntityFromStore( { store } );
		getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store } );
	} );

	describe( 'constructor()', () => {
		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'initializes in the current pilot state', () => {
				expect( presenter.state ).toBeInstanceOf( CurrentPilotProfilePresenter );
			} );

			it( 'logs a view own profile event', () => {
				expect( analyticsService.logViewOwnProfile ).toHaveBeenCalledTimes( 1 );
				expect( analyticsService.logViewAnotherUserProfile ).toHaveBeenCalledTimes( 0 );
			} );
		} );

		describe( 'when the profile owner is another pilot that not exist on store', () => {
			beforeEach( () => {
				setUpOtherPilotProfileNotAlreadyFetched();
			} );

			describe( 'when it did not finish fetching the pilot from remote', () => {
				it( 'returns true', () => {
					expect( presenter.isLoading ).toBeTruthy();
				} );
			} );

			describe( 'when it finished fetching the pilot from remote', () => {
				it( 'returns false', async () => {
					await flushPromises();
					expect( presenter.isLoading )
						.toBeFalsy();
				} );
			} );
		} );

		describe( 'when the profile owner is another pilot that exist on pilot store', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'initializes in the other pilot state', () => {
				expect( presenter.state ).toBeInstanceOf( OtherPilotProfilePresenter );
			} );

			it( 'fetches the pilot from remote', () => {
				expect( fetchPilotFromRemote.execute ).toHaveBeenCalledWith( profileOwner.id );
			} );

			describe( 'when it did not finish fetching the pilot from remote', () => {
				it( 'returns false', () => {
					expect( presenter.isLoading ).toBeFalsy();
				} );
			} );

			describe( 'when it finished fetching the pilot from remote', () => {
				it( 'returns false', async () => {
					await flushPromises();
					expect( presenter.isLoading )
						.toBeFalsy();
				} );
			} );

			describe( 'when the request fails', () => {
				describe( 'when network fails', () => {
					itShowsRequestErrorInSnackbar( {
						request: () => setUpOtherPilotProfile(),
						snackbarServiceMock: snackbarService,
						expectedMessage: 'Connection error. Please try again.',
						beforeRequest: () => {
							fetchPilotFromRemote.execute.mockRejectedValueOnce( new NetworkError() );
						}
					} );
				} );

				describe( 'when user not found', () => {
					const description = 'Pilot not found';
					const name = 'record_not_found';
					itShowsRequestErrorInSnackbar( {
						request: () => setUpOtherPilotProfile(),
						snackbarServiceMock: snackbarService,
						expectedMessage: description,
						beforeRequest: () => {
							fetchPilotFromRemote.execute.mockRejectedValueOnce(
								new WilcoError( { description, name } ) );
						}
					} );
				} );
			} );

			it( 'logs a view own profile event', () => {
				expect( analyticsService.logViewOwnProfile ).toHaveBeenCalledTimes( 0 );
				expect( analyticsService.logViewAnotherUserProfile ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( '@navigationBarTitle', () => {
		describe( 'when the profile is for the current user', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the own profile text', () => {
				expect( presenter.navigationBarTitle ).toBe( 'My profile' );
			} );
		} );

		describe( 'when the profile is for another user', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'returns the profile text', () => {
				expect( presenter.navigationBarTitle ).toBe( `${profileOwner.firstName}'s profile` );
			} );
		} );
	} );

	describe( '@pilot', () => {
		describe( 'when the profile is for the current user', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the current pilot', () => {
				const { pilot } = presenter;
				expect( pilot ).toBe( profileOwner );
			} );
		} );

		describe( 'when the profile is for another user', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'returns the corresponding pilot', () => {
				const { pilot } = presenter;

				expect( pilot ).toBe( profileOwner );
			} );
		} );
	} );

	describe( '@certificates', () => {
		describe( 'when the pilot has certificates', () => {
			it( 'returns the pilot certificates sorted', () => {
				const certificates = CredentialFactory.buildList( 4 );
				presenter.pilot.setCertificates( certificates );
				const sortedCertificates = certificates.slice().sort( presenter._byName );
				expect( presenter.certificates ).toStrictEqual( sortedCertificates );
			} );
		} );

		describe( 'when the pilot doesn\'t has certificates', () => {
			it( 'returns the correct data', () => {
				const certificates = CredentialFactory.buildList( 0 );
				presenter.pilot.setCertificates( certificates );
				const sortedCertificates = certificates.slice().sort( presenter._byName );
				expect( presenter.certificates ).toStrictEqual( sortedCertificates );
				expect( presenter.certificates ).toStrictEqual( [] );
			} );
		} );
	} );

	describe( '@ratings', () => {
		describe( 'when the pilot has ratings', () => {
			it( 'returns the pilot ratings sorted', () => {
				const ratings = CredentialFactory.buildList( 4 );
				presenter.pilot.setRatings( ratings );
				const sortedRatings = ratings.slice().sort( presenter._byName );
				expect( presenter.ratings ).toStrictEqual( sortedRatings );
			} );
		} );

		describe( 'when the pilot doesn\'t has ratings', () => {
			it( 'returns the correct data', () => {
				const ratings = CredentialFactory.buildList( 0 );
				presenter.pilot.setRatings( ratings );
				const sortedRatings = ratings.slice().sort( presenter._byName );
				expect( presenter.ratings ).toStrictEqual( sortedRatings );
				expect( presenter.ratings ).toStrictEqual( [] );
			} );
		} );
	} );

	describe( '@roles', () => {
		describe( 'when the pilot has roles', () => {
			it( 'returns the pilot roles sorted', () => {
				const roles = RoleFactory.buildList( 4 );
				presenter.pilot.setRoles( roles );
				const sortedRoles = roles.slice().sort( presenter._byName );
				expect( presenter.roles ).toStrictEqual( sortedRoles );
			} );
		} );

		describe( 'when the pilot doesn\'t has roles', () => {
			it( 'returns the correct data', () => {
				const roles = RoleFactory.buildList( 0 );
				presenter.pilot.setRoles( roles );
				const sortedRoles = roles.slice().sort( presenter._byName );
				expect( presenter.roles ).toStrictEqual( sortedRoles );
				expect( presenter.roles ).toStrictEqual( [] );
			} );
		} );
	} );

	describe( '@hasAnyRole', () => {
		describe( 'when the pilot has any role', () => {
			it( 'returns the correct boolean', () => {
				const role = RoleFactory.buildList( 1 );
				presenter.pilot.setRoles( role );
				expect( presenter.hasAnyRole ).toBe( true );
			} );
		} );

		describe( 'when the pilot doesn\'t has roles', () => {
			it( 'returns the correct boolean', () => {
				const role = RoleFactory.buildList( 0 );
				presenter.pilot.setRoles( role );
				expect( presenter.hasAnyRole ).toBe( false );
			} );
		} );
	} );

	describe( '@hasAnyCredential', () => {
		describe( 'when the pilot has ratings and doesn\'t has certificates', () => {
			it( 'returns the correct boolean', () => {
				const ratings = CredentialFactory.buildList( 2 );
				presenter.pilot.setRatings( ratings );

				const certificates = CredentialFactory.buildList( 0 );
				presenter.pilot.setCertificates( certificates );

				expect( presenter.hasAnyCredential ).toBe( true );
			} );
		} );

		describe( 'when the pilot has certificates and doesn\'t has ratings', () => {
			it( 'returns the correct boolean', () => {
				const certificates = CredentialFactory.buildList( 2 );
				presenter.pilot.setCertificates( certificates );

				const ratings = CredentialFactory.buildList( 0 );
				presenter.pilot.setRatings( ratings );

				expect( presenter.hasAnyCredential ).toBe( true );
			} );
		} );

		describe( 'when the pilot doesn\'t has certificates and doesn\'t has ratings', () => {
			it( 'returns the correct boolean', () => {
				const certificates = CredentialFactory.buildList( 0 );
				presenter.pilot.setCertificates( certificates );

				const ratings = CredentialFactory.buildList( 0 );
				presenter.pilot.setRatings( ratings );

				expect( presenter.hasAnyCredential ).toBe( false );
			} );
		} );

		describe( 'when the pilot has certificates and ratings', () => {
			it( 'returns the correct boolean', () => {
				const certificates = CredentialFactory.buildList( 3 );
				presenter.pilot.setCertificates( certificates );

				const ratings = CredentialFactory.buildList( 3 );
				presenter.pilot.setRatings( ratings );

				expect( presenter.hasAnyCredential ).toBe( true );
			} );
		} );
	} );

	describe( '@hasBasicInfo', () => {
		beforeEach( () => {
			setUpOwnProfile();
			profileOwner.description = null;
			profileOwner.homeAirport = null;
			profileOwner.primaryAircraftId = null;
		} );

		describe( 'when the profile owner has a description', () => {
			beforeEach( () => {
				profileOwner.description = 'a description';
			} );

			it( 'returns true', () => {
				expect( presenter.hasBasicInfo ).toBe( true );
			} );
		} );

		describe( 'when the profile owner has a home airport', () => {
			beforeEach( () => {
				profileOwner.homeAirport = 'ABC';
			} );

			it( 'returns true', () => {
				expect( presenter.hasBasicInfo ).toBe( true );
			} );
		} );

		describe( 'when the profile owner has a primary aircraft', () => {
			beforeEach( () => {
				profileOwner.primaryAircraftId = profileOwner.aircrafts[ 0 ].id;
			} );

			it( 'returns true', () => {
				expect( presenter.hasBasicInfo ).toBe( true );
			} );
		} );

		describe( 'when the profile owner doesn\'t have any pilot info', () => {
			it( 'returns false', () => {
				expect( presenter.hasBasicInfo ).toBe( false );
			} );
		} );
	} );

	describe( '@noBasicInfoText', () => {
		const expectedOtherProfileText = 'Can’t see much.\nThis user lacks some info here.';
		const expectedOwnProfileText = 'Can’t see much here.\nComplete your profile!';

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );
			it( 'returns the correct text', () => {
				expect( presenter.noBasicInfoText ).toBe( expectedOtherProfileText );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the correct text', () => {
				expect( presenter.noBasicInfoText ).toBe( expectedOwnProfileText );
			} );
		} );
	} );

	describe( '@emptyLatestFlightsText', () => {
		const expectedOtherProfileText = 'This user has not shared any flights yet.';
		const expectedOwnProfileText = 'You have not shared any flights yet.';

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );
			it( 'returns the correct text', () => {
				expect( presenter.emptyLatestFlightsText ).toBe( expectedOtherProfileText );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the correct text', () => {
				expect( presenter.emptyLatestFlightsText ).toBe( expectedOwnProfileText );
			} );
		} );
	} );

	describe( '@emptyCredentialsText', () => {
		const expectedOtherProfileText = 'This user has not entered any credentials yet.';
		const expectedOwnProfileText = 'You have added no credentials in your profile.';

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );
			it( 'returns the correct text', () => {
				expect( presenter.emptyCredentialsText ).toBe( expectedOtherProfileText );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the correct text', () => {
				expect( presenter.emptyCredentialsText ).toBe( expectedOwnProfileText );
			} );
		} );
	} );

	describe( '@emptyCommunitiesText', () => {
		const expectedOtherProfileText = 'This user has not identified any communities yet.';
		const expectedOwnProfileText = 'You have no communities in your profile.';

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );
			it( 'returns the correct text', () => {
				expect( presenter.emptyCommunitiesText ).toBe( expectedOtherProfileText );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the correct text', () => {
				expect( presenter.emptyCommunitiesText ).toBe( expectedOwnProfileText );
			} );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		const itReturnsAFunctionThatGoesBack = () => {
			it( 'returns a function that goes back', () => {
				presenter.backButtonWasPressed();
				expect( navigation.goBack ).toHaveBeenCalled();
			} );
		};

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			itReturnsAFunctionThatGoesBack();
		} );

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			itReturnsAFunctionThatGoesBack();
		} );
	} );

	describe( '@editProfileButtonWasPressed', () => {
		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns a function that navigates to the edit profile screen', () => {
				presenter.editProfileButtonWasPressed();
				expect( navigation.navigate ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.editPilotProfileStack.name
				);
			} );
		} );

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'is not defined', () => {
				expect( presenter.editProfileButtonWasPressed ).toBeUndefined();
			} );
		} );
	} );

	describe( '@onSendMessageButtonPressed', () => {
		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'navigates to the chat conversation screen', () => {
				presenter.onSendMessageButtonPressed();
				expect( navigation.navigate ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.cometChatMessages.name, expect.any( Object )
				);
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns undefined', () => {
				expect( presenter.onSendMessageButtonPressed ).toBeUndefined();
			} );
		} );
	} );

	describe( '@shareFlightButtonWasPressed', () => {
		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns a function that navigates to the new post screen', () => {
				presenter.shareFlightButtonWasPressed();
				expect( navigation.navigate ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.postTextStack.name
				);
			} );
		} );

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'is not defined', () => {
				expect( presenter.shareFlightButtonWasPressed ).toBeUndefined();
			} );
		} );
	} );

	describe( '@emptyPostsText', () => {
		const expectedOtherProfileText = 'This user has not posted yet.';
		const expectedOwnProfileText = 'You have not posted anything yet.';

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );
			it( 'returns the correct text', () => {
				expect( presenter.emptyPostsText ).toBe( expectedOtherProfileText );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the correct text', () => {
				expect( presenter.emptyPostsText ).toBe( expectedOwnProfileText );
			} );
		} );
	} );

	describe( '@sharePostsButtonWasPressed', () => {
		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns a function that navigates to the new post screen', () => {
				presenter.sharePostsButtonWasPressed();
				expect( navigation.navigate ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.postTextStack.name
				);
			} );
		} );

		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'is not defined', () => {
				expect( presenter.sharePostsButtonWasPressed ).toBeUndefined();
			} );
		} );
	} );

	describe( '@communityTags', () => {
		describe( 'when the pilot has community tags', () => {
			it( 'returns the community tags sorted', () => {
				const communityTags = [ 'tag 1', 'tag 2' ];
				presenter.pilot.setCommunityTags( communityTags );
				const sortedCommunityTags = communityTags.slice().sort( presenter._sortByTagName );
				expect( presenter.communityTags ).toStrictEqual( sortedCommunityTags );
			} );
		} );

		describe( 'when the pilot doesn\'t has community tags', () => {
			it( 'returns the correct data', () => {
				const communityTags = [];
				presenter.pilot.setCommunityTags( communityTags );
				const sortedCommunityTags = communityTags.slice().sort( presenter._sortByTagName );
				expect( presenter.communityTags ).toStrictEqual( sortedCommunityTags );
				expect( presenter.communityTags ).toStrictEqual( [] );
			} );
		} );
	} );

	describe( '@hasCommunityTags', () => {
		describe( 'when the pilot has community tags', () => {
			it( 'returns true', () => {
				const communityTags = [ 'tag 1', 'tag 2' ];
				presenter.pilot.setCommunityTags( communityTags );

				expect( presenter.hasCommunityTags ).toBe( true );
			} );
		} );

		describe( 'when the pilot doesn\'t has community tags', () => {
			it( 'returns false', () => {
				const communityTags = [];
				presenter.pilot.setCommunityTags( communityTags );

				expect( presenter.hasCommunityTags ).toBe( false );
			} );
		} );
	} );

	describe( '@onRefresh()', () => {
		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );

			it( 'calls the fetchPostsFromRemote interactor', () => {
				presenter.onRefresh();
				expect( fetchPostsFromRemote.resetPagination ).toHaveBeenCalledTimes( 1 );
				expect( fetchPostsFromRemote.execute ).toHaveBeenCalled();
			} );

			it( 'calls the fetchPilotFromRemote interactor', () => {
				presenter.onRefresh();
				expect( fetchPilotFromRemote.execute ).toHaveBeenCalled();
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'calls the fetchPostsFromRemote interactor', () => {
				presenter.onRefresh();
				expect( fetchPostsFromRemote.resetPagination ).toHaveBeenCalledTimes( 1 );
				expect( fetchPostsFromRemote.execute ).toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@isRefreshing()', () => {
		describe( 'when the app is refreshing', () => {
			it( 'returns true', () => {
				presenter.onRefresh();
				expect( presenter.isRefreshing ).toBeTruthy();
			} );
		} );

		describe( 'when the app finished to refreshing', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isRefreshing ).toBeFalsy();
			} );
		} );
	} );

	describe( '@headerRightImageSource', () => {
		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
			} );
			it( 'returns the correct image', () => {
				expect( presenter.headerRightImageSource ).toBe( meatballsMenu );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'returns the correct image', () => {
				expect( presenter.headerRightImageSource ).toBe( settings );
			} );
		} );
	} );

	describe( '@headerRightButtonWasPressed', () => {
		describe( 'when the profile owner is another pilot', () => {
			beforeEach( () => {
				setUpOtherPilotProfile();
				actionSheetService.open.mockClear();
			} );

			it( 'opens the action sheet with the block user option', () => {
				presenter.headerRightButtonWasPressed();

				expect( actionSheetService.open ).toHaveBeenCalledWith( {
					actions: [
						{
							title: 'Report User',
							onPress: expect.any( Function )
						},
						{
							title: 'Block User',
							type: 'destructive',
							onPress: expect.any( Function )
						}
					]
				} );
			} );

			describe( 'action sheet report user option onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 0 ].onPress();
					} );

					presenter.headerRightButtonWasPressed();
				} );

				it( 'navigates to the report user screen', () => {
					expect( navigation.navigate ).toHaveBeenCalledWith(
						AUTHENTICATED_ROUTES.reportUser.name,
						{ pilotId: presenter.pilot.id }
					);
				} );
			} );

			describe( 'action sheet block user option onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 1 ].onPress();
					} );
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.headerRightButtonWasPressed(),
					modal: BLOCK_USER_CONFIRMATION_MODAL,
					modalService,
					snackbarService,
					actionExpect: () => {
						expect( blockUser.execute ).toHaveBeenCalledWith( pilotId );
						expect( navigation.goBack ).toHaveBeenCalled();
					},
					mockActionForFailure: () => {
						blockUser.execute.mockRejectedValueOnce( new NetworkError() );
					},
					additionalExamples: ( { triggerAndConfirm } ) => {
						describe( '@isLoading', () => {
							describe( 'when it did not finish the request to web service', () => {
								it( 'returns true', () => {
									triggerAndConfirm();
									expect( presenter.isLoading ).toBe( true );
								} );
							} );

							describe( 'when it finished the request to web service', () => {
								it( 'returns false', async () => {
									triggerAndConfirm();
									await flushPromises();
									expect( presenter.isLoading ).toBe( false );
								} );
							} );
						} );
					}
				} );
			} );
		} );

		describe( 'when the profile owner is the current pilot', () => {
			beforeEach( () => {
				setUpOwnProfile();
			} );

			it( 'navigates to settings screen', () => {
				presenter.headerRightButtonWasPressed();

				expect( navigation.navigate ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.settings.name
				);
			} );
		} );
	} );

	describe( '@hasTotalHours', () => {
		it( 'returns whether pilot has total hours or not', () => {
			setUpOwnProfile();

			expect( presenter.hasTotalHours ).toEqual( profileOwner.hasTotalHours );
		} );
	} );

	describe( '@totalHours', () => {
		it( 'returns the pilot total hours', () => {
			setUpOwnProfile();

			expect( presenter.totalHours ).toEqual( profileOwner.totalHours );
		} );
	} );

	describe( '@emptyTotalHoursText', () => {
		describe( 'when visiting the current user\'s profile', () => {
			it( 'returns the correct empty total hours text', () => {
				setUpOwnProfile();

				expect( presenter.emptyTotalHoursText ).toEqual( 'You have added no flight hours in your profile.' );
			} );
		} );

		describe( 'when visiting another user\'s profile', () => {
			it( 'returns the correct empty total hours text', () => {
				setUpOtherPilotProfile();

				expect( presenter.emptyTotalHoursText ).toEqual( 'This user has not added flight hours yet.' );
			} );
		} );
	} );
} );
