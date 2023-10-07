import FlightAwareTrack from '../../entities/FlightAwareTrack';
import FlightAwareTrackFactory from '../factories/FlightAwareTrackFactory';

describe( 'FlightAwareTrack entity', () => {
	describe( 'constructor', () => {
		it( 'deletes new line characters', () => {
			const multiLineBase64 = 'multi\nline';
			const track = new FlightAwareTrack( { trackBase64: multiLineBase64 } );
			expect( track.trackBase64 ).toBe( 'multiline' );
		} );
	} );

	describe( '@trackSource', () => {
		it( 'returns the track source', () => {
			const track = FlightAwareTrackFactory.build();
			expect( track.trackSource ).toEqual( {
				uri: `data:image/png;base64,${track.trackBase64}`
			} );
		} );
	} );

	describe( 'fromJSON', () => {
		const flightAwareTrackJSON = { track_base_64: 'base64string' };

		const flightAwareTrack = FlightAwareTrack.fromJSON( flightAwareTrackJSON );

		it( 'creates the flightAwareTrack with the correct properties', () => {
			expect( flightAwareTrack.trackBase64 ).toEqual( 'base64string' );
		} );
	} );

	describe( 'toJSON', () => {
		const flightAwareTrack = FlightAwareTrackFactory.build();
		const json = flightAwareTrack.toJSON();

		it( 'returns the flightAwareTrack\'s json', () => {
			expect( json ).toEqual( {
				trackBase64: flightAwareTrack.trackBase64
			} );
		} );
	} );
} );
