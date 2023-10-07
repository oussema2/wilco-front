import { fonts, palette } from '../Theme';
import FontFactory from '../structures/FontFactory.structure';

describe( 'Theme', () => {
	describe( '@fonts', () => {
		const fontFamily = {
			regular: 'NotoSansJP-Regular',
			medium: 'NotoSansJP-Medium',
			bold: 'NotoSansJP-Bold',
			black: 'NotoSansJP-Black'
		};

		it( 'returns the correct fonts', () => {
			expect( fonts ).toEqual( {
				hero: FontFactory.createHero( fontFamily ),
				heading: FontFactory.createHeading( fontFamily ),
				suplementalTitle: FontFactory.createSuplementalTitle( fontFamily ),
				subTitle: FontFactory.createSubTitle( fontFamily ),
				title: FontFactory.createTitle( fontFamily ),
				buttonText: FontFactory.createButtonText( fontFamily ),
				buttonTextSmall: FontFactory.createButtonTextSmall( fontFamily ),
				textLink: FontFactory.createTextLink( fontFamily ),
				tabs: FontFactory.createTabs( fontFamily ),
				tabsMedium: FontFactory.createTabsMedium( fontFamily ),
				bodyFocus: FontFactory.createBodyFocus( fontFamily ),
				body: FontFactory.createBody( fontFamily ),
				bodySmall: FontFactory.createBodySmall( fontFamily ),
				caption: FontFactory.createCaption( fontFamily ),
				captionSmallFocus: FontFactory.createCaptionSmallFocus( fontFamily )
			} );
		} );
	} );

	describe( '@palette', () => {
		it( 'returns the correct palette', () => {
			const expectedColors = {
				grayscale: {
					black: '#000000',
					abbey: '#5B5B5B',
					shutterGrey: '#767676',
					aluminum: '#A0A0A0',
					iron: '#D3D3D3',
					mercury: '#E3E3E3',
					wildSand: '#F2F2F2',
					aliceBlue: '#F6F9FA',
					white: '#FFFFFF'
				},
				bluescale: {
					lightBlue: '#E6E7EA'
				},
				teal: {
					dark: '#C7F7FF',
					darkCyan: '#008BA5',
					default: '#12A3BE',
					middleBlue: '#99D3DE',
					background: '#E6F6F9',
					light: '#F6FEFF'
				},
				navy: {
					default: '#1F2E4E'
				},
				success: {
					default: '#00A86F'
				},
				warning: {
					default: '#FFFBE6'
				},
				error: {
					default: '#D60A50',
					background: '#FFEBF2'
				},
				skeleton: {
					background: '#C4C4C4',
					highlight: '#DBDBDB'
				},
				subtitle: {
					default: '#5C6780'
				}
			};
			const expectedPalette = {
				primary: expectedColors.teal,
				secondary: expectedColors.navy,
				grayscale: expectedColors.grayscale,
				bluescale: expectedColors.bluescale,
				success: expectedColors.success,
				warning: expectedColors.warning,
				error: expectedColors.error,
				skeleton: expectedColors.skeleton,
				subtitle: expectedColors.subtitle
			};

			expect( palette ).toEqual( expectedPalette );
		} );
	} );
} );
