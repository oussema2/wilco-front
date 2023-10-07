import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Post } from '../../../components/Post';
import PostFactory from '../../factories/PostFactory';
import { PrivacyTypeFactory } from '../../../factories/VisibilityTypeFactory';

describe( 'Post', () => {
	let component;
	const testID = 'testing-Post';
	const numberOfLikes = 1;
	const post = PostFactory.build( { numberOfLikes } );
	const privacy = PrivacyTypeFactory.build( 'public' );
	const isEdited = false;
	const dateToDisplay = '1h';
	const pilotName = 'Pilot name';
	const postOptionsWasPressed = jest.fn();
	const likeButtonWasPressed = jest.fn();
	const pilotWasPressed = jest.fn();
	const flightPresenter = {
		from: 'ABC',
		to: 'DEF',
		departureTime: '23:04',
		arrivalTime: '5:32',
		pictureUrl: 'http://sample.pic/ture',
		makeAndModel: 'Cessna 123',
		duration: '340 m',
		maxSpeed: '2421 kn',
		maxAltitude: '6320 ft',
		distance: '3123 mi'
	};
	const hasImages = true;
	const imageSources = post.photoUrls;
	const communityTags = [ 'community 1', 'Community 2' ];
	const defaultPostPresenter = {
		post,
		privacy,
		isEdited,
		numberOfLikes,
		dateToDisplay,
		pilotName,
		postOptionsWasPressed,
		likeButtonWasPressed,
		pilotWasPressed,
		flightPresenter,
		hasImages,
		imageSources,
		communityTags
	};
	const commentButtonWasPressed = jest.fn();
	const onHashtagPressed = jest.fn();

	const setUp = (
		postPresenter = defaultPostPresenter
	) => {
		component = render(
			<Post
				testID={testID}
				postPresenter={postPresenter}
				commentButtonWasPressed={commentButtonWasPressed}
				onHashtagPress={onHashtagPressed}
			/>
		);
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the Post component correctly', () => {
			expect( component.queryByTestId( 'post-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'headerView-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'post-flight-summary' ) ).toBeDefined();
			expect( component.queryByTestId( 'post-action-bar' ) ).toBeDefined();
			expect( component.queryByTestId( 'options-image' ) ).toBeDefined();

			expect( component.queryByTestId( 'post-communities-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'community-item-0' ) ).toBeDefined();
			expect( component.queryByTestId( 'community-item-1' ) ).toBeDefined();
			expect( component.queryByTestId( 'community-item-2' ) ).toBeNull();

			expect( component.queryByTestId( 'post-airports-component' ) ).toBeDefined();
			expect( component.queryByTestId( 'airport-item-0' ) ).toBeDefined();
			expect( component.queryByTestId( 'airport-item-1' ) ).toBeDefined();
			expect( component.queryByTestId( 'airport-item-2' ) ).toBeNull();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the post has public privacy', () => {
		it( 'renders the public privacy icon', () => {
			expect( component.queryByTestId( 'public-post' ) ).toBeDefined();
		} );
	} );

	describe( 'when the post has only me privacy', () => {
		it( 'renders the only me privacy icon', () => {
			const onlyMePrivacy = PrivacyTypeFactory.build( 'only_me' );
			const postPresenter = { ...defaultPostPresenter, privacy: onlyMePrivacy };

			beforeEach( () => {
				setUp( postPresenter );
			} );
			expect( component.queryByTestId( 'only-me-post' ) ).toBeDefined();
		} );
	} );

	describe( 'when the post is not edited', () => {
		it( 'does not render the "Edited" indicator', () => {
			expect( component.queryByText( 'Edited' ) ).toBeNull();
		} );
	} );

	describe( 'when the post is edited', () => {
		const postPresenter = { ...defaultPostPresenter, isEdited: true };

		beforeEach( () => {
			setUp( postPresenter );
		} );

		it( 'renders the "Edited" indicator', () => {
			expect( component.queryByTestId( 'bodyTertiaryInfoSeparator-Text' ) ).not.toBeNull();
		} );
	} );

	describe( '@title', () => {
		describe( 'when the post doesn\'t have title', () => {
			const postPresenter = { ...defaultPostPresenter, title: '' };

			beforeEach( () => {
				setUp( postPresenter );
			} );
			it( 'renders the Post component correctly', () => {
				expect( component.queryByTestId( 'title-text' ) ).toBeNull();
			} );
		} );

		describe( 'when the post has title', () => {
			const title = 'A title';
			const postPresenter = { ...defaultPostPresenter, title };

			beforeEach( () => {
				setUp( postPresenter );
			} );
			it( 'renders the Post component correctly', () => {
				expect( component.queryByTestId( 'title-text' ) ).toHaveTextContent( title );
			} );
		} );
	} );

	describe( 'when the options are clicked', () => {
		it( 'calls the presenter\'s optionsOnPress callback', () => {
			fireEvent.press( component.queryByTestId( 'options-image' ) );
			expect( postOptionsWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the post has no flight', () => {
		beforeEach( () => setUp( { ...defaultPostPresenter, flightPresenter: null } ) );

		it( 'does not render the flight summary', () => {
			expect( component.queryByTestId( 'post-flight-presenter' ) ).toBeNull();
		} );
	} );

	describe( 'when the post has no images', () => {
		beforeEach( () => setUp( { ...defaultPostPresenter, hasImages: false } ) );

		it( 'does not render the image carousel', () => {
			expect( component.queryByTestId( 'image-carousel' ) ).toBeNull();
		} );
	} );

	describe( 'when the post has no airports', () => {
		beforeEach( () => setUp( { ...defaultPostPresenter, airports: [] } ) );

		it( 'does not render the airports component', () => {
			expect( component.queryByTestId( 'post-airports-component' ) ).toBeNull();
		} );
	} );

	describe( 'when the post has no communities', () => {
		beforeEach( () => setUp( { ...defaultPostPresenter, communityTags: [] } ) );

		it( 'does not render the communities component', () => {
			expect( component.queryByTestId( 'post-communities-component' ) ).toBeNull();
		} );
	} );

	describe( 'when the like count from the action bar is clicked', () => {
		it( 'calls the presenter\'s likeButtonWasPressed callback', () => {
			fireEvent.press( component.getByText( '1 like' ) );
			expect( likeButtonWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the avatar is pressed', () => {
		it( 'calls the presenter\'s pilotWasPressed callback', () => {
			fireEvent.press( component.getByTestId( 'userAvatar-image' ) );
			expect( pilotWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the pilot name is pressed', () => {
		it( 'calls the presenter\'s pilotWasPressed callback', () => {
			fireEvent.press( component.getByTestId( 'pilotName-text' ) );
			expect( pilotWasPressed ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
