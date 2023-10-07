import Form from '../forms/Form';
import fields from '../forms/aircraftFields';

export default class AircraftFormPresenter {
	constructor( {
		initialValues,
		onSubmitSuccess,
		makeAutoObservable
	} ) {
		this._newAircraftPhoto = null;
		const formHooks = { onSuccess: onSubmitSuccess };
		this.form = new Form( { fields }, { hooks: formHooks } );
		makeAutoObservable( this );
		this._initialPhotoSource = null;
		if ( initialValues ) this._fillInitialValues( initialValues );
	}

	get isSubmitButtonDisabled() {
		return this._formIsInvalid || !this._formIsDirty;
	}

	onAvatarChange( asset ) {
		this._newAircraftPhoto = asset;
	}

	get avatarSource() {
		return this._newAircraftPhoto ? { uri: this._newAircraftPhoto.uri } : this._initialPhotoSource;
	}

	get avatarBase64() {
		return this._newAircraftPhoto?.base64;
	}

	get newAircraftPhoto() {
		return this._newAircraftPhoto;
	}

	get _formIsInvalid() {
		return !this.form.isValid;
	}

	get _formIsDirty() {
		if ( !this._initialValues ) return true;
		const { makeAndModel, tailNumber } = this.form.values();
		const {
			makeAndModel: initialMakeAndModel, tailNumber: initialTailNumber
		} = this._initialValues;
		return makeAndModel !== initialMakeAndModel
			|| tailNumber !== initialTailNumber
			|| this._newAircraftPhoto !== null;
	}

	_fillInitialValues( { makeAndModel, tailNumber, photoUri } ) {
		this._initialValues = { makeAndModel, tailNumber };
		this.form.set( { makeAndModel, tailNumber } );
		if ( photoUri ) {
			this._initialPhotoSource = { uri: photoUri };
		}
	}
}
