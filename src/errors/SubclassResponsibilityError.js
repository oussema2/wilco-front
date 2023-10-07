export default class SubclassResponsibilityError extends Error {
	constructor( ) {
		super( 'Subclass responsibility' );
		this.name = this.constructor.name;
	}
}
