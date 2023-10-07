import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './PrivacyAndTerms.styles';

const PrivacyAndTerms = ( { presenter } ) => (
	<View style={styles.container}>
		<Text testID="privacy-policy-text" style={styles.text}>
			By creating an account you are agreeing to our
			{' '}
			<Text testID="terms-service-link" style={styles.link} onPress={presenter.termsOfServiceWasPressed}>{'Terms\u00A0of\u00A0Service'}</Text>
			{' '}
			and
			{' '}
			<Text testID="privacy-policy-link" style={styles.link} onPress={presenter.privacyPolicyWasPressed}>{'Privacy\u00A0Policy'}</Text>
		</Text>
	</View>
);

PrivacyAndTerms.propTypes = {
	presenter: PropTypes.shape( {
		termsOfServiceWasPressed: PropTypes.func.isRequired,
		privacyPolicyWasPressed: PropTypes.func.isRequired
	} ).isRequired
};

export default PrivacyAndTerms;
