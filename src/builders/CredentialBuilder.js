import Credential from '../entities/Credential';

export default class CredentialBuilder {
	build = ( credentialsJson ) => {
		const credential = Credential.fromJSON( credentialsJson );
		return credential;
	}
}
