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
		test('GIVEN "fosscord-gopnik" with no language THEN returns "```\\nfosscord-gopnik```"', () => {
			expect<'```\nfosscord-gopnik```'>(codeBlock('fosscord-gopnik')).toBe('```\nfosscord-gopnik```');
		});

		test('GIVEN "fosscord-gopnik" with "js" as language THEN returns "```js\\nfosscord-gopnik```"', () => {
			expect<'```js\nfosscord-gopnik```'>(codeBlock('js', 'fosscord-gopnik')).toBe('```js\nfosscord-gopnik```');
		});
	});

	describe('inlineCode', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "`fosscord-gopnik`"', () => {
			expect<'`fosscord-gopnik`'>(inlineCode('fosscord-gopnik')).toBe('`fosscord-gopnik`');
		});
	});

	describe('italic', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "_fosscord-gopnik_"', () => {
			expect<'_fosscord-gopnik_'>(italic('fosscord-gopnik')).toBe('_fosscord-gopnik_');
		});
	});

	describe('bold', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "**fosscord-gopnik**"', () => {
			expect<'**fosscord-gopnik**'>(bold('fosscord-gopnik')).toBe('**fosscord-gopnik**');
		});
	});

	describe('underscore', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "__fosscord-gopnik__"', () => {
			expect<'__fosscord-gopnik__'>(underscore('fosscord-gopnik')).toBe('__fosscord-gopnik__');
		});
	});

	describe('strikethrough', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "~~fosscord-gopnik~~"', () => {
			expect<'~~fosscord-gopnik~~'>(strikethrough('fosscord-gopnik')).toBe('~~fosscord-gopnik~~');
		});
	});

	describe('quote', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "> fosscord-gopnik"', () => {
			expect<'> fosscord-gopnik'>(quote('fosscord-gopnik')).toBe('> fosscord-gopnik');
		});
	});

	describe('blockQuote', () => {
		test('GIVEN "fosscord-gopnik" THEN returns ">>> fosscord-gopnik"', () => {
			expect<'>>> fosscord-gopnik'>(blockQuote('fosscord-gopnik')).toBe('>>> fosscord-gopnik');
		});
	});

	describe('hideLinkEmbed', () => {
		test('GIVEN "https://fosscord-gopnik.org" THEN returns "<https://fosscord-gopnik.org>"', () => {
			expect<'<https://fosscord-gopnik.org>'>(hideLinkEmbed('https://fosscord-gopnik.org')).toBe('<https://fosscord-gopnik.org>');
		});

		test('GIVEN new URL("https://fosscord-gopnik.org") THEN returns "<https://fosscord-gopnik.org>"', () => {
			expect<`<${string}>`>(hideLinkEmbed(new URL('https://fosscord-gopnik.org/'))).toBe('<https://fosscord-gopnik.org/>');
		});
	});

	describe('hyperlink', () => {
		test('GIVEN content and string URL THEN returns "[content](url)"', () => {
			expect<'[fosscord-gopnik](https://fosscord-gopnik.org)'>(hyperlink('fosscord-gopnik', 'https://fosscord-gopnik.org')).toBe(
				'[fosscord-gopnik](https://fosscord-gopnik.org)',
			);
		});

		test('GIVEN content and URL THEN returns "[content](url)"', () => {
			expect<`[fosscord-gopnik](${string})`>(hyperlink('fosscord-gopnik', new URL('https://fosscord-gopnik.org'))).toBe(
				'[fosscord-gopnik](https://fosscord-gopnik.org/)',
			);
		});

		test('GIVEN content, string URL, and title THEN returns "[content](url "title")"', () => {
			expect<'[fosscord-gopnik](https://fosscord-gopnik.org "Official Documentation")'>(
				hyperlink('fosscord-gopnik', 'https://fosscord-gopnik.org', 'Official Documentation'),
			).toBe('[fosscord-gopnik](https://fosscord-gopnik.org "Official Documentation")');
		});

		test('GIVEN content, URL, and title THEN returns "[content](url "title")"', () => {
			expect<`[fosscord-gopnik](${string} "Official Documentation")`>(
				hyperlink('fosscord-gopnik', new URL('https://fosscord-gopnik.org'), 'Official Documentation'),
			).toBe('[fosscord-gopnik](https://fosscord-gopnik.org/ "Official Documentation")');
		});
	});
	
	describe('spoiler', () => {
		test('GIVEN "fosscord-gopnik" THEN returns "||fosscord-gopnik||"', () => {
			expect<'||fosscord-gopnik||'>(spoiler('fosscord-gopnik')).toBe('||fosscord-gopnik||');
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
