import noop from '../../helpers/noop';
import CommunityTagsPresenter from '../../presenters/CommunityTagsPresenter';
import flushPromises from '../support/flushPromises';

describe( 'CommunityTagsPresenter', () => {
	let presenter;
	const initialCommunityTags = [];
	const maxTags = 10;
	const snackbarService = { showInfo: jest.fn() };
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };
	const placeholder = 'Placeholder text';

	const addTags = () => {
		Array.from( Array( maxTags ) ).forEach( ( x, i ) => {
			presenter.addNewTag( i.toString() );
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new CommunityTagsPresenter( {
			initialCommunityTags,
			placeholder,
			snackbarService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			makeAutoObservable: noop,
			maxTags
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter._initialCommunityTags ).toEqual( initialCommunityTags );
			expect( presenter._snackbarService ).toEqual( snackbarService );
		} );
	} );

	describe( '@tags', () => {
		it( 'returns a tags', () => {
			const tag = 'New tag';
			presenter.addNewTag( tag );
			expect( presenter.tags ).toEqual( [ tag ] );
		} );
	} );

	describe( '@addNewTag', () => {
		describe( 'when array tags are empty', () => {
			it( 'adds new tag to array tags', () => {
				presenter._setTags( [] );
				presenter.addNewTag( 'New tag' );
				expect( presenter.tags ).toEqual( [ 'New tag' ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when tag already exists', () => {
			it( 'doesn\'t add a tag and shows a snackbar', () => {
				presenter._setTags( [] );
				const tag = 'New tag';
				presenter.addNewTag( tag );
				presenter.addNewTag( tag );

				expect( presenter.tags ).toEqual( [ tag ] );
				expect( presenter.tags ).not.toEqual( [ tag, tag ] );
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: `${tag} was already added.` } );
			} );
		} );

		describe( 'when tag already exists in the store', () => {
			beforeEach( () => {
				getCommunityTagsFromStore.execute.mockReturnValueOnce( [ { id: 1, name: 'tag 1' }, { id: 2, name: 'tag 2' } ] );

				jest.clearAllMocks();
				presenter = new CommunityTagsPresenter( {
					initialCommunityTags,
					placeholder,
					snackbarService,
					fetchCommunityTagsFromRemote,
					getCommunityTagsFromStore,
					makeAutoObservable: noop,
					maxTags: 10
				} );
			} );

			it( 'adds a tag with the name it has in the store', () => {
				const tag = 'Tag 1';
				presenter.addNewTag( tag );

				expect( presenter.tags ).toEqual( [ 'tag 1' ] );
				expect( presenter.tags ).not.toEqual( [ tag ] );
			} );
		} );

		describe( 'when tag is empty', () => {
			it( 'doesn\'t add a tag and shows a snackbar', () => {
				presenter._setTags( [] );
				const tag = '';
				presenter.addNewTag( tag );

				expect( presenter.tags ).toEqual( [ ] );
				expect( presenter.tags ).not.toEqual( [ tag ] );
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: 'The label shouldn\'t be empty.' } );
			} );
		} );

		describe( 'when selected tags count is equals to maximum allowed tags', () => {
			it( 'doesn\'t add a new tag', () => {
				const arrayTags = [];
				Array.from( Array( 10 ) ).forEach( ( x, i ) => {
					presenter.addNewTag( `label ${i}` );
					arrayTags.push( `label ${i}` );
				} );

				const tag = 'tag 11';
				presenter.addNewTag( tag );

				expect( presenter.tags ).toEqual( arrayTags );
				expect( presenter.hasError ).toBeTruthy();
			} );
		} );
	} );

	describe( '@removeTag', () => {
		describe( 'when array tags are empty', () => {
			it( 'does nothing', () => {
				presenter._setTags( [] );
				presenter.removeTag( 'New tag' );
				expect( presenter.tags ).toEqual( [ ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when only one tag exists', () => {
			it( 'removes that tag correctly', () => {
				const tag = 'New tag';
				presenter._setTags( [] );
				presenter._setTags( [ tag ] );
				expect( presenter.tags ).toEqual( [ tag ] );
				presenter.removeTag( tag );

				expect( presenter.tags ).toEqual( [ ] );
				expect( presenter.tags ).not.toEqual( [ tag ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'When more than one tag exists', () => {
			it( 'removes a tag correctly', () => {
				presenter._setTags( [] );
				const tag = 'New tag';
				const otherTag = 'Other new tag';
				presenter._setTags( [ tag, otherTag ] );
				expect( presenter.tags ).toEqual( [ tag, otherTag ] );

				presenter.removeTag( tag );

				expect( presenter.tags ).toEqual( [ otherTag ] );
				expect( presenter.tags ).not.toEqual( [ tag, otherTag ] );
				expect( snackbarService.showInfo ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@titleText', () => {
		it( 'returns a title text', () => {
			expect( presenter.titleText ).toEqual( 'Communities' );
		} );
	} );

	describe( '@placeholderText', () => {
		it( 'returns a placeholder text', () => {
			expect( presenter.placeholderText ).toEqual( placeholder );
		} );
	} );

	describe( '@communityTagsHaveChanged', () => {
		describe( 'when tags no changed', () => {
			it( 'returns false', () => {
				expect( presenter.communityTagsHaveChanged ).toEqual( false );
			} );
		} );

		describe( 'when tags have changed', () => {
			it( 'returns true', () => {
				presenter._setTags( [ 'Only this tag' ] );
				expect( presenter.communityTagsHaveChanged ).toEqual( true );
			} );
		} );
	} );

	describe( '@helperText', () => {
		it( 'returns a helper text', () => {
			expect( presenter.helperText ).toEqual( 'Add up to 10 communities.' );
		} );
	} );

	describe( '@isInputDisabled', () => {
		describe( 'when array tags are empty', () => {
			it( 'returns false', () => {
				expect( presenter.isInputDisabled ).toEqual( false );
			} );
		} );

		describe( 'when there 10 tags or more', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				addTags();
			} );

			it( 'returns true', () => {
				expect( presenter.isInputDisabled ).toEqual( true );
			} );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when it did not finish fetching the tags from remote', () => {
			it( 'returns true', () => {
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when it finished fetching the tags from remote', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isLoading ).toBe( false );
			} );
		} );
	} );

	describe( '@hasError', () => {
		describe( 'when users want to add more tags than limit', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				addTags();
				const tag = 'tag 11';
				presenter.addNewTag( tag );
			} );

			it( 'returns true', () => {
				expect( presenter.hasError ).toBe( true );
			} );
		} );

		describe( 'when user delete a tag', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				addTags();
				const tag = 'tag 11';
				presenter.addNewTag( tag );
			} );

			it( 'returns false', async () => {
				presenter.removeTag( 'tag 9' );
				expect( presenter.hasError ).toBe( false );
			} );
		} );
	} );

	describe( '@hasAnyTag', () => {
		describe( 'without tags', () => {
			it( 'returns false', () => {
				expect( presenter.hasAnyTag ).toBeFalsy( );
			} );
		} );

		describe( 'with tags', () => {
			beforeEach( () => {
				presenter.addNewTag( 'tag 1' );
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyTag ).toBeTruthy( );
			} );
		} );
	} );

	describe( 'when presenter has initial tags', () => {
		const tags = [ 'tag 1', 'tag 2' ];

		beforeEach( () => {
			jest.clearAllMocks();

			presenter = new CommunityTagsPresenter( {
				initialCommunityTags: tags,
				placeholder,
				snackbarService,
				fetchCommunityTagsFromRemote,
				getCommunityTagsFromStore,
				makeAutoObservable: noop,
				maxTags: 10
			} );
		} );

		it( 'sets initial tags as tags', () => {
			expect( presenter.tags ).toEqual( tags );
		} );
	} );
} );
