import { useState } from 'react';

export const useOnLoadImage = () => {
	const [ loading, setLoading ] = useState( true );
	const onLoadEnd = () => setLoading( false );
	return [ loading, onLoadEnd ];
};
