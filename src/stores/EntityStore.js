import {
	makeObservable, action, observable, computed
} from 'mobx';
import _ from 'lodash';
import { pushSorted } from '../helpers/arrays';

export default class EntityStore {
	constructor() {
		this.entities = [];

		makeObservable( this, {
			entities: observable,
			add: action,
			addToFront: action,
			update: action,
			updateAll: action,
			all: computed,
			delete: action,
			find: action
		} );
	}

	add( entity ) {
		this.entities.push( entity );
		return entity;
	}

	addToFront( entity ) {
		this.entities.unshift( entity );
		return entity;
	}

	updateSorted( entities, iterateCallback ) {
		return entities?.forEach( ( entity ) => this
			._updateOrPushSortedInList( this.entities, entity, iterateCallback ) );
	}

	updateItemSorted( item, iterateCallback ) {
		this._updateOrPushSortedInList( this.entities, item, iterateCallback );
	}

	_updateOrPushSortedInList( list, target, iterateCallback ) {
		if ( !this._findInListById( list, target.id ) ) pushSorted( list, target, iterateCallback );
		else this._update( list, target );
	}

	update( updatedEntity ) {
		return	this._update( this.entities, updatedEntity );
	}

	updateIfExists( updatedEntity ) {
		if ( !this._findInListById( this.entities, updatedEntity.id ) ) return null;
		return	this._update( this.entities, updatedEntity );
	}

	updateAll( entities ) {
		// It does not cover the case where something was deleted from the list in the ws
		return entities.forEach( ( entity ) => this.update( entity ) );
	}

	get all() {
		return this.entities;
	}

	delete( entityId ) {
		this.entities = this.entities.filter( ( entity ) => entity.id !== entityId );
	}

	deleteAll( ) {
		this.entities = [];
	}

	find = ( id ) => this._findInListById( this.entities, id )

	_findInListById( list, id ) {
		return list.find( ( entity ) => entity.id === id ) || null;
	}

	_update( list, updatedEntity ) {
		const entityToUpdate = this._findOrCreateInList( list, updatedEntity );
		this._getDefinedProperties( updatedEntity ).forEach( ( property ) => {
			this._updateProperty( entityToUpdate, updatedEntity, property );
		} );
		return entityToUpdate;
	}

	_findOrCreateInList( list, target ) {
		if ( !this._findInListById( list, target.id ) ) list.push( target );
		return this._findInListById( list, target.id );
	}

	_updateProperty( entityToUpdate, updatedEntity, property ) {
		if ( this._isAnArrayOfObjects( entityToUpdate[ property ] ) ) {
			this._updateArrayProperty( entityToUpdate[ property ], updatedEntity[ property ] );
		} else {
			entityToUpdate[ property ] = updatedEntity[ property ];
		}
	}

	_isAnArrayOfObjects( array ) {
		return _.isArray( array ) && _.some( array, _.isObject );
	}

	_updateArrayProperty( arrayToUpdate, updatedArray ) {
		updatedArray.forEach( ( updatedEntity ) => {
			this._update( arrayToUpdate, updatedEntity );
		} );
	}

	_getDefinedProperties( obj ) {
		return Object.keys( obj ).filter( ( property ) => obj[ property ] !== undefined );
	}
}
