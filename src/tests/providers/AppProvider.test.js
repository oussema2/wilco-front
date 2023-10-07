import React from 'react';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import { Text } from 'react-native';
import AppProvider from '../../providers/AppProvider';
import RootStore from '../../stores/RootStore';
import { useRootStore } from '../../providers/RootStoreProvider';
import { useActionSheetService } from '../../providers/ActionSheetProvider';
import ActionSheetService from '../../services/ActionSheetService';
import { useModalService } from '../../providers/ModalProvider';
import ModalService from '../../services/ModalService';
import { useSnackbarService } from '../../providers/SnackbarProvider';
import SnackbarService from '../../services/SnackbarService';
import { useAnalyticsService } from '../../providers/AnalyticsProvider';
import AnalyticsService from '../../services/AnalyticsService';

describe( '<AppProvider/>', () => {
	let provider;

	const testData = <Text testID="test-text">test-data</Text>;

	const setUp = ( ) => {
		provider = render( <AppProvider>{testData}</AppProvider> );
	};

	beforeEach( () => {
		setUp();
	} );

	const itIncludesProvider = ( { name, hook, klass } ) => {
		it( `includes ${name}`, () => {
			const { result } = renderHook( () => hook(), {
				wrapper: AppProvider
			} );
			expect( result.current ).toBeInstanceOf( klass );
		} );
	};

	it( 'renders children', () => {
		expect( provider.queryByTestId( 'test-text' ) ).not.toBeNull();
		expect( provider ).toMatchSnapshot();
	} );

	itIncludesProvider( {
		name: 'RootStoreProvider',
		hook: useRootStore,
		klass: RootStore
	} );

	itIncludesProvider( {
		name: 'ActionSheetProvider',
		hook: useActionSheetService,
		klass: ActionSheetService
	} );

	itIncludesProvider( {
		name: 'ModalProvider',
		hook: useModalService,
		klass: ModalService
	} );

	itIncludesProvider( {
		name: 'SnackbarProvider',
		hook: useSnackbarService,
		klass: SnackbarService
	} );

	itIncludesProvider( {
		name: 'AnalyticsProvider',
		hook: useAnalyticsService,
		klass: AnalyticsService
	} );
} );
