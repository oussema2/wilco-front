import { Factory } from 'fishery';
import Aircraft from '../../entities/Aircraft';

export default Factory.define( ( { sequence } ) => ( new Aircraft( {
	id: sequence,
	makeAndModel: 'Cessna 123',
	tailNumber: 'N1M2L3',
	pictureUrl: 'Picture URL',
	pictureThumbnailUrl: 'Picture thumbnail URL'
} ) ) );
