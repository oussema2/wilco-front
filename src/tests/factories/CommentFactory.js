import { Factory } from 'fishery';
import Comment from '../../entities/Comment';
import PilotFactory from './PilotFactory';

export default Factory.define( ( { sequence } ) => ( new Comment( {
	id: sequence,
	text: 'Comment text message',
	createdAt: new Date( '12-13-2020' ),
	pilot: PilotFactory.build()
} ) ) );
