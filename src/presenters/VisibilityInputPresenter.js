import { VISIBILITY } from '../constants/formFields/postForm';
import { VISIBILITY_PICKER_MODAL } from '../constants/modals';
import { VISIBILITY_OPTIONS } from '../constants/visibilityOptions';

export default class VisibilityInputPresenter {
	constructor( {
		form,
		modalService
	} ) {
		this._form = form;
		this._modalService = modalService;
	}

	get selectedVisibility() {
		return this._selectedVisibility?.name || '';
	}

	inputWasPressed() {
		this._modalService.open(
			VISIBILITY_PICKER_MODAL, {
				data: VISIBILITY_OPTIONS,
				initialItem: this._selectedVisibility,
				onItemSelected: this._selectVisibilityAndCloseModal
			}
		);
	}

	get _selectedVisibility() {
		return VISIBILITY_OPTIONS.find( ( visibility ) => (
			visibility.value === this._selectedVisibilityId
		) );
	}

	get _selectedVisibilityId() {
		return this._form.$( VISIBILITY ).value;
	}

	_selectVisibilityAndCloseModal = ( visibility ) => {
		this._form.set( { visibility: visibility.value } );
		this._modalService.close( VISIBILITY_PICKER_MODAL );
	}
}
