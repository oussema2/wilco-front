export default class MockHTTPClient {
	constructor() {
		this.delete = jest.fn().mockResolvedValue( { data: { response: 'response' } } );
		this.post = jest.fn().mockResolvedValue( { data: { response: 'response' } } );
		this.get = jest.fn().mockResolvedValue( { data: { response: 'response' } } );
		this.patch = jest.fn().mockResolvedValue( { data: { response: 'response' } } );
		this.put = jest.fn().mockResolvedValue( { data: { response: 'response' } } );
		this.isCancel = jest.fn( () => false );
		this.createCancelToken = jest.fn();
	}
}
