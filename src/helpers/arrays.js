import _ from 'lodash';

export function compareArrays( array1, array2 ) {
	array1 = array1.sort( this.sortArray );
	array2 = array2.sort( this.sortArray );
	return ( array1.length === array2.length
			&& array1.every( ( value, index ) => value === array2[ index ] ) );
}

export function sortArray( x, y ) {
	let pre = [ 'string', 'number', 'bool' ];
	if ( typeof x !== typeof y ) return pre.indexOf( typeof y ) - pre.indexOf( typeof x );
	if ( x === y ) return 0;
	return ( x > y ) ? 1 : -1;
}

export function pushSorted( array, value, callback ) {
	array.splice( _.sortedIndexBy( array, value, callback ), 0, value );
}

export function serializeArray( name, array ) {
	let str = [];

	array.forEach( ( item ) => {
		str.push( `${name}[]=${encodeURIComponent( item )}` );
	} );

	return str.join( '&' );
}
