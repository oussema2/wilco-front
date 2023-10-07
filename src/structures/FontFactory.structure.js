import Font from './Font.structure';

class FontFactory {
	static createHero( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.black,
			fontSize: 40,
			lineHeight: 48,
			letterSpacing: -1.2
		} );
	}

	static createHeading( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.bold,
			fontSize: 32,
			lineHeight: 40,
			letterSpacing: -1
		} );
	}

	static createSuplementalTitle( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.black,
			fontSize: 18,
			lineHeight: 24,
			letterSpacing: -0.5
		} );
	}

	static createSubTitle( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.regular,
			fontSize: 18,
			lineHeight: 26
		} );
	}

	static createTitle( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.black,
			fontSize: 16,
			lineHeight: 22,
			letterSpacing: -0.3
		} );
	}

	static createButtonText( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.black,
			fontSize: 16,
			lineHeight: 22,
			letterSpacing: 0.4
		} );
	}

	static createButtonTextSmall( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.bold,
			fontSize: 15,
			lineHeight: 20,
			letterSpacing: 0.4
		} );
	}

	static createTextLink( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.bold,
			fontSize: 15,
			lineHeight: 20,
			letterSpacing: 0
		} );
	}

	static createTabs( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.black,
			fontSize: 14,
			lineHeight: 20,
			letterSpacing: 0
		} );
	}

	static createTabsMedium( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.medium,
			fontSize: 14,
			lineHeight: 20,
			letterSpacing: 0
		} );
	}

	static createBodyFocus( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.bold,
			fontSize: 14,
			lineHeight: 20,
			letterSpacing: 0
		} );
	}

	static createBody( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.regular,
			fontSize: 14,
			lineHeight: 20,
			letterSpacing: 0
		} );
	}

	static createBodySmall( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.bold,
			fontSize: 13,
			lineHeight: 20,
			letterSpacing: 0
		} );
	}

	static createCaption( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.regular,
			fontSize: 12,
			lineHeight: 16,
			letterSpacing: 0
		} );
	}

	static createCaptionSmallFocus( fontFamily ) {
		return new Font( {
			fontFamily: fontFamily.black,
			fontSize: 10,
			lineHeight: 16,
			letterSpacing: 0
		} );
	}
}

export default FontFactory;
