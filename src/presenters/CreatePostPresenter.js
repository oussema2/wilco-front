import { DeviceEventEmitter } from 'react-native';
import Form from '../forms/Form';
import fields from '../forms/postFields';
import {
	FLIGHT, MESSAGE, TITLE, VISIBILITY
} from '../constants/formFields/postForm';
import FlightFormPresenter from './FlightFormPresenter';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import { ROUTES } from '../navigation/MainTabNavigator/routes';
import { VISIBILITY_OPTIONS } from '../constants/visibilityOptions';
import { CANCEL_POST_CONFIRMATION_MODAL, VISIBILITY_PICKER_MODAL } from '../constants/modals';
import CommunityTagsPresenter from './CommunityTagsPresenter';
import { PHOTOS_ALLOWED_PER_POST } from '../constants/post';
import FlightToDisplay from '../entitiesToDisplay/FlightsToDisplay';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';

export default class CreatePostPresenter {
	constructor( {
		getCurrentPilotFromStore,
		createPost,
		navigation,
		modalService,
		snackbarService,
		analyticsService,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		extractorMessageService,
		makeAutoObservable
	} = {} ) {
		this.visibilityOptions = VISIBILITY_OPTIONS;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.createPost = createPost;
		this.modalService = modalService;

		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;
		this.flightParams = null;
		this.selectedAircraft = null;
		this.hasSelectedFlight = false;
		this.hasManualFlight = false;
		this.extractorMessageService = extractorMessageService;

		this.formHooks = {
			onSuccess: this.onSubmitSuccess
		};
		this.form = new Form( { fields }, { hooks: this.formHooks } );
		this.photos = [];

		this.flightFormPresenter = new FlightFormPresenter( {
			form: this.form.$( FLIGHT ),
			modalService,
			makeAutoObservable
		} );

		this.communityTagsPresenter = new CommunityTagsPresenter( {
			initialCommunityTags: [],
			placeholder: this.placeholderCommunityInputText,
			snackbarService,
			makeAutoObservable,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			maxTags: 3
		} );

		this._isCreatingPost = false;

		makeAutoObservable( this );

		this._autofillForm();
	}

	onAddFlightButtonPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.addFlight.name, {
			previousScreen: AUTHENTICATED_ROUTES.postText.name
		} );
	}

	get placeholderCommunityInputText() {
		return 'Select the communities related to this post';
	}

	get isCreatingPost() {
		return this._isCreatingPost;
	}

	onAircraftFlightSelected( flightData ) {
		const {
			flightParams, aircraft, hasSelectedFlight, hasManualFlight
		} = flightData;

		this.flightParams = flightParams;
		this.selectedAircraft = aircraft;
		this.hasSelectedFlight = hasSelectedFlight;
		this.hasManualFlight = hasManualFlight;
	}

	get selectedFlight() {
		if ( !this.flightParams ) return null;
		return new FlightToDisplay( { flight: this.flightParams } );
	}

	onSubmitSuccess = async ( form ) => {
		if ( !this.isCreatingPost ) {
			this._setIsCreatingPost( true );
			const {
				title, message, visibility
			} = form.values();
			const communityTags = this.communityTagsPresenter.tags;
			const { flightParams } = this;
			try {
				await this.onNewPost( {
					title,
					message,
					visibility,
					communityTags,
					flightParams,
					base64Photos: this._photosBase64
				} );
				DeviceEventEmitter.emit( 'navigateToAllPosts' );
				this._navigateToHome();
			} catch ( error ) {
				displayErrorInSnackbar( error, this.snackbarService );
			} finally {
				this._setIsCreatingPost( false );
			}
		}
	};

	async onNewPost( {
		title, message, visibility, communityTags, flightParams, base64Photos
	} ) {
		await this.createPost.execute( {
			title, message, visibility, communityTags, flightParams, base64Photos
		} );
		DeviceEventEmitter.emit( 'updateMyFeedList' );

		let airports = this.extractorMessageService.extractLocations( message );
		let hashtags = this.extractorMessageService.extractHashtags( message );
		let mentionsIDs = this.extractorMessageService.extractMentionsIDs( message );

		this.analyticsService.logNewPost( {
			hasTitle: !!title,
			hasMessage: !!message,
			hasSelectedFlight: this.hasSelectedFlight,
			hasManualFlight: this.hasManualFlight,
			hasTrack: !!flightParams?.track,
			hasAirport: !!airports.length,
			hasHashtag: !!hashtags.length,
			hasMention: !!mentionsIDs.length,
			numberOfPhotos: base64Photos.length,
			visibility
		} );
	}

	get rightHeaderButton() {
		return {
			title: 'Cancel',
			onPress: () => this._onCancelButtonPressed()
		};
	}

	get addPhotosButtonTitle() {
		return this.isAnyPhotoSelected ? this._getChangePhotoText() : 'Add photos';
	}

	get buttonTitle() {
		return 'Post';
	}

	get isPostButtonDisabled() {
		return this._hasNeitherTextFlightNorPhotos || !this.form.isValid;
	}

	get isAnyPhotoSelected() {
		return this.photos.length > 0;
	}

	photosWereSelected = ( photos ) => {
		this.photos = photos;
	}

	removePhoto = ( { uri } ) => {
		const indexToRemove = this.photos.findIndex( ( photo ) => photo.uri === uri );
		this.photos.splice( indexToRemove, 1 );
	}

	get photoSources() {
		return this.photos.map( ( photo ) => ( { uri: photo.uri } ) );
	}

	get	selectedVisibility() {
		return this._selectedVisibility?.name || '';
	}

	visibilityInputWasPressed = () => {
		this.modalService.open(
			VISIBILITY_PICKER_MODAL, {
				data: this.visibilityOptions,
				initialItem: this._selectedVisibility,
				onItemSelected: this._selectPrimaryAircraftAndCloseModal
			}
		);
	}

	clear = () => {
		this.form.clear();
	};

	onClearFlightPressed = () => {
		this.flightParams = null;
		this.selectedAircraft = null;
		this.hasSelectedFlight = false;
		this.hasManualFlight = false;

		this._displaySuccessMessageAfterClearFlight();
	}

	get isLoading() {
		return this.isCreatingPost;
	}

	get maxPhotosAllowed() {
		return PHOTOS_ALLOWED_PER_POST;
	}

	_displaySuccessMessageAfterClearFlight() {
		this.snackbarService.showInfo( { message: 'The flight information was removed from this post.' } );
	}

	_getChangePhotoText() {
		return 'Change photos';
	}

	_autofillForm() {
		this.form.set( {
			visibility: this.visibilityOptions[ 0 ].value || null
		} );
	}

	_selectPrimaryAircraftAndCloseModal = ( visibility ) => {
		if ( visibility ) this.form.set( { visibility: visibility.value } );
		this.modalService.close( VISIBILITY_PICKER_MODAL );
	}

	get _selectedVisibility() {
		return this.visibilityOptions
			.find( ( visibility ) => visibility.value === this._selectedVisibilityId );
	}

	get _selectedVisibilityId() {
		return this.form.$( VISIBILITY ).value;
	}

	get _pilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	_onCancelButtonPressed() {
		if ( this._wasAnythingFilled ) return this._openDiscardChangesModal();
		return this._navigateBack();
	}

	get _wasAnythingFilled() {
		const { title, message } = this.form.values();
		return title
				|| message
				|| this.isAnyPhotoSelected
				|| this.flightParams != null
				|| this.communityTagsPresenter.hasAnyTag;
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._navigateBack(),
			confirmationModal: CANCEL_POST_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}

	_navigateBack() {
		this.navigation.goBack();
	}

	_navigateToHome() {
		this.navigation.navigate( ROUTES.Home.name );
	}

	get _photosBase64() {
		return this.photos.map( ( photo ) => photo.base64 );
	}

	_setIsCreatingPost( isCreatingPost ) {
		this._isCreatingPost = isCreatingPost;
	}

	get _hasNeitherTextFlightNorPhotos() {
		return !this.form.$( MESSAGE ).value
			&& !this.form.$( TITLE ).value
			&& !this.isAnyPhotoSelected
			&& this.flightParams === null;
	}
}
