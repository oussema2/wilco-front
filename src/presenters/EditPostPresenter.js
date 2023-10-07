import { action } from 'mobx';
import _ from 'lodash';
import { DeviceEventEmitter } from 'react-native';
import { DISCARD_POST_CHANGES_CONFIRMATION_MODAL } from '../constants/modals';
import FlightToDisplay from '../entitiesToDisplay/FlightsToDisplay';
import Form from '../forms/Form';
import { editFields } from '../forms/postFields';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import VisibilityInputPresenter from './VisibilityInputPresenter';
import CommunityTagsPresenter from './CommunityTagsPresenter';
import { PHOTOS_ALLOWED_PER_POST } from '../constants/post';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export default class EditPostPresenter {
	constructor( {
		postId,
		getPostFromStore,
		updatePost,
		navigation,
		modalService,
		snackbarService,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		makeAutoObservable
	} ) {
		this._postId = postId;
		this._getPostFromStore = getPostFromStore;
		this._updatePost = updatePost;
		this._navigation = navigation;
		this._modalService = modalService;
		this._snackbarService = snackbarService;
		this._photos = [];
		this._deletedPhotos = [];

		this.flightParams = this._initialFlight;
		this.selectedAircraft = this._initialFlight?.aircraft;

		this.form = new Form(
			{ fields: editFields },
			{ hooks: { onSuccess: this._onSubmitSuccess } }
		);
		this._visibilityInput = new VisibilityInputPresenter( {
			form: this.form,
			modalService
		} );
		this._isLoading = false;

		this.communityTagsPresenter = new CommunityTagsPresenter( {
			initialCommunityTags: this._post.communityTags,
			placeholder: this.placeholderCommunityInputText,
			snackbarService,
			makeAutoObservable,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			maxTags: 3
		} );

		makeAutoObservable( this, { _autofillForm: action } );

		this._autofillForm();
	}

	get placeholderCommunityInputText() {
		return 'Select the communities related to this post';
	}

	get rightHeaderButton() {
		return {
			title: 'Cancel',
			onPress: () => this._onCancelButtonPressed()
		};
	}

	get hasPhotos() {
		return this._photos.length > 0;
	}

	get photoSources() {
		return this._photos.map( ( photo ) => ( { uri: photo.uri } ) );
	}

	get selectedFlight() {
		if ( !this.flightParams ) return null;
		return new FlightToDisplay( { flight: this.flightParams } );
	}

	onAircraftFlightSelected( flightData ) {
		const { flightParams, aircraft } = flightData;
		this.flightParams = flightParams;
		this.selectedAircraft = aircraft;
	}

	onAddFlightButtonPressed = () => {
		this._navigation.navigate( AUTHENTICATED_ROUTES.addFlight.name, {
			previousScreen: AUTHENTICATED_ROUTES.editPost.name
		} );
	}

	onClearFlightPressed = () => {
		this.flightParams = null;
		this.selectedAircraft = null;
		this._displaySuccessMessageAfterClearFlight();
	}

	_displaySuccessMessageAfterClearFlight() {
		this._snackbarService.showInfo( { message: 'The flight information was removed from this post.' } );
	}

	get selectedVisibility() {
		return this._visibilityInput.selectedVisibility;
	}

	visibilityInputWasPressed = () => {
		this._visibilityInput.inputWasPressed();
	}

	get submitButtonTitle() {
		return 'Save';
	}

	get isSubmitButtonDisabled() {
		return !this._wasAnythingChanged
			|| this._postWouldBeEmpty;
	}

	get isLoading() {
		return this._isLoading;
	}

	get addPhotosButtonTitle() {
		return 'Add new photos';
	}

	photosWereSelected = ( photos ) => {
		this._setPhotos( this._photos.concat( this._addFlagToNewPhotos( photos ) ) );
	}

	get photosAllowed() {
		return PHOTOS_ALLOWED_PER_POST - this._photos.length;
	}

	removePhoto = ( { uri } ) => {
		this._addDeletedPhoto( uri );
		this._setPhotos( this._photos.filter( ( photo ) => photo.uri !== uri ) );
	}

	get _deletedPhotoIds() {
		return this._deletedPhotos.map( ( photo ) => ( photo.id ) );
	}

	_isNewPhoto = ( photo ) => photo.new === true;

	get _newPhotos() {
		return this._photos.filter( this._isNewPhoto );
	}

	get _photosBase64() {
		return this._newPhotos.map( ( photo ) => photo.base64 );
	}

	_setPhotos( photos ) {
		this._photos = photos;
	}

	_addFlagToNewPhotos( photos ) {
		return photos.map( ( obj ) => ( { ...obj, new: true } ) );
	}

	_addDeletedPhoto( uri ) {
		if ( this._findDeletedPhotoByUri( uri ) ) {
			this._setDeletedPhotos( this._concatDeletedPhotoByUri( uri ) );
		}
	}

	_concatDeletedPhotoByUri( uri ) {
		return this._deletedPhotos.concat( this._findDeletedPhotoByUri( uri ) );
	}

	_isOriginalPhoto = ( photo ) => !photo.new;

	get _originalPhotos() {
		return this._photos.filter( this._isOriginalPhoto );
	}

	_findDeletedPhotoByUri( uri ) {
		return this._originalPhotos.find( ( photo ) => photo.uri === uri );
	}

	_setDeletedPhotos( photos ) {
		this._deletedPhotos = photos;
	}

	_autofillForm() {
		this.form.set( {
			title: this._post.title || '',
			message: this._post.text || '',
			visibility: this._post.visibility.id
		} );

		this._setPhotos( this._addIdToPhotoPreviewSources() );
	}

	_addIdToPhotoPreviewSources() {
		return this._post.photoPreviewSources.slice()
			.map( ( obj, index ) => ( { ...obj, id: this._photoIdByIndex( index ) } ) );
	}

	_photoIdByIndex( index ) {
		return ( this._photoIds ) ? this._photoIds[ index ] : undefined;
	}

	get _photoIds() {
		return this._post.photoIds;
	}

	_onCancelButtonPressed() {
		if ( this._wasAnythingChanged ) return this._openDiscardChangesModal();
		return this._navigateBack();
	}

	get _wasAnythingChanged() {
		const { title, message, visibility } = this.form.values();
		return title !== this._post.title
			|| message !== this._post.text
			|| visibility !== this._post.visibility.id
			|| this._hasPostNewFlightParams
			|| !_.isEqual( this.photoSources, this._post.photoPreviewSources )
			|| !_.isEqual( this._post.communityTags, this.communityTagsPresenter.tags );
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._navigateBack(),
			confirmationModal: DISCARD_POST_CHANGES_CONFIRMATION_MODAL,
			modalService: this._modalService
		} ).trigger();
	}

	_navigateBack() {
		this._navigation.goBack();
	}

	get _post() {
		return this._getPostFromStore.execute( this._postId );
	}

	get _initialFlight() {
		return this._post.flight;
	}

	get _postWouldBeEmpty() {
		const { title, message } = this.form.values();
		return !title && !message && !this.hasPhotos && !this.flightParams;
	}

	get _hasPostNewFlightParams() {
		return this.flightParams !== this._initialFlight;
	}

	get _deleteFlight() {
		return !!this._initialFlight && !this.flightParams;
	}

	_onSubmitSuccess = async ( form ) => {
		if ( !this.isLoading ) {
			this._setIsLoading( true );
			const { title, message, visibility } = form.values();
			const { flightParams } = this;
			const communityTags = this.communityTagsPresenter.tags;
			try {
				await this._updatePost.execute( this._postId, {
					title,
					message,
					visibility,
					communityTags,
					base64AddPhotos: this._photosBase64,
					deletePhotos: this._deletedPhotoIds,
					deleteFlight: this._deleteFlight,
					...( this._hasPostNewFlightParams && { flightParams } )
				} );
				DeviceEventEmitter.emit( 'updateMyFeedList' );
				this._displaySuccessMessage();
				this._navigateBack();
			} catch ( error ) {
				displayErrorInSnackbar( error, this._snackbarService );
			} finally {
				this._setIsLoading( false );
			}
		}
	}

	_displaySuccessMessage() {
		this._snackbarService.showInfo( { message: 'Post edited.' } );
	}

	_setIsLoading( isLoading ) {
		this._isLoading = isLoading;
	}
}
