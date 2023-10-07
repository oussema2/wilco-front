import AnalyticsService from '../../services/AnalyticsService';
// eslint-disable-next-line import/named
import {
	NEW_POST,
	NEW_AIRCRAFT,
	DELETE_AIRCRAFT,
	DELETE_POST,
	NEW_COMMENT,
	LIKE_POST,
	REPORT_POST,
	REPORT_COMMENT,
	VIEW_OWN_PROFILE,
	VIEW_ANOTHER_USER_PROFILE,
	EDIT_PILOT_PROFILE,
	EDIT_AIRCRAFT,
	COMPLETE_ONBOARDING,
	SIGN_UP,
	APPLY_FILTER,
	SEND_DM,
	OPEN_PUSH_NOTIFICATION,
	OPEN_IN_APP_NOTIFICATION, SAVE_PREFERRED_AIRPORTS
} from '../../constants/analyticsEvents';

describe( 'AnalyticsService', () => {
	let currentRouteName;
	let analyticsService;
	const analytics = {
		logEvent: jest.fn(),
		logScreenView: jest.fn()
	};

	const navigationRef = {
		current: {
			getCurrentRoute: () => ( {
				name: currentRouteName
			} )
		}
	};

	beforeEach( () => {
		jest.clearAllMocks();
		currentRouteName = null;
		analyticsService = new AnalyticsService( { analytics, navigationRef } );
	} );

	describe( '@onNavigationStateChange', () => {
		describe( 'when navigating to a new route', () => {
			it( 'logs the new route', () => {
				currentRouteName = 'new route';
				analyticsService.onNavigationStateChange();

				expect( analytics.logScreenView ).toHaveBeenCalledWith( {
					screen_name: currentRouteName,
					screen_class: currentRouteName
				} );
			} );
		} );

		describe( 'when no route change was registered', () => {
			it( 'doesn\'t log the route change', () => {
				analyticsService.onNavigationStateChange();

				expect( analytics.logScreenView ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@logNewPost', () => {
		const hasTitle = true;
		const hasMessage = true;
		const hasSelectedFlight = true;
		const hasManualFlight = true;
		const hasTrack = true;
		const hasAirport = true;
		const hasHashtag = true;
		const hasMention = true;
		const numberOfPhotos = 2;
		const visibility = 'private';

		it( 'logs a new post event', () => {
			analyticsService.logNewPost( {
				hasTitle,
				hasMessage,
				hasSelectedFlight,
				hasManualFlight,
				hasTrack,
				hasAirport,
				hasHashtag,
				hasMention,
				numberOfPhotos,
				visibility
			} );

			expect( analytics.logEvent ).toHaveBeenCalledWith( NEW_POST, {
				has_title: hasTitle,
				has_message: hasMessage,
				has_selected_flight: hasSelectedFlight,
				has_manual_flight: hasManualFlight,
				has_track: hasTrack,
				has_airport: hasAirport,
				has_hashtag: hasHashtag,
				has_mention: hasMention,
				number_of_photos: numberOfPhotos,
				visibility
			} );
		} );
	} );

	describe( '@logEditPilotProfile', () => {
		const data = {
			firstNameHasChanged: true,
			lastNameHasChanged: true,
			descriptionHasChanged: true,
			homeAirportHasChanged: true,
			primaryAircraftHasChanged: true,
			certificatesHaveChanged: true,
			ratingsHaveChanged: true,
			communityTagsHaveChanged: true,
			newProfilePhoto: false
		};

		it( 'logs a edit pilot profile event', () => {
			analyticsService.logEditPilotProfile( data );

			expect( analytics.logEvent ).toHaveBeenCalledWith( EDIT_PILOT_PROFILE, {
				first_name_has_changed: data.firstNameHasChanged,
				last_name_has_changed: data.lastNameHasChanged,
				description_has_changed: data.descriptionHasChanged,
				home_airport_has_changed: data.homeAirportHasChanged,
				primary_aircraft_has_changed: data.primaryAircraftHasChanged,
				certificates_have_changed: data.certificatesHaveChanged,
				ratings_have_changed: data.ratingsHaveChanged,
				community_tags_have_changed: data.communityTagsHaveChanged,
				new_profile_photo: data.newProfilePhoto
			} );
		} );
	} );

	describe( '@logNewAircraft', () => {
		const previousScreen = 'previous-screen';

		it( 'logs the new aircraft event', () => {
			analyticsService.logNewAircraft( { previousScreen } );

			expect( analytics.logEvent ).toHaveBeenCalledWith( NEW_AIRCRAFT, {
				previous_screen: previousScreen
			} );
		} );
	} );

	describe( '@logEditAircraft', () => {
		it( 'logs the delete aircraft event', () => {
			const previousScreen = 'previous-screen';
			analyticsService.logEditAircraft( { previousScreen } );

			expect( analytics.logEvent ).toHaveBeenCalledWith( EDIT_AIRCRAFT, {
				previous_screen: previousScreen
			} );
		} );
	} );

	describe( '@logDeleteAircraft', () => {
		it( 'logs the delete aircraft event', () => {
			currentRouteName = 'current-screen';
			analyticsService.logDeleteAircraft();

			expect( analytics.logEvent ).toHaveBeenCalledWith( DELETE_AIRCRAFT, {
				screen_name: currentRouteName
			} );
		} );
	} );

	describe( '@logSignUp', () => {
		const firstName = 'name';
		const lastName = 'lastname';
		const email = 'email@wilco.com';

		it( 'logs the sign up event', () => {
			analyticsService.logSignUp( {
				firstName,
				lastName,
				email
			} );

			expect( analytics.logEvent ).toHaveBeenCalledWith( SIGN_UP, {
				first_name: firstName,
				last_name: lastName,
				email
			} );
		} );
	} );

	describe( '@logCompleteOnboarding', () => {
		it( 'logs the complete onboarding event', () => {
			analyticsService.logCompleteOnboarding();

			expect( analytics.logEvent ).toHaveBeenCalledWith( COMPLETE_ONBOARDING, undefined );
		} );
	} );

	describe( '@logDeletePost', () => {
		it( 'logs the delete post event', () => {
			analyticsService.logDeletePost();

			expect( analytics.logEvent ).toHaveBeenCalledWith( DELETE_POST, undefined );
		} );
	} );

	describe( '@logNewComment', () => {
		it( 'logs the new comment event', () => {
			const params = { postId: 1, text: 'text' };
			analyticsService.logNewComment( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( NEW_COMMENT, { post_id: 1, text: 'text' } );
		} );
	} );

	describe( '@logLikePost', () => {
		it( 'logs the like post event', () => {
			const params = { postId: 1 };
			analyticsService.logLikePost( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( LIKE_POST, { post_id: 1 } );
		} );
	} );

	describe( '@logReportPost', () => {
		it( 'logs the report post event', () => {
			const params = { postId: 1 };
			analyticsService.logReportPost( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( REPORT_POST, { post_id: 1 } );
		} );
	} );

	describe( '@logReportComment', () => {
		it( 'logs the report comment event', () => {
			const params = { commentId: 1 };
			analyticsService.logReportComment( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( REPORT_COMMENT, { comment_id: 1 } );
		} );
	} );

	describe( '@logViewOwnProfile', () => {
		it( 'logs the view own profile event', () => {
			analyticsService.logViewOwnProfile();

			expect( analytics.logEvent ).toHaveBeenCalledWith( VIEW_OWN_PROFILE, undefined );
		} );
	} );

	describe( '@logViewAnotherUserProfile', () => {
		it( 'logs the view another user profile event', () => {
			analyticsService.logViewAnotherUserProfile();

			expect( analytics.logEvent ).toHaveBeenCalledWith( VIEW_ANOTHER_USER_PROFILE, undefined );
		} );
	} );

	describe( '@logApplyFilter', () => {
		it( 'logs the apply filter event', () => {
			analyticsService.logApplyFilter();

			expect( analytics.logEvent ).toHaveBeenCalledWith( APPLY_FILTER, undefined );
		} );
	} );

	describe( '@logSendDirectMessage', () => {
		it( 'logs the send Direct message event', () => {
			const params = {
				conversationId: '12_user_13',
				receiverId: '12'
			};
			analyticsService.logSendDirectMessage( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( SEND_DM, {
				conversation_id: params.conversationId,
				receiver_id: params.receiverId
			} );
		} );
	} );

	describe( '@logOpenPushNotification', () => {
		it( 'logs the open push notification event', () => {
			const params = {
				type: 'like'
			};
			analyticsService.logOpenPushNotification( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( OPEN_PUSH_NOTIFICATION, {
				type: params.type
			} );
		} );
	} );

	describe( '@logOpenInAppNotification', () => {
		it( 'logs the open in app notification event', () => {
			const params = {
				type: 'like'
			};
			analyticsService.logOpenInAppNotification( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( OPEN_IN_APP_NOTIFICATION, {
				type: params.type
			} );
		} );
	} );

	describe( '@logSavePreferredAirports', () => {
		it( 'logs the save preferred airports event', () => {
			const params = {
				hasNewPreferredAirports: true
			};
			analyticsService.logSavePreferredAirports( params );

			expect( analytics.logEvent ).toHaveBeenCalledWith( SAVE_PREFERRED_AIRPORTS, {
				has_new_preferred_airports: params.hasNewPreferredAirports
			} );
		} );
	} );
} );
