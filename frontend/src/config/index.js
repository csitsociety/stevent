const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		baseUrl: 'http://localhost:3000',
		API: 'http://localhost:3001',
		documentTitle: '[Dev] Stevent',
		firebaseConfig: {
			apiKey: "***REMOVED***",
			authDomain: "stevent-development-rmit.firebaseapp.com",
			projectId: "stevent-development-rmit",
			storageBucket: "stevent-development-rmit.appspot.com",
			messagingSenderId: "***REMOVED***",
			appId: "***REMOVED***"
		},
		imageStore: "https://console.cloud.google.com/storage/browser/stevent-backend-image-store-developement",
		imageStoreAccess: "https://storage.googleapis.com/stevent-backend-image-store-developement/",
	},
	production: {
		baseUrl: 'https://stevent-302609.ts.r.appspot.com',
		API: 'https://stevent-backend.ts.r.appspot.com',
		documentTitle: 'Stevent',
		firebaseConfig: {
			apiKey: "***REMOVED***",
			authDomain: "stevent-302609.firebaseapp.com",
			databaseURL: "https://stevent-302609-default-rtdb.firebaseio.com",
			projectId: "stevent-302609",
			storageBucket: "stevent-302609.appspot.com",
			messagingSenderId: "***REMOVED***",
			appId: "***REMOVED***"
		},
		imageStore: "https://console.cloud.google.com/storage/browser/stevent-backend-image-store",
		imageStoreAccess: "https://storage.googleapis.com/stevent-backend-image-store/",
	}
}

export const LANGUAGES = {af: 'Afrikaans', sq: 'Albanian', am: 'Amharic', ar: 'Arabic', hy: 'Armenian', az: 'Azerbaijani', eu: 'Basque', be: 'Belarusian', bn: 'Bengali', bs: 'Bosnian', bg: 'Bulgarian', ca: 'Catalan', ceb: 'Cebuano', zh: 'Chinese (Simplified)', 'zh-TW': 'Chinese (Traditional)', co: 'Corsican', hr: 'Croatian', cs: 'Czech', da: 'Danish', nl: 'Dutch', en: 'English', eo: 'Esperanto', et: 'Estonian', fi: 'Finnish', fr: 'French', fy: 'Frisian', gl: 'Galician', ka: 'Georgian', de: 'German', el: 'Greek', gu: 'Gujarati', ht: 'Haitian Creole', ha: 'Hausa', haw: 'Hawaiian', he: 'Hebrew', hi: 'Hindi', hmn: 'Hmong', hu: 'Hungarian', is: 'Icelandic', ig: 'Igbo', id: 'Indonesian', ga: 'Irish', it: 'Italian', ja: 'Japanese', jv: 'Javanese', kn: 'Kannada', kk: 'Kazakh', km: 'Khmer', rw: 'Kinyarwanda', ko: 'Korean', ku: 'Kurdish', ky: 'Kyrgyz', lo: 'Lao', la: 'Latin', lv: 'Latvian', lt: 'Lithuanian', lb: 'Luxembourgish', mk: 'Macedonian', mg: 'Malagasy', ms: 'Malay', ml: 'Malayalam', mt: 'Maltese', mi: 'Maori', mr: 'Marathi', mn: 'Mongolian', my: 'Myanmar (Burmese)', ne: 'Nepali', no: 'Norwegian', ny: 'Nyanja (Chichewa)', or: 'Odia (Oriya)', ps: 'Pashto', fa: 'Persian', pl: 'Polish', pt: 'Portuguese (Portugal, Brazil)', pa: 'Punjabi', ro: 'Romanian', ru: 'Russian', sm: 'Samoan', gd: 'Scots Gaelic', sr: 'Serbian', st: 'Sesotho', sn: 'Shona', sd: 'Sindhi', si: 'Sinhala (Sinhalese)', sk: 'Slovak', sl: 'Slovenian', so: 'Somali', es: 'Spanish', su: 'Sundanese', sw: 'Swahili', sv: 'Swedish', tl: 'Tagalog (Filipino)', tg: 'Tajik', ta: 'Tamil', tt: 'Tatar', te: 'Telugu', th: 'Thai', tr: 'Turkish', tk: 'Turkmen', uk: 'Ukrainian', ur: 'Urdu', ug: 'Uyghur', uz: 'Uzbek', vi: 'Vietnamese', cy: 'Welsh', xh: 'Xhosa', yi: 'Yiddish', yo: 'Yoruba', zu: 'Zulu'};

export default config[env];
