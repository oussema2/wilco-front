const groupBy = ( array, key ) => array.reduce( ( grouped, element ) => {
	( grouped[ element[ key ] ] = grouped[ element[ key ] ] || [] ).push( element );
	return grouped;
}, {} );

export default groupBy;
