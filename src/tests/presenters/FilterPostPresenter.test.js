import noop from '../../helpers/noop';
import FilterPostsPresenter from '../../presenters/FilterPostsPresenter';
import CommunityTagFactory from '../factories/CommunityTagFactory';
import flushPromises from '../support/flushPromises';
import MockModalService from '../mocks/MockModalService';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import {
	DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL
} from '../../constants/modals';

describe( 'FilterPostPresenter.test.js', () => {
	let presenter;
	const snackbarService = { showInfo: jest.fn() };
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };
	const analyticsService = { logApplyFilter: jest.fn() };
	const onRefresh = jest.fn();
	const communities = CommunityTagFactory.buildList( 5 );
	const modalService = new MockModalService();
	getCommunityTagsFromStore.execute.mockReturnValue( communities );

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new FilterPostsPresenter( {
			snackbarService,
			modalService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			onRefresh,
			analyticsService,
			makeAutoObservable: noop
		} );

		presenter.onSelectionsChange( communities );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter._snackbarService ).toEqual( snackbarService );
			expect( fetchCommunityTagsFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( 'selectedItems()', () => {
		it( 'gets selected items', () => {
			expect( presenter.selectedItems ).toEqual( communities );
		} );
	} );

	describe( 'clearSelection()', () => {
		it( 'clears selected items', () => {
			presenter.clearSelection();
			expect( presenter.selectedItems ).toEqual( [] );
		} );
	} );

	describe( 'setIsFilterModalVisible()', () => {
		describe( 'when modal is not visible', () => {
			it( 'returns false', () => {
				expect( presenter.isFilterModalVisible ).toBe( false );
			} );
		} );

		describe( 'when modal is visible', () => {
			it( 'returns true', () => {
				presenter.setIsFilterModalVisible( true );
				expect( presenter.isFilterModalVisible ).toBe( true );
			} );

			it( 'calls to fetchCommunityTagsFromRemote', () => {
				presenter.setIsFilterModalVisible( true );
				expect( fetchCommunityTagsFromRemote.execute ).toHaveBeenCalled();
			} );
		} );
	} );

	describe( 'selectAll()', () => {
		it( 'selects all community tags', () => {
			presenter.selectAll();
			const expected = communities.map( ( item ) => ( { value: item.id, label: item.name } ) );
			expect( presenter.selectedItems ).toEqual( expected );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when it did not finish fetching the community tags from remote', () => {
			it( 'returns true', () => {
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when it finished fetching the community tags from remote', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isLoading ).toBe( false );
			} );
		} );
	} );

	describe( 'applySelection()', () => {
		it( 'sets selectedItem as items', () => {
			presenter.applySelection();
			expect( presenter.items ).toEqual( presenter.selectedItems );
		} );

		it( 'calls to onRefresh callback', () => {
			presenter.applySelection();
			expect( onRefresh ).toHaveBeenCalled();
		} );

		it( 'logs apply filter event', () => {
			presenter.applySelection();
			expect( analyticsService.logApplyFilter ).toHaveBeenCalled();
		} );
	} );

	describe( 'removeTag()', () => {
		it( 'removes tag correctly', () => {
			const tags = CommunityTagFactory
				.buildList( 2 )
				.map( ( item ) => ( { value: item.id, label: item.name } ) );

			presenter.onSelectionsChange( tags );
			presenter.applySelection();

			expect( presenter.items ).toEqual( tags );

			presenter.removeTag( tags[ 0 ].label );
			const expected = tags.filter( ( e ) => e.value !== tags[ 0 ].value );

			expect( presenter.items ).toEqual( expected );
		} );
	} );

	describe( 'itemsLabels()', () => {
		it( 'returns only label', () => {
			const tags = CommunityTagFactory
				.buildList( 2 )
				.map( ( item ) => ( { value: item.id, label: item.name } ) );

			presenter.onSelectionsChange( tags );
			presenter.applySelection();

			const expected = tags.map( ( item ) => item.label );

			expect( presenter.itemsLabels ).toEqual( expected );
		} );
	} );

	describe( '@hasAnyTag', () => {
		describe( 'without tags', () => {
			beforeEach( () => {
				presenter.onSelectionsChange( [] );
				presenter.applySelection();
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyTag ).toBeFalsy( );
			} );
		} );

		describe( 'with tags', () => {
			beforeEach( () => {
				const tags = CommunityTagFactory
					.buildList( 2 );

				presenter.onSelectionsChange( tags );
				presenter.applySelection();
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyTag ).toBeTruthy( );
			} );
		} );
	} );

	describe( '@backArrowHeaderButton', () => {
		describe( 'when no community was selected and applied as filter yet', () => {
			describe( 'when a user select a community of the list of communities', () => {
				beforeEach( () => {
					presenter.setIsFilterModalVisible( true );
					presenter.onSelectionsChange( [ communities[ 0 ] ] );
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.backArrowHeaderButton(),
					modal: DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL,
					modalService,
					snackbarService,
					actionExpect: () => {
						expect( presenter.isFilterModalVisible ).toBe( false );
					}
				} );
			} );

			describe( 'when a user does not select any community of the list of communities', () => {
				beforeEach( () => {
					presenter.setIsFilterModalVisible( true );
					presenter.onSelectionsChange( [] );
					presenter.backArrowHeaderButton();
				} );

				it( 'the modal dissapears', () => {
					expect( presenter.isFilterModalVisible ).toBe( false );
				} );
			} );
		} );

		describe( 'when a community was already selected and applied as filter', () => {
			describe( 'when a user select a new community of the list of communities', () => {
				beforeEach( () => {
					presenter.onSelectionsChange( [ communities[ 0 ] ] );
					presenter.applySelection();
					presenter.setIsFilterModalVisible( true );
					presenter.onSelectionsChange( [ communities[ 0 ], communities[ 1 ] ] );
					presenter.backArrowHeaderButton();
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.backArrowHeaderButton(),
					modal: DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL,
					modalService,
					snackbarService,
					actionExpect: () => {
						expect( presenter.isFilterModalVisible ).toBe( false );
					}
				} );
			} );

			describe( 'when a user does not select any new community of the list of communities', () => {
				beforeEach( () => {
					presenter.onSelectionsChange( [ communities[ 0 ] ] );
					presenter.applySelection();
					presenter.setIsFilterModalVisible( true );
					presenter.backArrowHeaderButton();
				} );

				it( 'the modal dissapears', () => {
					expect( presenter.isFilterModalVisible ).toBe( false );
				} );
			} );
		} );
	} );
} );
