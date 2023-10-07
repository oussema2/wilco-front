import { compareArrays } from '../helpers/arrays';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import Form from '../forms/Form';
import fields from '../forms/editCredentialsFields';
import { reduceSpaces } from '../helpers/strings';

export default class CredentialsPresenter {
	constructor( {
		pilot,
		fetchCredentialsFromRemote,
		snackbarService,
		makeAutoObservable
	} = {} ) {
		this.pilot = pilot;
		this.fetchCredentialsFromRemote = fetchCredentialsFromRemote;
		this.snackbarService = snackbarService;
		this.selectedCertificates = [];
		this.certificatesList = [];
		this.selectedRatings = [];
		this.ratingsList = [];
		this.isLoadingCredentials = false;
		this.form = new Form( { fields } );

		makeAutoObservable( this );

		this._fetchCredentials();
		this._autofillFormInputs();
	}

	get certificates() {
		return this.certificatesList;
	}

	get ratings() {
		return this.ratingsList;
	}

	onSelectionsCertificatesChange = ( selectedCertificates ) => {
		this.selectedCertificates = selectedCertificates;
	};

	onSelectionsRatingsChange = ( selectedRatings ) => {
		this.selectedRatings = selectedRatings;
	};

	_certificatesChange = ( certificatesList ) => {
		this.certificatesList = certificatesList;
	};

	_ratingsChange = ( ratingsList ) => {
		this.ratingsList = ratingsList;
	};

	get certificatesHaveChanged() {
		return this._selectionHasChanged( this.selectedCertificates, this.pilot.certificates )
			|| this._otherOptionHasChanged( this.form.values().certificatesOther,
				this._initialCredentials( this.pilot.certificates ),
				this.isOptionOtherSelectedCertificates );
	}

	get ratingsHaveChanged() {
		return this._selectionHasChanged( this.selectedRatings, this.pilot.ratings )
			|| this._otherOptionHasChanged(
				this.form.values().ratingsOther,
				this._initialCredentials( this.pilot.ratings ),
				this.isOptionOtherSelectedRatings );
	}

	_otherOptionHasChanged( value, defaultValue, isSelected ) {
		return value !== defaultValue && isSelected;
	}

	_selectionHasChanged( selectedItems, initialSelectedItems ) {
		const arr1 = this._getArrayOfIds( selectedItems );
		const arr2 = this._getArrayOfIds( this._dataToComponent( initialSelectedItems ) );
		return !compareArrays( arr1, arr2 );
	}

	_getArrayOfIds( array ) {
		return array.map( ( val ) => val.value || val );
	}

	dataToComponent( credentials ) {
		const certificates = this._dataToComponent( credentials.certificates );
		const ratings = this._dataToComponent( credentials.ratings );
		this._certificatesChange( certificates );
		this._ratingsChange( ratings );
	}

	_dataToComponent( list ) {
		return	list.map( ( item ) => ( {
			value: item.id,
			label: item.name
		} ) );
	}

	certificatesForWs() {
		return	this._dataToWs( this.selectedCertificates );
	}

	ratingsForWs() {
		return	this._dataToWs( this.selectedRatings );
	}

	autofillForm() {
		this.selectedCertificates = this._getSelectedPredefinedCredentials( this.pilot.certificates );
		this.selectedRatings = this._getSelectedPredefinedCredentials( this.pilot.ratings );
	}

	_getSelectedPredefinedCredentials( credentials ) {
		return this._dataToComponent( credentials.filter( ( item ) => !item.custom ) );
	}

	_dataToWs( list ) {
		return	list.map( ( item ) => item.value );
	}

	async _fetchCredentials() {
		try {
			this._setIsLoadingCredentials( true );
			const credentials = await this.fetchCredentialsFromRemote.execute( );
			this.dataToComponent( credentials );
			this.autofillForm( );
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setIsLoadingCredentials( false );
		}
	}

	get isLoading() {
		return this.isLoadingCredentials;
	}

	_setIsLoadingCredentials( isLoadingCredentials ) {
		this.isLoadingCredentials = isLoadingCredentials;
	}

	isOptionOtherSelected( list ) {
		return list.some( ( item ) => item.label === 'Other' );
	}

	get isOptionOtherSelectedCertificates() {
		return this.isOptionOtherSelected( this.selectedCertificates );
	}

	get isOptionOtherSelectedRatings() {
		return this.isOptionOtherSelected( this.selectedRatings );
	}

	get isValid() {
		return this.form.isValid;
	}

	customNames( isOtherOptionSelected, value ) {
		if ( !isOtherOptionSelected ) return [];
		return value.split( ',' ).map( ( customValue ) => reduceSpaces( customValue.trim() ) );
	}

	get customCertificatesNames() {
		return this.customNames( this.isOptionOtherSelectedCertificates,
			this.form.values().certificatesOther );
	}

	get customRatingsNames() {
		return this.customNames( this.isOptionOtherSelectedRatings,
			this.form.values().ratingsOther );
	}

	_initialCredentials( credentials ) {
		return credentials.filter( ( item ) => item.custom ).map( ( item ) => item.name ).join( ', ' );
	}

	_autofillFormInputs() {
		this.form.set( {
			certificatesOther: this._initialCredentials( this.pilot.certificates ),
			ratingsOther: this._initialCredentials( this.pilot.ratings )
		} );
	}
}
