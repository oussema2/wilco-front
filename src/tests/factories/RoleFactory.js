import { Factory } from 'fishery';
import Role from '../../entities/Role';

export default Factory.define( ( { sequence, custom = false } ) => ( new Role( {
	id: sequence,
	name: `ROLE ${sequence}`,
	custom
} ) ) );
