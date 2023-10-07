import { Platform } from 'react-native';
import mock from 'react-native-permissions/mock';
import PermissionsHandlerService, { galleryPermission } from '../../services/PermissionsHandlerService';

jest.mock( 'react-native-permissions', () => mock );

const permissionsBackendMock = {
	check: jest.fn(),
	checkMultiple: jest.fn(),
	openSettings: jest.fn(),
	openLimitedPhotoLibraryPicker: jest.fn(),
	request: jest.fn(),
	requestMultiple: jest.fn()
};

const permissions = [ galleryPermission ];
const platformSpecificGalleryPermission = Platform.select( galleryPermission );
const platformSpecificPermissions = [
	Platform.select( galleryPermission )
];

describe( 'PermissionsHandlerService', () => {
	describe( 'shared', () => {
		const permissionsHandlerServiceFirst = PermissionsHandlerService.shared();
		const permissionsHandlerServiceSecond = PermissionsHandlerService.shared();
		test( 'calls the backend\'s shared method first time', () => {
			expect( permissionsHandlerServiceFirst ).toBeInstanceOf( PermissionsHandlerService );
		} );

		test( 'calls the backend\'s shared method second time', () => {
			expect( permissionsHandlerServiceSecond ).toBeInstanceOf( PermissionsHandlerService );
			expect( permissionsHandlerServiceFirst ).toEqual( permissionsHandlerServiceSecond );
		} );
	} );

	const permissionsHandlerService = new PermissionsHandlerService( {
		permissionsBackend: permissionsBackendMock
	} );

	describe( 'check', () => {
		test( 'calls the backend\'s check method with the correct arguments', () => {
			permissionsHandlerService.check( galleryPermission );

			expect( permissionsBackendMock.check )
				.toHaveBeenCalledWith( platformSpecificGalleryPermission );
		} );
	} );

	describe( 'checkMultiple', () => {
		test( 'calls the backend\'s checkMultiple method with the correct arguments', () => {
			permissionsHandlerService.checkMultiple( permissions );

			expect( permissionsBackendMock.checkMultiple )
				.toHaveBeenCalledWith( platformSpecificPermissions );
		} );
	} );

	describe( 'openSettings', () => {
		test( 'calls the backend\'s openSettings method with the correct arguments', () => {
			permissionsHandlerService.openSettings();

			expect( permissionsBackendMock.openSettings ).toHaveBeenCalled();
		} );
	} );

	describe( 'openLimitedPhotoLibraryPicker', () => {
		test( 'calls the backend\'s openLimitedPhotoLibraryPicker method with the correct arguments', () => {
			permissionsHandlerService.openLimitedPhotoLibraryPicker();

			expect( permissionsBackendMock.openLimitedPhotoLibraryPicker ).toHaveBeenCalled();
		} );
	} );

	describe( 'request', () => {
		test( 'calls the backend\'s request method with the correct arguments', () => {
			permissionsHandlerService.request( galleryPermission );

			expect( permissionsBackendMock.request )
				.toHaveBeenCalledWith( platformSpecificGalleryPermission );
		} );
	} );

	describe( 'requestMultiple', () => {
		test( 'calls the backend\'s requestMultiple method with the correct arguments', () => {
			permissionsHandlerService.requestMultiple( permissions );

			expect( permissionsBackendMock.requestMultiple )
				.toHaveBeenCalledWith( platformSpecificPermissions );
		} );
	} );
} );
