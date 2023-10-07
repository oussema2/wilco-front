import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Title } from '../../Title';
import { HorizontalPadding } from '../../HorizontalPadding';
import CheckboxList from '../../CheckboxList/CheckboxList';
import { styles } from './CollapsableCredentials.styles';
import { TextArea } from '../../TextArea';

const CollapsableCredentials = ( {
	selectedItems, onSelectionsChange, items, title, otherInputOptions, testID
} ) => {
	const [ isExpanded, setIsExpanded ] = useState( true );

	const _selectedItemsCount = () => selectedItems.length > 0 && (
		<View style={styles.textItemsSelectedCountContainer}>
			<Text style={styles.textItemsSelectedCount}>
				{selectedItems.length}
			</Text>
		</View>
	);

	const _content = () => (
		<View style={styles.container}>
			<Title testID={`pilotInfo-${testID}Title`} text={title} style={styles.title} />
			{_selectedItemsCount()}
		</View>
	);

	return (
		<ListItem.Accordion
			content={_content()}
			isExpanded={isExpanded}
			onPress={() => {
				setIsExpanded( !isExpanded );
			}}
		>
			{isExpanded && (
				<HorizontalPadding>
					<View style={styles.separatorViewCertificates} />
					<CheckboxList
						testID={`checkbox-${testID.toLowerCase()}`}
						selectedItems={selectedItems}
						onSelectionsChange={onSelectionsChange}
						items={items}
					/>

					{otherInputOptions.isOtherOptionSelected && (
						<TextArea
							testID="other-input"
							textInputStyle={{ marginTop: -15 }}
							error={otherInputOptions.error}
							inputProps={otherInputOptions.inputProps}
							placeholder={otherInputOptions.placeholder}
							capitalizeFirstLetter
							minimumLines={1}
							maxLength={100}
						/>
					)}
				</HorizontalPadding>
			)}

		</ListItem.Accordion>
	);
};

CollapsableCredentials.propTypes = {
	testID: PropTypes.string,
	title: PropTypes.string,
	selectedItems: PropTypes.arrayOf( PropTypes.any ),
	onSelectionsChange: PropTypes.func.isRequired,
	items: PropTypes.arrayOf( PropTypes.any ),
	otherInputOptions: PropTypes.any
};

CollapsableCredentials.defaultProps = {
	testID: 'collapsableCredentials',
	title: '',
	selectedItems: [],
	items: [],
	otherInputOptions: {}
};

export default observer( CollapsableCredentials );
