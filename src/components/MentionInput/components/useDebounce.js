import { useEffect } from 'react';

export const useDebounce = ( keyword, callback, timeout ) => {
	useEffect( () => {
		const _timeout = setTimeout( () => {
			callback?.( keyword );
		}, timeout );
		return () => clearTimeout( _timeout );
	}, [ keyword ] );
};
