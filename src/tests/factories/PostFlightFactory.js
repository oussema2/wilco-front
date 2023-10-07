import { Factory } from 'fishery';
import PostFlight from '../../entities/PostFlight';
import AircraftFactory from './AircraftFactory';

export default Factory.define( ( { sequence } ) => ( new PostFlight( {
	id: sequence,
	from: 'JAQ',
	to: 'SMO',
	departureTime: new Date( '2021-07-02T12:23:41.230Z' ),
	arrivalTime: new Date( '2021-07-02T20:14:51.350Z' ),
	duration: 148,
	maxSpeed: 6542,
	maxAltitude: 9539,
	distance: 12957,
	aircraft: AircraftFactory.build(),
	trackUrl: 'track/url'
} ) ) );
