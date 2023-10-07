import React from 'react';
import { render } from '@testing-library/react-native';

import ReportUser from '../../../screens/ReportUser/ReportUser';
import Form from '../../../forms/Form';
import { FIELDS } from '../../../forms/reportUserFormFields';

import * as useReportUserWireframe from '../../../wireframes/useReportUserWireframe';
import mockUseView from '../../mocks/mockUseView';
import { REPORT_REASON_OPTIONS } from '../../../presenters/ReportUserPresenter';

jest.mock( '@react-navigation/native', () => ( {
	useNavigation: () => ( {} )
} ) );

describe( 'ReportUser', () => {
	const renderScreen = ( route ) => {
		mockUseView(
			useReportUserWireframe,
			{
				form: new Form(
					{ fields: FIELDS },
					{
						options: {
							showErrorsOnChange: false,
							validateOnChange: true,
							validationDebounceWait: 0
						}
					}
				),
				reportReasonOptions: REPORT_REASON_OPTIONS
			}
		);

		return render( <ReportUser route={route} /> );
	};

	test( 'renders the report options, a text area and a send button', () => {
		const route = { params: { userID: 123 } };
		const { toJSON } = renderScreen( route );

		expect( toJSON() ).toMatchSnapshot();
	} );
} );
