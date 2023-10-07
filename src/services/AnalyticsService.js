import firebaseAnalytics from '@react-native-firebase/analytics';
import navigation from '../navigation/RootNavigation';
import {
	NEW_AIRCRAFT,
	DELETE_AIRCRAFT,
	DELETE_POST,
	LIKE_POST,
	NEW_COMMENT,
	NEW_POST,
	REPORT_COMMENT,
	REPORT_POST,
	VIEW_ANOTHER_USER_PROFILE,
	VIEW_OWN_PROFILE,
	EDIT_PILOT_PROFILE,
	EDIT_AIRCRAFT,
	COMPLETE_ONBOARDING,
	SIGN_UP,
	APPLY_FILTER,
	SEND_DM,
	OPEN_PUSH_NOTIFICATION,
	OPEN_IN_APP_NOTIFICATION, SAVE_PREFERRED_AIRPORTS
} from '../constants/analyticsEvents';

export default class AnalyticsService {
	constructor( {
		analytics = firebaseAnalytics(),
		navigationRef = navigation.ref
	} = {} ) {
		this._analytics = analytics;
		this._navigationRef = navigationRef;
		this._previousRouteName = null;
	}

	onNavigationStateChange = async () => {
		if ( this._currentRouteName === this._previousRouteName ) return;
		await this._logScreenView( this._currentRouteName );
		this._previousRouteName = this._currentRouteName;
	}

	logNewPost( {
		hasTitle, hasMessage, hasSelectedFlight, hasManualFlight, hasTrack, hasAirport, hasHashtag,
		hasMention, numberOfPhotos, visibility
	} ) {
		this._logEvent( NEW_POST, {
			has_title: hasTitle,
			has_message: hasMessage,
			has_selected_flight: hasSelectedFlight,
			has_manual_flight: hasManualFlight,
			has_airport: hasAirport,
			has_hashtag: hasHashtag,
			has_mention: hasMention,
			has_track: hasTrack,
			number_of_photos: numberOfPhotos,
			visibility
		} );
	}

	logEditPilotProfile( {
		firstNameHasChanged, lastNameHasChanged, descriptionHasChanged, homeAirportHasChanged,
		primaryAircraftHasChanged, certificatesHaveChanged, ratingsHaveChanged,
		communityTagsHaveChanged, newProfilePhoto
	} ) {
		this._logEvent( EDIT_PILOT_PROFILE, {
			first_name_has_changed: firstNameHasChanged,
			last_name_has_changed: lastNameHasChanged,
			description_has_changed: descriptionHasChanged,
			home_airport_has_changed: homeAirportHasChanged,
			primary_aircraft_has_changed: primaryAircraftHasChanged,
			certificates_have_changed: certificatesHaveChanged,
			ratings_have_changed: ratingsHaveChanged,
			community_tags_have_changed: communityTagsHaveChanged,
			new_profile_photo: newProfilePhoto
		} );
	}

	logNewAircraft( { previousScreen } ) {
		this._logEvent( NEW_AIRCRAFT, {
			previous_screen: previousScreen
		} );
	}

	logEditAircraft( { previousScreen } ) {
		this._logEvent( EDIT_AIRCRAFT, {
			previous_screen: previousScreen
		} );
	}

	logDeleteAircraft() {
		this._logEvent( DELETE_AIRCRAFT, {
			screen_name: this._currentRouteName
		} );
	}

	logSignUp( { firstName, lastName, email } ) {
		this._logEvent( SIGN_UP, {
			first_name: firstName,
			last_name: lastName,
			email
		} );
	}

	logCompleteOnboarding() {
		this._logEvent( COMPLETE_ONBOARDING );
	}

	logDeletePost() {
		this._logEvent( DELETE_POST );
	}

	logNewComment( { postId, text } ) {
		this._logEvent( NEW_COMMENT, {
			post_id: postId,
			text
		} );
	}

	logLikePost( { postId } ) {
		this._logEvent( LIKE_POST, {
			post_id: postId
		} );
	}

	logReportPost( { postId } ) {
		this._logEvent( REPORT_POST, {
			post_id: postId
		} );
	}

	logReportComment( { commentId } ) {
		this._logEvent( REPORT_COMMENT, {
			comment_id: commentId
		} );
	}

	logViewOwnProfile() {
		this._logEvent( VIEW_OWN_PROFILE );
	}

	logViewAnotherUserProfile() {
		this._logEvent( VIEW_ANOTHER_USER_PROFILE );
	}

	logApplyFilter() {
		this._logEvent( APPLY_FILTER );
	}

	logSendDirectMessage( { conversationId, receiverId } ) {
		this._logEvent( SEND_DM, {
			conversation_id: conversationId,
			receiver_id: receiverId
		} );
	}

	logOpenPushNotification( { type } ) {
		this._logEvent( OPEN_PUSH_NOTIFICATION, { type } );
	}

	logOpenInAppNotification( { type } ) {
		this._logEvent( OPEN_IN_APP_NOTIFICATION, { type } );
	}

	logSavePreferredAirports( { hasNewPreferredAirports } ) {
		this._logEvent( SAVE_PREFERRED_AIRPORTS, {
			has_new_preferred_airports: hasNewPreferredAirports
		} );
	}

	async _logEvent( name, params ) {
		await this._analytics.logEvent( name, params );
	}

	async _logScreenView( screenName ) {
		await this._analytics.logScreenView( {
			screen_name: screenName,
			screen_class: screenName
		} );
	}

	get _currentRouteName() {
		return this._navigationRef.current.getCurrentRoute().name;
	}
}
