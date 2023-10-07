export const PHOTOS_ALLOWED_PER_POST = 10;

export const PART_TYPE = {
	mention: {
		trigger: '@'
	},
	url: {
		pattern: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_\\+\\[\],.~#?&\\/=]*[-a-zA-Z0-9@:%_\\+\]~#?&/=])*/gi
	},
	urlShort: {
		pattern: /([\w.]+\.(?:com|cc|net|us)[^,\s]*)/gi
	},
	airports: {
		pattern: /((\+)([a-zA-Z0-9]{3,4})(?!([a-zA-Z0-9+])))/gi
	},
	hashtagPattern: {
		pattern: /(#+[\p{L}0-9]{1,})/giu
	},
	hashtagTrigger: {
		trigger: '#'
	}
};
