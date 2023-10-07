import { Factory } from 'fishery';
import Flight from '../../entities/Flight';

export default Factory.define( ( { sequence } ) => ( new Flight( {
	externalId: `N922DE-1454974819-adhoc-${sequence}`,
	from: 'KHPN',
	to: 'JFK',
	departureTime: new Date( '2021-06-29T22:41:55.075Z' ),
	arrivalTime: new Date( '2021-06-29T23:42:55.075Z' ),
	maxSpeed: 0,
	maxAltitude: 0
} ) ) );
