import noop from '../../helpers/noop';
import RolesSelectionPresenter from '../../presenters/RolesSelectionPresenter';
import RoleFactory from '../factories/RoleFactory';

describe( 'RolesSelectionPresenter', () => {
	let presenter;
	const snackbarService = { showInfo: jest.fn() };
	const fetchRolesFromRemote = { execute: jest.fn() };
	const getRolesFromStore = { execute: jest.fn() };
	const customRoles = 'role 1, role 2';

	const createPresenter = ( params ) => {
		presenter = new RolesSelectionPresenter( {
			snackbarService,
			fetchRolesFromRemote,
			getRolesFromStore,
			makeAutoObservable: noop,
			...params
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		createPresenter();
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter._snackbarService ).toEqual( snackbarService );
			expect( fetchRolesFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( 'selectedItems()', () => {
		it( 'gets selected items', () => {
			const selectedRoles = [ { value: 1, name: 'test' } ];
			presenter.onSelectionsChange( [ { value: 1, name: 'test' } ] );
			expect( presenter.selectedItems ).toEqual( selectedRoles );
		} );
	} );

	describe( 'setIsRolesSelectionModalVisible()', () => {
		describe( 'when modal is not visible', () => {
			it( 'returns false', () => {
				presenter.setIsRolesSelectionModalVisible( false );
				expect( presenter.isRolesSelectionModalVisible ).toBe( false );
			} );
		} );

		describe( 'when modal is visible', () => {
			it( 'returns true', () => {
				presenter.setIsRolesSelectionModalVisible( true );
				expect( presenter.isRolesSelectionModalVisible ).toBe( true );
			} );
		} );
	} );

	describe( 'onSaveButtonPressed()', () => {
		describe( 'when there are any role selected', () => {
			it( 'returns false', () => {
				const roles = RoleFactory.buildList( 2 )
					.map( ( item ) => ( { value: item.id, label: item.name } ) );

				presenter.onSelectionsChange( roles );
				presenter.onSaveButtonPressed();

				expect( presenter.items ).toBe( roles );
				expect( presenter.isRolesSelectionModalVisible ).toBe( false );
			} );
		} );

		describe( 'when there are not any role selected', () => {
			it( 'returns false', () => {
				const roles = [];
				presenter.onSelectionsChange( roles );
				presenter.onSaveButtonPressed();

				expect( presenter.items ).toEqual( roles );
				expect( presenter.isRolesSelectionModalVisible ).toBe( false );
			} );
		} );
	} );

	describe( 'isOtherOptionSelected()', () => {
		describe( 'when other option is selected', () => {
			it( 'returns true', () => {
				const roles = [ { label: 'Other' } ];
				presenter.onSelectionsChange( roles );

				expect( presenter.isOtherOptionSelected ).toBe( true );
			} );
		} );

		describe( 'when "other" option is not selected', () => {
			it( 'returns true', () => {
				const roles = [ { label: 'Other 2' } ];
				presenter.onSelectionsChange( roles );

				expect( presenter.isOtherOptionSelected ).toBe( false );
			} );
		} );
	} );

	describe( '@backArrowButtonPressed', () => {
		it( 'closes modal', () => {
			presenter.backArrowButtonPressed();
			expect( presenter.isRolesSelectionModalVisible ).toBe( false );
		} );
	} );

	describe( 'itemsLabels()', () => {
		beforeEach( () => presenter.form.set( { other: customRoles } ) );

		it( 'returns only label with other typed roles', () => {
			const predefinedRoles = RoleFactory.buildList( 2 );

			const roles = [ ...predefinedRoles, { name: 'Other' } ]
				.map( ( item ) => ( { value: item.id, label: item.name } ) );

			presenter.onSelectionsChange( roles );
			presenter.saveSelection();

			const expected = `${roles[ 0 ].label}, ${roles[ 1 ].label}, ${customRoles}`;
			expect( presenter.itemsLabels ).toEqual( expected );
		} );
	} );

	describe( 'rolesFromStore()', () => {
		const roles = RoleFactory.buildList( 3 );
		const otherRole = { name: 'Other' };

		beforeEach( () => {
			getRolesFromStore.execute.mockImplementationOnce( () => roles );
		} );

		it( 'returns roles options', () => {
			const expected = [ ...roles, otherRole ]
				.map( ( item ) => ( { value: item.id, label: item.name } ) );

			expect( presenter.rolesFromStore ).toEqual( expected );
		} );
	} );

	describe( 'hasAnyRoleSelected()', () => {
		describe( 'when user select "other" option and type custom roles on input', () => {
			it( 'returns true', async () => {
				const roles = [ { label: 'Other' } ];
				presenter.form.set( { other: customRoles } );
				await presenter.form.validate();

				presenter.onSelectionsChange( roles );
				presenter.saveSelection();

				expect( presenter.hasAnyRoleSelected ).toBe( true );
			} );
		} );

		describe( 'when user select "other" option and no type any custom roles', () => {
			it( 'returns false', async () => {
				const roles = [ { label: 'Other' } ];
				presenter.form.set( { other: '' } );
				await presenter.form.validate();

				presenter.onSelectionsChange( roles );
				presenter.saveSelection();

				expect( presenter.hasAnyRoleSelected ).toBe( false );
			} );
		} );

		describe( 'when user select only predefined options', () => {
			it( 'returns true', async () => {
				const roles = RoleFactory.buildList( 4 )
					.map( ( item ) => ( {
						value: item.id,
						label: item.name
					} ) );

				presenter.onSelectionsChange( roles );
				presenter.onSaveButtonPressed();

				expect( presenter.hasAnyRoleSelected ).toBe( true );
			} );
		} );
	} );

	describe( 'itemsIDs()', () => {
		it( 'returns selected roles IDs', () => {
			const roles = RoleFactory.buildList( 4 )
				.map( ( item ) => ( {
					value: item.id,
					label: item.name
				} ) );

			presenter.onSelectionsChange( roles );
			presenter.onSaveButtonPressed();

			const expectedIDs = presenter.items
				.filter( ( role ) => role.value )
				.map( ( role ) => role.value );

			expect( presenter.itemsIDs ).toEqual( expectedIDs );
		} );
	} );

	describe( 'customRolesNames()', () => {
		describe( 'when the user check "other" option', () => {
			it( 'returns array of custom roles', () => {
				const roles = [ { label: 'Other' } ];
				presenter.form.set( { other: customRoles } );
				presenter.onSelectionsChange( roles );

				expect( presenter.customRolesNames ).toEqual( [ 'role 1', 'role 2' ] );
			} );
		} );

		describe( 'when the user does not check "other" option', () => {
			it( 'returns empty array', () => {
				const roles = [ { value: 1, label: 'Roles 1' } ];
				presenter.form.set( { other: customRoles } );
				presenter.onSelectionsChange( roles );

				expect( presenter.customRolesNames ).toEqual( [] );
			} );
		} );
	} );

	describe( 'when presenter has initial roles', () => {
		const predefinedRoles = RoleFactory.buildList( 2 );
		const customRole = RoleFactory.build( { custom: true } );

		beforeEach( () => {
			createPresenter( { initialRoles: [ ...predefinedRoles, customRole ] } );
		} );

		it( 'autofills all roles values', () => {
			const expectedItems = predefinedRoles.map( ( item ) => ( {
				value: item.id,
				label: item.name
			} ) );

			const { other } = presenter.form.values();

			expect( presenter.items ).toEqual( [ ...expectedItems, { label: 'Other' } ] );
			expect( other ).toEqual( customRole.name );
		} );
	} );

	describe( 'setModalWasOpened()', () => {
		it( 'sets new value to modalWasOpened', () => {
			const expectedValue = true;
			presenter.setModalWasOpened( expectedValue );
			expect( presenter.modalWasOpened ).toBe( expectedValue );
		} );
	} );
} );
