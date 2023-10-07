import { Factory } from 'fishery';
import FlightAwareTrack from '../../entities/FlightAwareTrack';

export default Factory.define( ( { sequence } ) => ( new FlightAwareTrack( {
	trackBase64: `${sequence}-base64string`
} ) ) );
