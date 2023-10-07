import { Factory } from 'fishery';
import Hashtag from '../../entities/Hashtag';

export default Factory.define( ( { sequence } ) => ( new Hashtag( {
	id: sequence,
	name: `Label ${sequence}`
} ) ) );
