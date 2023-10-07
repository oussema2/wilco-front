import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import mockUseView from '../../mocks/mockUseView';
import Home from '../../../screens/Home/Home';
import * as useHomeWireframe from '../../../wireframes/useHomeWireframe';
import PostFactory from '../../factories/PostFactory';
import FilterPostsPresenter from '../../../presenters/FilterPostsPresenter';
import mockUseModalService from '../../mocks/mockUseModalService';

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'Home', () => {
	let screen;
	mockUseModalService();

	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };

	const filterPostsPresenter = new FilterPostsPresenter( {
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		makeAutoObservable() {}
	} );

	filterPostsPresenter.applySelection = jest.fn();
	filterPostsPresenter.clearSelection = jest.fn();
	filterPostsPresenter.selectAll = jest.fn();

	const onRefresh = jest.fn();

	const setUp = ( view = {}, posts = [] ) => {
		mockUseView(
			useHomeWireframe,
			{
				posts,
				filterPostsPresenter,
				homePostListPresenter: {
					isLoading: false, isRefreshing: false, showPlaceholder: false, onRefresh
				},
				myFeedListPresenter: {
					isLoading: false, isRefreshing: false, showPlaceholder: false, onRefresh
				},
				...view
			}
		);

		screen = render( <Home /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'without posts', () => {
		beforeEach( () => {
			setUp( {
				homePostListPresenter: { isRefreshing: false, showPlaceholder: true, isLoading: false }
			} );
		} );

		it( 'renders the Home screen correctly', () => {
			expect( screen.queryByTestId( 'home-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'filter-post-modal-screen' ) ).toHaveProp( 'visible', false );
			expect( screen.queryByTestId( 'logo-image' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'filter-image' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'sliders-image' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'all-post-list-testID' ) ).toBeNull();
			expect( screen.queryByTestId( 'placeholder-home-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'placeholder-text' ) ).toHaveTextContent( 'We didn\'t find a post that matches your filter criteria' );
			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'with posts', () => {
		const posts = PostFactory.buildList( 2 );

		describe( 'when the app is loading posts', () => {
			beforeEach( () => {
				setUp( {
					posts,
					homePostListPresenter: {
						isLoading: true, isRefreshing: false, showPlaceholder: false
					}
				} );
			} );

			it( 'renders a loading component initially', () => {
				expect( screen.queryByTestId( 'skeleton-container-testID' ) ).not.toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );

		describe( 'when the app finished to load posts', () => {
			beforeEach( () => {
				setUp( { posts, isLoading: false } );
			} );

			it( 'renders the Home screen correctly', () => {
				expect( screen.queryByTestId( 'home-screen' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'logo-image' ) ).not.toBeNull();
				expect( screen.queryAllByTestId( 'post-component' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'all-post-list-testID' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'my-feed-post-list-testID' ) ).not.toBeNull();
				expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();
				expect( screen.queryByTestId( 'placeholder-home-screen' ) ).toBeNull();

				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when the app is refreshing notifications', () => {
		beforeEach( () => {
			setUp( {
				isLoading: false, isRefreshing: true
			} );
		} );

		it( 'renders the Home screen correctly', () => {
			expect( screen.queryByTestId( 'home-screen' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'logo-image' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'filter-image' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'activityIndicator-testID' ) ).toBeNull();

			expect( screen ).toMatchSnapshot();
		} );
	} );

	describe( 'when user open filter modal', () => {
		beforeEach( () => {
			filterPostsPresenter.setIsFilterModalVisible( true );
			setUp();
		} );

		it( 'renders the filter modal correctly', () => {
			expect( screen.queryByTestId( 'filter-post-modal-screen' ) ).toHaveProp( 'visible', true );
			expect( screen.queryByTestId( 'filter-modal-navigation-bar-testID' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'apply-selection-button' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'apply-selection-button' ) ).toHaveTextContent( 'Apply' );
			expect( screen.queryByTestId( 'clear-selection-button' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'clear-selection-button' ) ).toHaveTextContent( 'Clear' );
			expect( screen ).toMatchSnapshot();
		} );

		it( 'calls to applySelection function when user press Apply button', () => {
			fireEvent.press( screen.queryByTestId( 'apply-selection-button' ) );
			expect( filterPostsPresenter.applySelection ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'calls to clearSelection function when the user press Clear button', () => {
			fireEvent.press( screen.queryByTestId( 'clear-selection-button' ) );
			expect( filterPostsPresenter.clearSelection ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'calls to selectAll function when the user press Clear button', () => {
			fireEvent.press( screen.queryByTestId( 'onRightTextPress-testID' ) );
			expect( filterPostsPresenter.selectAll ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when user pull to refresh the list', () => {
		beforeEach( () => {
			const posts = PostFactory.buildList( 2 );
			setUp( {
				posts,
				homePostListPresenter: {
					isLoading: false, isRefreshing: false, showPlaceholder: false, onRefresh
				}
			} );
		} );

		it( 'calls to onRefresh function', async () => {
			const scrollView = screen.getByTestId( 'all-post-list-testID' );
			expect( scrollView ).toBeDefined();

			const { refreshControl } = scrollView.props;
			await act( async () => {
				refreshControl.props.onRefresh();
			} );

			expect( onRefresh ).toHaveBeenCalled();
		} );
	} );
} );
