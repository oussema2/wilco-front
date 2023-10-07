import _ from 'lodash';
import PilotFactory from '../factories/PilotFactory';
import noop from '../../helpers/noop';
import CredentialsPresenter from '../../presenters/CredentialsPresenter';
import CredentialFactory from '../factories/CredentialFactory';
import flushPromises from '../support/flushPromises';
import { CERTIFICATES_OTHER, RATINGS_OTHER } from '../../constants/formFields/editCredentialsForm';

describe( 'CredentialsPresenter', () => {
	let presenter;
	const pilotRatings = CredentialFactory.buildList( 4 );
	const pilotCertificates = CredentialFactory.buildList( 4 );
	const pilot = PilotFactory.build( { ratings: pilotRatings, certificates: pilotCertificates } );
	const fetchCredentialsFromRemote = { execute: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new CredentialsPresenter( {
			pilot,
			fetchCredentialsFromRemote,
			makeAutoObservable: noop
		} );

		const otherOption = {
			id: 99,
			name: 'Other'
		};

		const ratings = _.merge( pilotRatings, otherOption );
		const certificates = _.merge( pilotCertificates, otherOption );
		const credentials = { certificates, ratings };
		presenter.dataToComponent( credentials );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.pilot ).toEqual( pilot );
		} );
	} );

	describe( '@certificates', () => {
		it( 'returns the list of certificates', () => {
			const certificates = CredentialFactory.build( 2 );
			presenter.certificatesList = certificates;

			expect( presenter.certificates ).toBe( certificates );
		} );
	} );

	describe( '@ratings', () => {
		it( 'returns the list of ratings', () => {
			const ratings = CredentialFactory.build( 3 );
			presenter.ratingsList = ratings;

			expect( presenter.ratings ).toBe( ratings );
		} );
	} );

	describe( '@onSelectionsCertificatesChange', () => {
		it( 'change array of selected certificates', () => {
			const certificates = CredentialFactory.build( 2 );
			const selectedCertificates = [ certificates[ 0 ] ];
			presenter.onSelectionsCertificatesChange( selectedCertificates );
			expect( presenter.selectedCertificates ).toBe( selectedCertificates );
		} );
	} );

	describe( '@onSelectionsRatingsChange', () => {
		it( 'change array of selected ratings', () => {
			const ratings = CredentialFactory.build( 4 );
			const selectedRatings = [ ratings[ 1 ] ];
			presenter.onSelectionsRatingsChange( selectedRatings );
			expect( presenter.selectedRatings ).toBe( selectedRatings );
		} );
	} );

	describe( '@dataToComponent', () => {
		it( 'change data for SelectMultiple component', () => {
			const ratings = CredentialFactory.buildList( 2 );
			const certificates = CredentialFactory.buildList( 4 );
			const credentials = { certificates, ratings };
			presenter.dataToComponent( credentials );

			const newRatings =	ratings.map( ( item ) => ( {
				value: item.id,
				label: item.name
			} ) );

			const newCertificates =	certificates.map( ( item ) => ( {
				value: item.id,
				label: item.name
			} ) );

			expect( presenter.ratings ).toEqual( newRatings );

			expect( presenter.certificates ).toEqual( newCertificates );
		} );
	} );

	describe( '@certificatesForWs', () => {
		it( 'Return array of certificates ids', () => {
			presenter.selectedCertificates = [ presenter.certificatesList[ 0 ],
				presenter.certificatesList[ 1 ] ];

			const expectedArray = presenter.certificatesForWs( );

			const ids = presenter.selectedCertificates.map( ( item ) => item.value );
			const otherToBeIds = [ presenter.selectedCertificates[ 0 ].value,
				presenter.selectedCertificates[ 1 ].value ];

			expect( expectedArray ).toStrictEqual( ids );
			expect( expectedArray ).toStrictEqual( otherToBeIds );
		} );
	} );

	describe( '@ratingsForWs', () => {
		it( 'Return array of ratings ids', () => {
			presenter.selectedRatings = [ presenter.ratingsList[ 0 ],
				presenter.ratingsList[ 1 ] ];

			const expectedArray = presenter.ratingsForWs( );

			const ids = presenter.selectedRatings.map( ( item ) => item.value );
			const otherToBeIds = [ presenter.selectedRatings[ 0 ].value,
				presenter.selectedRatings[ 1 ].value ];

			expect( expectedArray ).toStrictEqual( ids );
			expect( expectedArray ).toStrictEqual( otherToBeIds );
		} );
	} );

	describe( '@certificatesHaveChanged', () => {
		it( 'When certificates have no changed', () => {
			presenter.selectedCertificates = presenter._dataToComponent( pilot.certificates );
			expect( presenter.certificatesHaveChanged ).toBe( false );
		} );

		it( 'When certificates have changed', () => {
			presenter.selectedCertificates = presenter._dataToComponent( pilot.certificates );
			presenter.selectedCertificates = [ presenter.selectedCertificates[ 0 ] ];
			expect( presenter.certificatesHaveChanged ).toBe( true );
		} );
	} );

	describe( '@ratingsHaveChanged', () => {
		it( 'When ratings have no changed', () => {
			presenter.selectedRatings = presenter._dataToComponent( pilot.ratings );
			expect( presenter.ratingsHaveChanged ).toBe( false );
		} );

		it( 'When ratings have changed', () => {
			presenter.selectedRatings = presenter._dataToComponent( pilot.ratings );
			presenter.selectedRatings = [ presenter.selectedRatings[ 0 ] ];
			expect( presenter.ratingsHaveChanged ).toBe( true );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when it did not finish fetching the credentials from remote', () => {
			it( 'returns true', () => {
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when it finished fetching the credentials from remote', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isLoading ).toBe( false );
			} );
		} );
	} );

	describe( 'isOptionOtherSelectedCertificates()', () => {
		describe( 'when option "other" is selected for certificates', () => {
			it( 'returns true', () => {
				const certificates = [ { label: 'Other' } ];
				presenter.onSelectionsCertificatesChange( certificates );

				expect( presenter.isOptionOtherSelectedCertificates ).toBe( true );
			} );
		} );

		describe( 'when option "other" is not selected for certificates', () => {
			it( 'returns false', () => {
				const certificates = [ { label: 'Other 2' } ];
				presenter.onSelectionsCertificatesChange( certificates );

				expect( presenter.isOptionOtherSelectedCertificates ).toBe( false );
			} );
		} );
	} );

	describe( 'isOptionOtherSelectedRatings()', () => {
		describe( 'when option "other" is selected for ratings', () => {
			it( 'returns true', () => {
				const ratings = [ { label: 'Other' } ];
				presenter.onSelectionsRatingsChange( ratings );

				expect( presenter.isOptionOtherSelectedRatings ).toBe( true );
			} );
		} );

		describe( 'when option "other" is not selected for ratings', () => {
			it( 'returns false', () => {
				const ratings = [ { label: 'Other 2' } ];
				presenter.onSelectionsRatingsChange( ratings );

				expect( presenter.isOptionOtherSelectedRatings ).toBe( false );
			} );
		} );
	} );

	describe( 'isValid()', () => {
		const setValidInputs = () => {
			presenter.form.$( CERTIFICATES_OTHER ).set( 'other' );
			presenter.form.$( RATINGS_OTHER ).set( 'other' );
		};

		const setInvalidInputs = () => {
			const invalidValue = '12345678911234567891123456789112345678911234567891123456789112345678911234567891123456789112345678911';
			presenter.form.$( CERTIFICATES_OTHER ).set( invalidValue );
		};

		describe( 'when the inputs "other" are valid', () => {
			it( 'returns true', async () => {
				setValidInputs();
				await presenter.form.validate();
				expect( presenter.isValid ).toBe( true );
			} );
		} );

		describe( 'when at least one input "other" has more than 100 characters', () => {
			it( 'returns false', async () => {
				setInvalidInputs();
				await presenter.form.validate();
				expect( presenter.isValid ).toBe( false );
			} );
		} );
	} );

	describe( 'customCertificatesNames()', () => {
		const customCertificates = 'certificate 1, certificate 2';

		describe( 'when the user check option "other" on certificates section', () => {
			it( 'returns array of custom roles', () => {
				const certificates = [ { label: 'Other' } ];
				presenter.form.set( { certificatesOther: customCertificates } );
				presenter.onSelectionsCertificatesChange( certificates );

				expect( presenter.customCertificatesNames ).toEqual( [ 'certificate 1', 'certificate 2' ] );
			} );
		} );

		describe( 'when the user does not check option "other" on certificates section', () => {
			it( 'returns empty array', () => {
				const certificates = [ { value: 1, label: 'Certificate 1' } ];
				presenter.form.set( { certificatesOther: customCertificates } );
				presenter.onSelectionsCertificatesChange( certificates );

				expect( presenter.customCertificatesNames ).toEqual( [] );
			} );
		} );
	} );

	describe( 'customRatingsNames()', () => {
		const customRatings = 'rating 1, rating 2';

		describe( 'when the user check option "Other" on ratings section', () => {
			it( 'returns array of custom roles', () => {
				const ratings = [ { label: 'Other' } ];
				presenter.form.set( { ratingsOther: customRatings } );
				presenter.onSelectionsRatingsChange( ratings );

				expect( presenter.customRatingsNames ).toEqual( [ 'rating 1', 'rating 2' ] );
			} );
		} );

		describe( 'when the user does not check option "other" on ratings section', () => {
			it( 'returns empty array', () => {
				const ratings = [ { value: 1, label: 'Rating 1' } ];
				presenter.form.set( { certificatesOther: customRatings } );
				presenter.onSelectionsRatingsChange( ratings );

				expect( presenter.customRatingsNames ).toEqual( [] );
			} );
		} );
	} );

	describe( 'autofillForm()', () => {
		describe( 'when the user check option "other" on certificates section', () => {
			it( 'returns array of custom roles', () => {
				presenter.autofillForm();
				const expectedRatings = presenter._dataToComponent( pilotRatings );
				const expectedCertificates = presenter._dataToComponent( pilotCertificates );
				expect( presenter.selectedRatings ).toEqual( expectedRatings );
				expect( presenter.selectedCertificates ).toEqual( expectedCertificates );
			} );
		} );
	} );
} );
