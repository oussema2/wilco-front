import querystring from 'query-string';
import Api from './Api';
import Pagination from '../entities/Pagination';

export default class EntityService {
	constructor( {
		api = new Api(),
		buildEntity,
		basePath
	} = {} ) {
		this.api = api;
		this.buildEntity = buildEntity;
		this.basePath = basePath;
		this.apiVersion = '1';
	}

	async delete( entityId ) {
		const entityResponse = await this.api.delete( `${this.baseEntityPath}/${entityId}` );
		return this.buildEntity( entityResponse );
	}

	async fetch( entityId ) {
		const entityResponse = await this.api.get( `${this.baseEntityPath}/${entityId}` );
		return this.buildEntity( entityResponse );
	}

	async fetchAll( pagination, params = {} ) {
		const queryParams = this._getQueryParam( pagination, params );
		const postsResponse = await this.api.get( `${this.baseEntityPath}?${queryParams}` );
		return {
			entities: postsResponse.map( ( entityJSON ) => this.buildEntity( entityJSON ) ),
			pagination: Pagination.fromJSON( {
				...postsResponse.pagination,
				per_page: this._perPage( pagination )
			} )
		};
	}

	async fetchAllNested( nestedEntityName, nestedEntityId, pagination ) {
		const queryParams = this._getQueryParam( pagination );
		const path = `${this.apiVersion}/${nestedEntityName}/${nestedEntityId}/${this.basePath}?${queryParams}`;
		const entitiesResponse = await this.api.get( path );
		return {
			entities: entitiesResponse.map( ( entityJSON ) => this.buildEntity( entityJSON ) ),
			pagination: Pagination.fromJSON( {
				...entitiesResponse.pagination,
				per_page: this._perPage( pagination )
			} )
		};
	}

	async patch( entityId, params ) {
		const entityResponse = await this.api.patch( `${this.baseEntityPath}/${entityId}`, params );
		return this.buildEntity( entityResponse );
	}

	get baseEntityPath() {
		return `${this.apiVersion}/${this.basePath}`;
	}

	_page( pagination ) {
		return ( pagination ) ? pagination.nextPage : 1;
	}

	_perPage( pagination ) {
		return ( pagination ) ? pagination.perPage : 999999;
	}

	_getQueryParam( pagination, params = {} ) {
		const queryParams = {
			page: this._page( pagination ),
			per_page: this._perPage( pagination ),
			...params
		};
		return querystring.stringify( queryParams );
	}
}
