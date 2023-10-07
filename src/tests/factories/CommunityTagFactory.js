import { Factory } from 'fishery';
import CommunityTag from '../../entities/CommunityTag';

export default Factory.define( ( { sequence } ) => ( new CommunityTag( {
	id: sequence,
	name: `Label ${sequence}`
} ) ) );
