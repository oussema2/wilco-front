import { useMemo } from 'react';
import GalleryHandlerService from '../services/GalleryHandlerService';

const useGalleryPermissionHandler = ( callback ) => {
	const handleGalleryPermission = useMemo( () => (
		() => GalleryHandlerService.shared().handleGalleryPermission( callback )
	), [ callback ] );

	return handleGalleryPermission;
};

export default useGalleryPermissionHandler;
