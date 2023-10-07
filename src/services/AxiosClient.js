import Config from 'react-native-config';
import axios from 'axios';

export default class AxiosClient {
	constructor() {
		const instance = axios.create( {
			baseURL: Config.REACT_APP_API_BASE_URL
		} );

		instance.isCancel = axios.isCancel;
		instance.createCancelToken = ( onNewToken ) => new axios.CancelToken( ( canceler ) => {
			onNewToken( canceler );
		} );

		return instance;
	}
}
