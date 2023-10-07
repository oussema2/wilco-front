import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import SettingsItem from './SettingsItem';
import HorizontalPadding from '../../../components/HorizontalPadding/HorizontalPadding';
import { Title } from '../../../components/Title';
import { styles } from './SettingsListSection.styles';

const SettingsListSection = ( {
	testID, items, title
} ) => (
	<View testID={testID} style={styles.container}>

		<HorizontalPadding>
			<Title testID={`${testID}-Title`} text={title} />
		</HorizontalPadding>

		<View style={styles.separatorView} />

		{items.map( ( item ) => (
			<SettingsItem
				key={item.label}
				testID={item.testID}
				label={item.label}
				labelStyle={item.labelStyle}
				rightImage={item.image}
				onPress={item.onPress}
			/>
		) )}
	</View>
);

SettingsListSection.propTypes = {
	testID: PropTypes.string,
	title: PropTypes.string,
	items: PropTypes.arrayOf( PropTypes.shape( {
		testID: PropTypes.string,
		label: PropTypes.string.isRequired,
		labelStyle: PropTypes.any,
		image: PropTypes.node,
		onPress: PropTypes.func
	} ) )
};

SettingsListSection.defaultProps = {
	testID: 'settingItem',
	title: '',
	items: []
};

export default observer( SettingsListSection );
