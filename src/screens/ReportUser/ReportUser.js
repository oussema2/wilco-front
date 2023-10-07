/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';

import BaseScreen from '../BaseScreen/BaseScreen';
import { KeyboardAwareScrollView } from '../../components/KeyboardAwareScrollView';
import { NavigationBar } from '../../components/NavigationBar';
import { HorizontalPadding } from '../../components/HorizontalPadding';
import TextArea from '../../components/TextArea/TextArea';
import { cross } from '../../assets/icons';

import useReportUserWireframe from '../../wireframes/useReportUserWireframe';
import { REPORT_REASON_FIELD, ADDITIONAL_INFORMATION_FIELD } from '../../forms/reportUserFormFields';

import styles from './ReportUser.styles';
import { PrimaryButton } from '../../components';
import { RadioList } from '../../components/RadioList';

const ReportUser = ( { route } ) => {
	const { pilotId } = route.params;
	const presenter = useReportUserWireframe();

	const textAreaRef = useRef( null );

	const _fixedBottomContent = () => (
		<View style={styles.buttonContainer}>
			<PrimaryButton
				testID="send-report"
				title={presenter.sendButtonLabel}
				size="big"
				disabled={!presenter.sendButtonEnabled}
				onPress={() => presenter.onReportSent( pilotId )}
			/>
		</View>
	);

	return ( !!presenter && (
		<BaseScreen isLoading={presenter?.isSendingReport}>
			<StatusBar barStyle="dark-content" />
			<HorizontalPadding>
				<NavigationBar
					title="Report User"
					rightAction={{
						image: cross,
						imageStyle: { width: 16, height: 16 },
						onPress: presenter.onCrossPressed
					}}
				/>
			</HorizontalPadding>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				scrollToInputAdditionalOffset={150}
				getTextInputRefs={() => [ textAreaRef.current ]}
				alwaysBounceVertical={false}
				fixedBottomContent={_fixedBottomContent()}
			>
				<View style={styles.subHeaderContainer}>
					<Text style={styles.subHeaderText}>
						Tell us what happened
					</Text>
				</View>
				<View style={styles.ReportUserContent}>
					<HorizontalPadding style={{ paddingBottom: 20 }}>
						<RadioList
							testID="report-reasons-list"
							onChange={presenter.form.$( REPORT_REASON_FIELD ).bind().onChange}
							value={presenter.form.$( REPORT_REASON_FIELD ).value}
							options={presenter.reportReasonOptions}
						/>
						<TextArea
							testID="report-additional-information"
							maxLength={300}
							error={presenter.form.$( ADDITIONAL_INFORMATION_FIELD ).error}
							inputProps={{
								inputRef: textAreaRef,
								...presenter.form.$( ADDITIONAL_INFORMATION_FIELD ).bind()
							}}
						/>
					</HorizontalPadding>
				</View>
			</KeyboardAwareScrollView>
		</BaseScreen>
	) );
};

ReportUser.propTypes = {
	route: PropTypes.any.isRequired
};

export default observer( ReportUser );
