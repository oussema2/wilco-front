import FontFactory from '../../structures/FontFactory.structure';

describe( 'FontFactory', () => {
	const fontTypeMedium = 'medium';
	const fontTypeRegular = 'regular';
	const fontTypeBold = 'bold';
	const fontTypeBlack = 'black';

	const fontFamily = {
		regular: fontTypeRegular,
		medium: fontTypeMedium,
		bold: fontTypeBold,
		black: fontTypeBlack
	};

	describe( '@createHero', () => {
		it( 'creates the hero text correctly', () => {
			const font = FontFactory.createHero( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBlack,
				fontSize: 40,
				lineHeight: 48,
				letterSpacing: -1.2
			} );
		} );
	} );

	describe( '@createButtonText', () => {
		it( 'creates the ButtonText correctly', () => {
			const font = FontFactory.createButtonText( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBlack,
				fontSize: 16,
				lineHeight: 22,
				letterSpacing: 0.4
			} );
		} );
	} );

	describe( '@createButtonTextSmall', () => {
		it( 'creates the ButtonTextSmall correctly', () => {
			const font = FontFactory.createButtonTextSmall( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBold,
				fontSize: 15,
				lineHeight: 20,
				letterSpacing: 0.4,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createHeading', () => {
		it( 'creates the Heading correctly', () => {
			const font = FontFactory.createHeading( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBold,
				fontSize: 32,
				lineHeight: 40,
				letterSpacing: -1,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createSuplementalTitle', () => {
		it( 'creates the suplemental Title correctly', () => {
			const font = FontFactory.createSuplementalTitle( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBlack,
				fontSize: 18,
				lineHeight: 24,
				letterSpacing: -0.5,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createSubTitle', () => {
		it( 'creates the subTitle correctly', () => {
			const font = FontFactory.createSubTitle( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeRegular,
				fontSize: 18,
				lineHeight: 26,
				letterSpacing: undefined,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createTitle', () => {
		it( 'creates the Title correctly', () => {
			const font = FontFactory.createTitle( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBlack,
				fontSize: 16,
				lineHeight: 22,
				letterSpacing: -0.3,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createTabs', () => {
		it( 'creates the Tabs correctly', () => {
			const font = FontFactory.createTabs( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontFamily.black,
				fontSize: 14,
				lineHeight: 20,
				letterSpacing: 0,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createTabsMedium', () => {
		it( 'creates the TabsMedium correctly', () => {
			const font = FontFactory.createTabsMedium( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontFamily.medium,
				fontSize: 14,
				lineHeight: 20,
				letterSpacing: 0,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createBodyFocus', () => {
		it( 'creates the BondyFocus correctly', () => {
			const font = FontFactory.createBodyFocus( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBold,
				fontSize: 14,
				lineHeight: 20,
				letterSpacing: 0,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createBody', () => {
		it( 'creates the Body correctly', () => {
			const font = FontFactory.createBody( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontFamily.regular,
				fontSize: 14,
				lineHeight: 20,
				letterSpacing: 0,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createBodySmall', () => {
		it( 'creates the BodySmall correctly', () => {
			const font = FontFactory.createBodySmall( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontFamily.bold,
				fontSize: 13,
				lineHeight: 20,
				letterSpacing: 0
			} );
		} );
	} );

	describe( '@createCaption', () => {
		it( 'creates the Caption correctly', () => {
			const font = FontFactory.createCaption( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontFamily.regular,
				fontSize: 12,
				lineHeight: 16,
				letterSpacing: 0,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createCaptionSmallFocus', () => {
		it( 'creates the Caption Small Focus correctly', () => {
			const font = FontFactory.createCaptionSmallFocus( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBlack,
				fontSize: 10,
				lineHeight: 16,
				letterSpacing: 0,
				fontWeight: undefined
			} );
		} );
	} );

	describe( '@createTextLink', () => {
		it( 'creates the Text Link correctly', () => {
			const font = FontFactory.createTextLink( fontFamily );

			expect( font ).toEqual( {
				fontFamily: fontTypeBold,
				fontSize: 15,
				lineHeight: 20,
				letterSpacing: 0
			} );
		} );
	} );
} );
