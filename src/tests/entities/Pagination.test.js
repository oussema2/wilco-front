import Pagination from '../../entities/Pagination';

describe( 'Pagination entity', () => {
	let pagination;

	const paginationJSON = {
		current: 1,
		pages: 10,
		first_page: true,
		last_page: false,
		per_page: 10
	};

	beforeEach( () => {
		jest.clearAllMocks();
		pagination = Pagination.fromJSON( paginationJSON );
	} );

	describe( 'constructor', () => {
		it( 'creates pagination by default', () => {
			const _pagination = new Pagination();
			expect( _pagination.page ).toBe( 0 );
			expect( _pagination.totalPages ).toBe( -1 );
			expect( _pagination.perPage ).toBe( 15 );
			expect( _pagination.isFirstPage ).toBe( true );
			expect( _pagination.isLastPage ).toBe( false );
		} );
	} );

	describe( 'fromJSON', () => {
		it( 'creates the pagination with the correct properties', () => {
			expect( pagination.page ).toEqual( 1 );
			expect( pagination.totalPages ).toEqual( 10 );
			expect( pagination.isFirstPage ).toEqual( true );
			expect( pagination.isLastPage ).toEqual( false );
			expect( pagination.perPage ).toEqual( 10 );
		} );
	} );

	describe( 'reset()', () => {
		beforeEach( () => {
			jest.clearAllMocks();
			pagination = Pagination.fromJSON( paginationJSON );
			pagination.reset();
		} );

		it( 'resets pagination', () => {
			expect( pagination.page ).toEqual( 0 );
			expect( pagination.isLastPage ).toEqual( false );
			expect( pagination.totalPages ).toEqual( -1 );
		} );
	} );

	describe( 'resetLastPage()', () => {
		beforeEach( () => {
			jest.clearAllMocks();
			pagination = Pagination.fromJSON( paginationJSON );
			pagination.resetLastPage();
		} );

		it( 'resets last page', () => {
			expect( pagination.page ).toEqual( paginationJSON.current - 1 );
			expect( pagination.isLastPage ).toEqual( false );
		} );
	} );

	describe( 'setPage()', () => {
		const expectedPage = 2;
		beforeEach( () => {
			jest.clearAllMocks();
			pagination = Pagination.fromJSON( paginationJSON );
			pagination.setPage( expectedPage );
		} );

		it( 'resets page number', () => {
			expect( pagination.page ).toEqual( expectedPage );
		} );
	} );

	describe( 'hasMorePages()', () => {
		describe( 'when lastPage is false', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				pagination = Pagination.fromJSON( paginationJSON );
			} );

			it( 'returns true', () => {
				expect( pagination.hasMorePages ).toEqual( true );
			} );
		} );

		describe( 'when lastPage is true', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				pagination = Pagination.fromJSON( paginationJSON );
				pagination.setIsLastPage( true );
			} );

			it( 'returns false', () => {
				expect( pagination.hasMorePages ).toEqual( false );
			} );
		} );

		describe( 'when page number is bigger than totalPages number', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				pagination = Pagination.fromJSON( paginationJSON );
				pagination.setTotalPages( 1 );
				pagination.setPage( 2 );
			} );

			it( 'returns false', () => {
				expect( pagination.hasMorePages ).toEqual( false );
			} );
		} );

		describe( 'when totalPages number has a negative value and lastPage is false', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				pagination = Pagination.fromJSON( paginationJSON );
				pagination.setTotalPages( -1 );
				pagination.setIsLastPage( false );
			} );

			it( 'returns true', () => {
				expect( pagination.hasMorePages ).toEqual( true	);
			} );
		} );

		describe( 'when totalPages has a negative value and lastPage is true', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				pagination = Pagination.fromJSON( paginationJSON );
				pagination.setTotalPages( -1 );
				pagination.setIsLastPage( true );
			} );

			it( 'returns false', () => {
				expect( pagination.hasMorePages ).toEqual( false	);
			} );
		} );
	} );

	describe( 'nextPage()', () => {
		const expectedPage = 2;
		beforeEach( () => {
			jest.clearAllMocks();
			pagination = Pagination.fromJSON( paginationJSON );
		} );

		it( 'returns next page number', () => {
			expect( pagination.nextPage ).toEqual( expectedPage );
		} );
	} );
} );
