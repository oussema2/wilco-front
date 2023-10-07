import * as rnPermissions from 'react-native-permissions';
import GalleryHandlerService from '../../services/GalleryHandlerService';
import PermissionsHandlerService from '../../services/PermissionsHandlerService';
import AlertMessagesService from '../../services/AlertMessagesService';

describe( 'GalleryHandlerService', () => {
	let service;

	const alertMessagesService = AlertMessagesService.shared();
	const permissionHandlerService = PermissionsHandlerService.shared();

	beforeEach( () => {
		service = new GalleryHandlerService();
	} );

	describe( 'constructor()', () => {
		it( 'initializes correctly', () => {
			expect( service.alertMessagesService ).toEqual( alertMessagesService );
			expect( service.permissionHandlerService ).toEqual( permissionHandlerService );
		} );
	} );

	describe( 'shared', () => {
		const galleryHandlerServiceServiceFirst = GalleryHandlerService.shared();
		const galleryHandlerServiceServiceSecond = GalleryHandlerService.shared();
		test( 'calls the backend\'s shared method first time', () => {
			expect( galleryHandlerServiceServiceFirst ).toBeInstanceOf( GalleryHandlerService );
		} );

		test( 'calls the backend\'s shared method second time', () => {
			expect( galleryHandlerServiceServiceSecond ).toBeInstanceOf( GalleryHandlerService );
			expect( galleryHandlerServiceServiceFirst ).toEqual( galleryHandlerServiceServiceSecond );
		} );
	} );

	describe( 'handleGalleryPermission', () => {
		const _itCallsTheCallbackMethod = () => {
			it( 'calls the callback method', async () => {
				const callback = jest.fn();
				await service.handleGalleryPermission( callback );

				expect( permissionHandlerService.request ).toHaveBeenCalled();
				expect( callback ).toHaveBeenCalled();
			} );
		};

		describe( 'when user accept the permission', () => {
			beforeEach( () => {
				permissionHandlerService.request = jest.fn()
					.mockImplementation( () => rnPermissions.RESULTS.GRANTED );
			} );

			_itCallsTheCallbackMethod();
		} );

		describe( 'when user accepts the permission in a limited way', () => {
			beforeEach( () => {
				permissionHandlerService.request = jest.fn()
					.mockImplementation( () => rnPermissions.RESULTS.LIMITED );
			} );

			_itCallsTheCallbackMethod();
		} );

		describe( 'when user does`t accept the permission', () => {
			beforeEach( () => {
				permissionHandlerService.request = jest.fn()
					.mockImplementation( () => rnPermissions.RESULTS.BLOCKED );
			} );

			it( 'doesn\'t calls the callback method', async () => {
				const callback = jest.fn();
				await service.handleGalleryPermission( callback );

				expect( permissionHandlerService.request ).toHaveBeenCalled();
				expect( callback ).not.toHaveBeenCalled();
			} );
		} );
	} );
} );
