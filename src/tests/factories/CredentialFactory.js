import { Factory } from 'fishery';
import Credential from '../../entities/Credential';

export default Factory.define( ( { sequence } ) => ( new Credential( {
	id: sequence,
	name: 'Credential 1',
	custom: false
} ) ) );
