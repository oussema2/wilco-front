import { action } from 'mobx';
import ErrorPresenterBuilder from '../Builders/ErrorPresenterBuilder';

const displayErrorInSnackbar = ( error, snackbarService, customMessages = {} ) => (
	snackbarService.showError( {
		message: new ErrorPresenterBuilder( { customMessages } ).forError( error ).presentError()
	} )
);

export default action( displayErrorInSnackbar );
