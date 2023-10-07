import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from 'react-native-elements';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { styles } from './DatePickerModal.styles';
import { ModalGradient } from '../ModalGradient';
import { ActionSheetButton } from '../ActionSheetButton';
import noop from '../../helpers/noop';

const DatePickerModal = ( {
	testID, open, onBackdropPress, title, initialDate, minimumDate, maximumDate, onDatePicked
} ) => {
	const [ date, setDate ] = useState( initialDate );
	useEffect( () => setDate( initialDate ), [ initialDate ] );

	return (
		<Overlay
			testID={testID}
			overlayStyle={styles.overlay}
			isVisible={open}
			onBackdropPress={onBackdropPress}
		>
			<ModalGradient style={styles.modal}>
				<Text testID="modal-title" style={styles.title}>
					{title}
				</Text>
				<DatePicker
					date={date}
					onDateChange={setDate}
					minimumDate={minimumDate}
					maximumDate={maximumDate}
					locale="en_GB"
				/>
				<View style={styles.actionsContainer}>
					<ActionSheetButton title="Done" onPress={() => onDatePicked( date )} type="constructive" />
					<ActionSheetButton title="Cancel" onPress={onBackdropPress} />
				</View>
			</ModalGradient>
		</Overlay>
	);
};

DatePickerModal.propTypes = {
	testID: PropTypes.string,
	open: PropTypes.bool,
	onBackdropPress: PropTypes.func,
	title: PropTypes.string,
	minimumDate: PropTypes.instanceOf( Date ),
	maximumDate: PropTypes.instanceOf( Date ),
	initialDate: PropTypes.instanceOf( Date ),
	onDatePicked: PropTypes.func
};

DatePickerModal.defaultProps = {
	testID: 'datePickerModal-component',
	open: false,
	onBackdropPress: noop,
	title: 'Select a date',
	minimumDate: undefined,
	maximumDate: undefined,
	initialDate: new Date( 0 ),
	onDatePicked: noop
};

export default DatePickerModal;
