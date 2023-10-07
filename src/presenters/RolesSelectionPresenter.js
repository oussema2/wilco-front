import { delay } from 'lodash';
import Form from '../forms/Form';
import fields from '../forms/rolesSelectionFields';
import noop from '../helpers/noop';
import { OTHER } from '../constants/formFields/rolesSelectionForm';
import { reduceSpaces } from '../helpers/strings';
import { compareArrays } from '../helpers/arrays';
import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import { DISCARD_CHANGES_CONFIRMATION_MODAL } from '../constants/modals';

export default class RolesSelectionPresenter {
	isRolesSelectionModalVisible = false;

	modalWasOpened = false;

	constructor( {
		initialRoles = [],
		snackbarService,
		fetchRolesFromRemote,
		getRolesFromStore,
		modalService,
		makeAutoObservable
	} = {} ) {
		this._initialRoles = initialRoles;
		this._selectedItems = [];
		this._snackbarService = snackbarService;
		this._fetchRolesFromRemote = fetchRolesFromRemote;
		this._getRolesFromStore = getRolesFromStore;
		this._items = [];
		this.form = new Form( { fields } );
		this._otherOptionText = '';
		this._isLoadingRoles = false;
		this._modalService = modalService;

		makeAutoObservable( this );

		this._autofillForm();

		this._fetchRoles();
	}

	setIsRolesSelectionModalVisible( value ) {
		if ( value ) {
			const { other } = this.form.values();
			this._otherOptionText = other;
			delay( () => this.setModalWasOpened( true ), 200 );
		}
		this.isRolesSelectionModalVisible = value;
	}

	setModalWasOpened( modalWasOpened ) {
		this.modalWasOpened = modalWasOpened;
	}

	onSelectionsChange = ( selectedItems ) => {
		this._selectedItems = selectedItems;
	};

	get onSaveButtonPressed() {
		if ( this.hasAnyRoleSelected ) {
			return this.saveSelection;
		}
		return noop;
	}

	backArrowButtonPressed = () => {
		if ( this.unsavedChanges ) {
			return this._openDiscardChangesModal();
		}
		return this.navigationBack();
	}

	get unsavedChanges() {
		return ( this._items !== this._selectedItems ) || this.form.changed;
	}

	navigationBack() {
		this.setIsRolesSelectionModalVisible( false );
		this._resetSelection();
	}

	saveSelection = () => {
		this._items = this._selectedItems;
		this.setIsRolesSelectionModalVisible( false );
	}

	get selectedItems() {
		return this._selectedItems;
	}

	get hasAnyRoleSelected() {
		return this._hasAnyItemSelected || this._hasOtherRoleTyped;
	}

	get itemsLabels() {
		const { other } = this.form.values();
		return this.items
			?.map( ( item ) => ( ( item.label === 'Other' ) ? other : item.label ) )
			.join( ', ' );
	}

	get items() {
		return this._items;
	}

	get itemsIDs() {
		return this._items.filter( ( role ) => role.value ).map( ( role ) => role.value );
	}

	get customRolesNames() {
		if ( !this.isOtherOptionSelected ) return [];
		const { other } = this.form.values();
		return other.split( ',' ).map( ( customRole ) => reduceSpaces( customRole.trim() ) );
	}

	get isOtherOptionSelected() {
		return this.selectedItems.some( ( role ) => role.label === 'Other' );
	}

	get rolesFromStore() {
		const rolesFromStore = this._getRolesFromStore.execute();
		return [ ...rolesFromStore, this._otherOption ]
			?.map( ( item ) => ( { value: item.id, label: item.name } ) );
	}

	get rolesHaveChanged() {
		return this._predefinedRolesHasChanged || this._customRolesHasChanged;
	}

	get _predefinedRolesHasChanged() {
		const selectedDefaultRolesIDs = this._getArrayOfIds( this._selectedDefaultRoles );
		const initialDefaultRolesIDs = this._getArrayOfIds( this._initialDefaultRoles );
		return !compareArrays( selectedDefaultRolesIDs, initialDefaultRolesIDs );
	}

	get _customRolesHasChanged() {
		const { other } = this.form.values();
		return other !== this._initialCustomRoles
			|| ( this._initialCustomRoles && !this.isOtherOptionSelected );
	}

	_getArrayOfIds( array ) {
		return array.map( ( val ) => val.value );
	}

	async _fetchRoles() {
		this._setIsLoadingRoles( true );
		try {
			await this._fetchRolesFromRemote.execute();
		} finally {
			this._setIsLoadingRoles( false );
		}
	}

	_setIsLoadingRoles( isLoadingRoles ) {
		this._isLoadingRoles = isLoadingRoles;
	}

	get _hasAnyItemSelected() {
		return this._selectedItems.length > 0 && !this.isOtherOptionSelected;
	}

	get _hasOtherRoleTyped() {
		return this.isOtherOptionSelected && this.form.isValid;
	}

	get _otherOption() {
		return { name: 'Other' };
	}

	_resetSelection = () => {
		this._selectedItems = this._items;
		this.form.$( OTHER ).set( this._otherOptionText );
	}

	_autofillForm() {
		this._autofillDefaultRoles();
		this._autofillCustomRoles();
		this.saveSelection();
	}

	_autofillDefaultRoles() {
		this.onSelectionsChange( this._initialDefaultRoles );
	}

	_autofillCustomRoles() {
		const customRoles = this._initialCustomRoles;
		if ( customRoles ) {
			this._selectedItems.push( { label: 'Other' } );
			this.form.$( OTHER ).set( customRoles );
		}
	}

	get _selectedDefaultRoles() {
		return this._selectedItems.filter( ( item ) => item.label !== 'Other' );
	}

	get _initialDefaultRoles() {
		return this._initialRoles
			.filter( ( item ) => !item.custom )
			.map( ( item ) => ( { value: item.id, label: item.name } ) );
	}

	get _initialCustomRoles() {
		return this._initialRoles
			.filter( ( item ) => item.custom ).map( ( item ) => ( item.name ) ).join( ', ' );
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this.navigationBack(),
			confirmationModal: DISCARD_CHANGES_CONFIRMATION_MODAL,
			modalService: this._modalService
		} ).trigger();
	}
}
