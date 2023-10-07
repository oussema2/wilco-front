import { Factory } from 'fishery';
import Post from '../../entities/Post';
import PilotFactory from './PilotFactory';
import PostFlightFactory from './PostFlightFactory';
import { PrivacyTypeFactory } from '../../factories/VisibilityTypeFactory';

class PostFactory extends Factory {
	withoutTitle() {
		return this.params( {
			title: null
		} );
	}
}

export default PostFactory.define( ( { sequence, previewComments = [] } ) => {
	const visibility = PrivacyTypeFactory.build( 'public' );

	return ( new Post( {
		id: sequence,
		title: 'A Title',
		text: 'This is the text message',
		numberOfLikes: 2,
		numberOfComment: 4,
		visibility,
		liked: false,
		createdAt: new Date( '12-13-2020' ),
		editedAt: new Date( '12-15-2020' ),
		pilot: PilotFactory.build(),
		flight: PostFlightFactory.build(),
		photoUrls: [ 'some/image/url', 'another/image/url' ],
		photoPreviewUrls: [ 'some/image/preview/url', 'another/image/preview/url' ],
		photoIds: [ 15, 30 ],
		communityTags: [ 'tag 1', 'tag 2' ],
		airports: [ 'airport 1', 'airport 2' ],
		previewComments,
		favorite: false
	} ) );
} );
