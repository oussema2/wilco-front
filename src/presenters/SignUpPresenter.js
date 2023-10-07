import Form from '../forms/Form';
import { fieldsFirstStep, fieldsSecondStep } from '../forms/signUpFields';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import RolesSelectionPresenter from './RolesSelectionPresenter';

export default class SignUpPresenter {
	currentStep = 0;

	constructor( {
		signUpUser,
		fetchPilot,
		snackbarService,
		navigation,
		fetchRolesFromRemote,
		getRolesFromStore,
		modalService,
		analyticsService,
		makeAutoObservable
	} = {} ) {
		this._signUpUser = signUpUser;
		this._fetchPilot = fetchPilot;
		this._snackbarService = snackbarService;
		this._navigation = navigation;
		this._analyticsService = analyticsService;

		const formHooksFirstStep = {
			onSuccess: this.onSubmitFirsStep
		};

		const formHooksSecondStep = {
			onSuccess: this.onSubmitSuccess
		};

		this.formFirstStep = new Form( { fields: fieldsFirstStep }, { hooks: formHooksFirstStep } );
		this.formSecondStep = new Form( { fields: fieldsSecondStep }, { hooks: formHooksSecondStep } );
		this.currentForm = this.formFirstStep;
		this._isLoading = false;

		this.rolesSelectionPresenter = new RolesSelectionPresenter( {
			snackbarService,
			fetchRolesFromRemote,
			getRolesFromStore,
			modalService,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	get forms() {
		return [
			this.formFirstStep,
			this.formSecondStep
		];
	}

	get rolesValue() {
		return this.rolesSelectionPresenter.itemsLabels;
	}

	get title() {
		return 'Sign up';
	}

	get buttonTitle() {
		return 'Create account';
	}

	get isFirstStepSubmitButtonDisabled() {
		return !this.currentForm.isValid || !this.rolesValue;
	}

	get isSubmitButtonDisabled() {
		return !this.currentForm.isValid;
	}

	get showRoleInputError() {
		return !this.rolesValue && this.rolesSelectionPresenter.modalWasOpened;
	}

	get isLoading() {
		return this._isLoading;
	}

	get onBackButtonPressed() {
		if ( this.currentStep > 0 ) return () => this._setCurrentStep( this.currentStep - 1 );
		return () => this._navigation.goBack();
	}

	onNextClicked = () => {
		this.currentStep += 1;
	}

	onSubmitFirsStep = async ( ) => {
		this._setCurrentStep( this.currentStep + 1 );
	}

	onSubmitSuccess = async () => {
		this._setIsLoading( true );

		const attributes = {
			...this.formFirstStep.values(),
			...this.formSecondStep.values(),
			rolesIDs: this.rolesSelectionPresenter.itemsIDs,
			customRoles: this.rolesSelectionPresenter.customRolesNames
		};

		try {
			await this._signUpUser.execute( attributes );
			await this._fetchPilot.execute();
			this._analyticsService.logSignUp( attributes );
		} catch ( error ) {
			displayErrorInSnackbar( error, this._snackbarService, this._errorMessages() );
		} finally {
			this._setIsLoading( false );
		}
	}

	setCurrentForm( form ) {
		this.currentForm = form;
	}

	_setCurrentStep( step ) {
		this.currentStep = step;
		this.setCurrentForm( this.forms[ this.currentStep ] );
	}

	_setIsLoading( isLoading ) {
		this._isLoading = isLoading;
	}

	_errorMessages() {
		return {
			email_in_use: 'The entered email is already being used.'
		};
	}
}
