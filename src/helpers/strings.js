export function reduceSpaces( str ) {
	return str.replace( /\s+/g, ' ' );
}

export function truncate( source, size ) {
	return source.length > size ? `${source.slice( 0, size - 1 )}...` : source;
}

export function hasWordsThatStartWithValue( source, value ) {
	const words = source.split( ' ' );
	return words.filter( ( word ) => word.startsWith( value ) ).length > 0;
}

export function hasOnlyOneWord( string ) {
	return string.trim().split( ' ' ).length === 1;
}

export function simplifyNameToSearch( name ) {
	return reduceSpaces( name.trim() ).toUpperCase();
}

export function trimAndRemoveSubString( string, subString ) {
	return string.trim().replace( subString, '' );
}
