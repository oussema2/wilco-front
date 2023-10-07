import { makeAutoObservable } from 'mobx';

export default class Pagination {
	constructor( {
		page = 0,
		totalPages = -1,
		perPage = 15,
		isFirstPage = true,
		isLastPage = false
	} = {} ) {
		this.page = page;
		this.totalPages = totalPages;
		this.perPage = perPage;
		this.isFirstPage = isFirstPage;
		this.isLastPage = isLastPage;

		makeAutoObservable( this );
	}

	reset() {
		this.setPage( 0 );
		this.setIsLastPage( false );
		this.setTotalPages( -1 );
	}

	resetLastPage() {
		this.setPage( this.page - 1 );
		this.setIsLastPage( false );
	}

	setPage( page ) {
		this.page = page;
	}

	setTotalPages( totalPages ) {
		this.totalPages = totalPages;
	}

	setIsLastPage( isLastPage ) {
		this.isLastPage = isLastPage;
	}

	get hasMorePages( ) {
		return ( ( this.page < this.totalPages || this.totalPages === -1 )
				&& !this.isLastPage );
	}

	get nextPage() {
		return this.page + 1;
	}

	static fromJSON( jsonPagination ) {
		return new Pagination( {
			page: jsonPagination.current,
			totalPages: jsonPagination.pages,
			isFirstPage: jsonPagination.first_page,
			isLastPage: jsonPagination.last_page,
			perPage: jsonPagination.per_page
		} );
	}
}
