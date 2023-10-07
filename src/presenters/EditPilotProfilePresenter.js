import { reaction } from 'mobx';
import { debounce } from 'lodash';
import Form from '../forms/Form';
import fields from '../forms/editProfileFields';
import { DISCARD_CHANGES_CONFIRMATION_MODAL } from '../constants/modals';
import PilotInfoPresenter from './PilotInfoPresenter';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import CredentialsPresenter from './CredentialsPresenter';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import CommunityTagsPresenter from './CommunityTagsPresenter';
import RolesSelectionPresenter from './RolesSelectionPresenter';

export default class EditPilotProfilePresenter {
	constructor( {
		navigation,
		modalService,
		getCurrentPilotFromStore,
		fetchCredentialsFromRemote,
		updatePilot,
		deleteAircraft,
		actionSheetService,
		snackbarService,
		analyticsService,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		fetchRolesFromRemote,
		getRolesFromStore,
		makeAutoObservable
	} = {} ) {
		this._newProfilePhoto = null;
		this.isSubmitButtonDisabled = true;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.fetchCredentialsFromRemote = fetchCredentialsFromRemote;
		this.updatePilot = updatePilot;

		this.navigation = navigation;
		this.modalService = modalService;
		this.analyticsService = analyticsService;

		this.formHooks = {
			onSuccess: this.onSubmitSuccess
		};
		this.form = new Form( { fields }, { hooks: this.formHooks } );
		this.snackbarService = snackbarService;

		this.pilotInfoPresenter = new PilotInfoPresenter( {
			pilot: this.pilot,
			deleteAircraft,
			onAircraftDeleted: this._onAircraftDeleted,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			form: this.form,
			makeAutoObservable
		} );

		this.credentialsPresenter = new CredentialsPresenter( {
			pilot: this.pilot,
			fetchCredentialsFromRemote,
			snackbarService,
			makeAutoObservable
		} );

		this.communityTagsPresenter = new CommunityTagsPresenter( {
			initialCommunityTags: this.pilot?.communityTags,
			placeholder: this.placeholderCommunityInputText,
			snackbarService,
			makeAutoObservable,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			maxTags: 10
		} );

		this.rolesSelectionPresenter = new RolesSelectionPresenter( {
			initialRoles: this.pilot?.roles,
			snackbarService,
			fetchRolesFromRemote,
			getRolesFromStore,
			modalService,
			makeAutoObservable
		} );

		this.disposer = reaction(
			() => this._isSubmitButtonDisabled,
			debounce( ( isSubmitButtonDisabled ) => {
				this.setIsSubmitButtonDisabled( isSubmitButtonDisabled );
			}, 100 )
		);

		makeAutoObservable( this );

		this._autofillForm();
	}

	onUnmount() {
		this.disposer();
	}

	get placeholderCommunityInputText() {
		return 'Start typing your communities here';
	}

	get placeholderRolesInputText() {
		return 'Select your role in GA community';
	}

	get rightHeaderButton() {
		return {
			title: 'Cancel',
			onPress: () => this._cancelButtonWasPressed()
		};
	}

	get pilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	get profilePhoto() {
		if ( this._newProfilePhoto ) return this._newProfilePhotoSource;
		return this.pilot.profilePictureSource;
	}

	get _isSubmitButtonDisabled() {
		return !( this._hasUnsavedChanges
			&& this.form.isValid
			&& this.credentialsPresenter.isValid
			&& this.rolesInputValue
			&& !this.credentialsPresenter.isLoading );
	}

	setIsSubmitButtonDisabled( isSubmitButtonDisabled ) {
		this.isSubmitButtonDisabled = isSubmitButtonDisabled;
	}

	get isLoading() {
		return this.credentialsPresenter.isLoading;
	}

	onProfilePhotoSelected = ( photo ) => {
		this._newProfilePhoto = photo;
	}

	onSubmitSuccess = async ( form ) => {
		try {
			const dataForAnalytics = this._getDataForAnalytics( form );
			await this._updatePilot( form );
			this.analyticsService.logEditPilotProfile( dataForAnalytics );
			this._displayChangesSavedMessage();
			this._goBack();
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this.clear();
		}
	};

	clear() {
		this.form.clear();
		this._autofillForm();
		this._newProfilePhoto = null;
	}

	get rolesInputValue() {
		return this.rolesSelectionPresenter.itemsLabels;
	}

	onRolesInputPressed = () => this.rolesSelectionPresenter.setIsRolesSelectionModalVisible( true )

	get rolesInputError() {
		if ( this._showRolesInputError ) return 'This field is mandatory.';
		return null;
	}

	get _showRolesInputError() {
		return !this.rolesInputValue && this.rolesSelectionPresenter.modalWasOpened;
	}

	get _hasUnsavedChanges() {
		return this._formIsDirty || !!this._newProfilePhoto
			|| this.credentialsPresenter.certificatesHaveChanged
			|| this.credentialsPresenter.ratingsHaveChanged
			|| this.communityTagsPresenter.communityTagsHaveChanged
			|| this.rolesSelectionPresenter.rolesHaveChanged;
	}

	get _formIsDirty() {
		const {
			firstName, lastName, description, homeAirport, primaryAircraftId, totalHours
		} = this.form.values();
		return firstName !== this.pilot.firstName
			|| lastName !== this.pilot.lastName
			|| description !== ( this.pilot.description || '' )
			|| homeAirport !== ( this.pilot.homeAirport || '' )
			|| primaryAircraftId !== this.pilot.primaryAircraftId
			|| totalHours !== ( this.pilot.totalHours || '' );
	}

	_cancelButtonWasPressed() {
		if ( !this.rolesInputValue ) {
			this.rolesSelectionPresenter.modalWasOpened = true;
			return this.snackbarService.showInfo( { message: 'Please, add your roles.' } );
		}

		if ( ( this.rolesSelectionPresenter.rolesHaveChanged && !this._pilotHasRoles ) ) {
			return this.snackbarService.showInfo( { message: 'Please, save your changes.' } );
		}

		return this._hasUnsavedChanges
			? this._openDiscardChangesModal()
			: this._goBack();
	}

	get _pilotHasRoles() {
		return this.pilot?.roles.length;
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this._goBack(),
			confirmationModal: DISCARD_CHANGES_CONFIRMATION_MODAL,
			modalService: this.modalService
		} ).trigger();
	}

	_displayChangesSavedMessage() {
		this.snackbarService.showInfo( { message: 'Profile changes saved.' } );
	}

	_goBack() {
		this.navigation.goBack();
	}

	_autofillForm() {
		this.form.set( {
			firstName: this.pilot.firstName,
			lastName: this.pilot.lastName,
			description: this.pilot.description || '',
			homeAirport: this.pilot.homeAirport || '',
			primaryAircraftId: this.pilot.primaryAircraftId || null,
			totalHours: this.pilot.totalHours || ''
		} );
	}

	get _newProfilePhotoSource() {
		return { uri: this._newProfilePhoto.uri };
	}

	_onAircraftDeleted = ( aircraftId ) => {
		if ( this._formHasPrimaryAircraftId( aircraftId ) ) {
			this._setCurrentPrimaryAircraftIdInForm();
		}
	}

	_formHasPrimaryAircraftId( aircraftId ) {
		return aircraftId === this.form.values().primaryAircraftId;
	}

	_setCurrentPrimaryAircraftIdInForm() {
		this.form.set( { primaryAircraftId: this.pilot.primaryAircraftId } );
	}

	_updatePilot( form ) {
		const {
			firstName, lastName, description, homeAirport, primaryAircraftId, totalHours
		} = form.values();
		const profilePictureBase64 = this._newProfilePhoto?.base64;
		const certificates = this.credentialsPresenter.certificatesForWs();
		const customCertificates = this.credentialsPresenter.customCertificatesNames;
		const ratings = this.credentialsPresenter.ratingsForWs();
		const customRatings = this.credentialsPresenter.customRatingsNames;
		const communityTags = this.communityTagsPresenter.tags;
		const rolesIDs = this.rolesSelectionPresenter.itemsIDs;
		const customRoles = this.rolesSelectionPresenter.customRolesNames;

		return this.updatePilot.execute( this.pilot.id, {
			firstName,
			lastName,
			description,
			homeAirport,
			primaryAircraftId,
			totalHours,
			profilePictureBase64,
			certificates,
			customCertificates,
			ratings,
			customRatings,
			communityTags,
			rolesIDs,
			customRoles
		} );
	}

	_getDataForAnalytics( form ) {
		const {
			firstName, lastName, description, homeAirport, primaryAircraftId
		} = form.values();
		return {
			firstNameHasChanged: firstName !== this.pilot.firstName,
			lastNameHasChanged: lastName !== this.pilot.lastName,
			descriptionHasChanged: description !== ( this.pilot.description || '' ),
			homeAirportHasChanged: homeAirport !== ( this.pilot.homeAirport || '' ),
			primaryAircraftHasChanged: primaryAircraftId !== this.pilot.primaryAircraftId,
			certificatesHaveChanged: this.credentialsPresenter.certificatesHaveChanged,
			ratingsHaveChanged: this.credentialsPresenter.ratingsHaveChanged,
			communityTagsHaveChanged: this.communityTagsPresenter.communityTagsHaveChanged,
			newProfilePhoto: !!this._newProfilePhoto
		};
	}
}
