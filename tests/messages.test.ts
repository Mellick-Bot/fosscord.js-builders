import {
	blockQuote,
	bold,
	channelMention,
	codeBlock,
	Faces,
	hideLinkEmbed,
	hyperlink,
	spoiler,
	inlineCode,
	italic,
	memberNicknameMention,
	quote,
	roleMention,
	strikethrough,
	time,
	TimestampStyles,
	underscore,
	userMention,
} from '../src';

describe('Messages', () => {
	describe('codeBlock', () => {
		test('GIVEN "fosscord.js" with no language THEN returns "```\\nfosscord.js```"', () => {
			expect<'```\nfosscord.js```'>(codeBlock('fosscord.js')).toBe('```\nfosscord.js```');
		});

		test('GIVEN "fosscord.js" with "js" as language THEN returns "```js\\nfosscord.js```"', () => {
			expect<'```js\nfosscord.js```'>(codeBlock('js', 'fosscord.js')).toBe('```js\nfosscord.js```');
		});
	});

	describe('inlineCode', () => {
		test('GIVEN "fosscord.js" THEN returns "`fosscord.js`"', () => {
			expect<'`fosscord.js`'>(inlineCode('fosscord.js')).toBe('`fosscord.js`');
		});
	});

	describe('italic', () => {
		test('GIVEN "fosscord.js" THEN returns "_fosscord.js_"', () => {
			expect<'_fosscord.js_'>(italic('fosscord.js')).toBe('_fosscord.js_');
		});
	});

	describe('bold', () => {
		test('GIVEN "fosscord.js" THEN returns "**fosscord.js**"', () => {
			expect<'**fosscord.js**'>(bold('fosscord.js')).toBe('**fosscord.js**');
		});
	});

	describe('underscore', () => {
		test('GIVEN "fosscord.js" THEN returns "__fosscord.js__"', () => {
			expect<'__fosscord.js__'>(underscore('fosscord.js')).toBe('__fosscord.js__');
		});
	});

	describe('strikethrough', () => {
		test('GIVEN "fosscord.js" THEN returns "~~fosscord.js~~"', () => {
			expect<'~~fosscord.js~~'>(strikethrough('fosscord.js')).toBe('~~fosscord.js~~');
		});
	});

	describe('quote', () => {
		test('GIVEN "fosscord.js" THEN returns "> fosscord.js"', () => {
			expect<'> fosscord.js'>(quote('fosscord.js')).toBe('> fosscord.js');
		});
	});

	describe('blockQuote', () => {
		test('GIVEN "fosscord.js" THEN returns ">>> fosscord.js"', () => {
			expect<'>>> fosscord.js'>(blockQuote('fosscord.js')).toBe('>>> fosscord.js');
		});
	});

	describe('hideLinkEmbed', () => {
		test('GIVEN "https://fosscord.js.org" THEN returns "<https://fosscord.js.org>"', () => {
			expect<'<https://fosscord.js.org>'>(hideLinkEmbed('https://fosscord.js.org')).toBe('<https://fosscord.js.org>');
		});

		test('GIVEN new URL("https://fosscord.js.org") THEN returns "<https://fosscord.js.org>"', () => {
			expect<`<${string}>`>(hideLinkEmbed(new URL('https://fosscord.js.org/'))).toBe('<https://fosscord.js.org/>');
		});
	});

	describe('hyperlink', () => {
		test('GIVEN content and string URL THEN returns "[content](url)"', () => {
			expect<'[fosscord.js](https://fosscord.js.org)'>(hyperlink('fosscord.js', 'https://fosscord.js.org')).toBe(
				'[fosscord.js](https://fosscord.js.org)',
			);
		});

		test('GIVEN content and URL THEN returns "[content](url)"', () => {
			expect<`[fosscord.js](${string})`>(hyperlink('fosscord.js', new URL('https://fosscord.js.org'))).toBe(
				'[fosscord.js](https://fosscord.js.org/)',
			);
		});

		test('GIVEN content, string URL, and title THEN returns "[content](url "title")"', () => {
			expect<'[fosscord.js](https://fosscord.js.org "Official Documentation")'>(
				hyperlink('fosscord.js', 'https://fosscord.js.org', 'Official Documentation'),
			).toBe('[fosscord.js](https://fosscord.js.org "Official Documentation")');
		});

		test('GIVEN content, URL, and title THEN returns "[content](url "title")"', () => {
			expect<`[fosscord.js](${string} "Official Documentation")`>(
				hyperlink('fosscord.js', new URL('https://fosscord.js.org'), 'Official Documentation'),
			).toBe('[fosscord.js](https://fosscord.js.org/ "Official Documentation")');
		});
	});
	
	describe('spoiler', () => {
		test('GIVEN "fosscord.js" THEN returns "||fosscord.js||"', () => {
			expect<'||fosscord.js||'>(spoiler('fosscord.js')).toBe('||fosscord.js||');
		});
	});

	describe('Mentions', () => {
		describe('userMention', () => {
			test('GIVEN userId THEN returns "<@[userId]>"', () => {
				expect(userMention('139836912335716352')).toBe('<@139836912335716352>');
			});
		});

		describe('memberNicknameMention', () => {
			test('GIVEN memberId THEN returns "<@![memberId]>"', () => {
				expect(memberNicknameMention('139836912335716352')).toBe('<@!139836912335716352>');
			});
		});

		describe('channelMention', () => {
			test('GIVEN channelId THEN returns "<#[channelId]>"', () => {
				expect(channelMention('829924760309334087')).toBe('<#829924760309334087>');
			});
		});

		describe('roleMention', () => {
			test('GIVEN roleId THEN returns "<&[roleId]>"', () => {
				expect(roleMention('815434166602170409')).toBe('<@&815434166602170409>');
			});
		});
	});

	describe('time', () => {
		test('GIVEN no arguments THEN returns "<t:${bigint}>"', () => {
			jest.useFakeTimers('modern');
			jest.setSystemTime(1566424897579);

			expect<`<t:${bigint}>`>(time()).toBe('<t:1566424897>');

			jest.useRealTimers();
		});

		test('GIVEN a date THEN returns "<t:${bigint}>"', () => {
			expect<`<t:${bigint}>`>(time(new Date(1867424897579))).toBe('<t:1867424897>');
		});

		test('GIVEN a date and a style from string THEN returns "<t:${bigint}:${style}>"', () => {
			expect<`<t:${bigint}:d>`>(time(new Date(1867424897579), 'd')).toBe('<t:1867424897:d>');
		});

		test('GIVEN a date and a format from enum THEN returns "<t:${bigint}:${style}>"', () => {
			expect<`<t:${bigint}:R>`>(time(new Date(1867424897579), TimestampStyles.RelativeTime)).toBe('<t:1867424897:R>');
		});

		test('GIVEN a date THEN returns "<t:${time}>"', () => {
			expect<'<t:1867424897>'>(time(1867424897)).toBe('<t:1867424897>');
		});

		test('GIVEN a date and a style from string THEN returns "<t:${time}:${style}>"', () => {
			expect<'<t:1867424897:d>'>(time(1867424897, 'd')).toBe('<t:1867424897:d>');
		});

		test('GIVEN a date and a format from enum THEN returns "<t:${time}:${style}>"', () => {
			expect<'<t:1867424897:R>'>(time(1867424897, TimestampStyles.RelativeTime)).toBe('<t:1867424897:R>');
		});
	});

	describe('Faces', () => {
		test('GIVEN Faces.Shrug THEN returns "¯\\_(ツ)\\_/¯"', () => {
			expect<'¯\\_(ツ)\\_/¯'>(Faces.Shrug).toBe('¯\\_(ツ)\\_/¯');
		});

		test('GIVEN Faces.Tableflip THEN returns "(╯°□°）╯︵ ┻━┻"', () => {
			expect<'(╯°□°）╯︵ ┻━┻'>(Faces.Tableflip).toBe('(╯°□°）╯︵ ┻━┻');
		});

		test('GIVEN Faces.Unflip THEN returns "┬─┬ ノ( ゜-゜ノ)"', () => {
			expect<'┬─┬ ノ( ゜-゜ノ)'>(Faces.Unflip).toBe('┬─┬ ノ( ゜-゜ノ)');
		});
	});
});
