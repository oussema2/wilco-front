import { parseInt } from 'lodash';
import { parseValue } from 'react-native-controlled-mentions';
import { PART_TYPE } from '../constants/post';
import { trimAndRemoveSubString } from '../helpers/strings';

let sharedInstance;

export default class ExtractorMessageService {
	static shared = () => {
		if ( sharedInstance ) { return sharedInstance; }

		sharedInstance = new ExtractorMessageService();
		return sharedInstance;
	}

	extractMentionsIDs( message ) {
		return this._filterExtractedParts( message, PART_TYPE.mention )
			.map( ( mention ) => parseInt( mention.data.id ) );
	}

	extractLocations( message ) {
		return this._filterExtractedParts( message, PART_TYPE.airports )
			.map( ( part ) => this._simplifyLocation( part.text ) );
	}

	extractHashtags( message ) {
		const hashtagsFromPattern = this._extractHashtagsFromPattern( message );
		const hashtagsFromTrigger = this._extractHashtagsFromTrigger( message );
		return [ ...hashtagsFromPattern, ...hashtagsFromTrigger ];
	}

	_extractHashtagsFromPattern( message ) {
		return this
			._filterExtractedParts( message, PART_TYPE.hashtagPattern )
			.map( ( part ) => this._simplifyHashtag( part.text ) );
	}

	_extractHashtagsFromTrigger( message ) {
		const validHashtags = [];
		const extractedParts = this._filterExtractedParts( message, PART_TYPE.hashtagTrigger );
		extractedParts.forEach( ( part ) => {
			const partMessage = part.text;
			const possibleHashtags = partMessage.match( PART_TYPE.hashtagPattern.pattern ) || [];
			if ( possibleHashtags.length ) {
				const validHashtag = possibleHashtags[ 0 ];
				validHashtags.push( this._simplifyHashtag( validHashtag ) );
			}
		} );
		return validHashtags;
	}

	_filterExtractedParts( message, partType ) {
		return this._extractParts( message, partType ).filter( ( part ) => part.partType );
	}

	_extractParts( message, partType ) {
		return parseValue( message, [ partType ] ).parts;
	}

	_simplifyLocation( location ) {
		const upperCaseLocation = location.toUpperCase();
		return trimAndRemoveSubString( upperCaseLocation, '+' );
	}

	_simplifyHashtag( hashtag ) {
		return trimAndRemoveSubString( hashtag, '#' );
	}
}
