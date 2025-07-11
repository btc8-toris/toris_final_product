import { extendTheme } from '@yamada-ui/react';

const customTheme = extendTheme({
  semantics: {
    colors: {
      primary: 'classicGreen.500',
      secondary: 'mintyFresh.500',
      tertiary: 'cavalry.500',
      danger: 'mysticRed.500',
      white: '#ffffff',

      classicGreen: {
        50: '#d8f3de',
        100: '#c9eed0',
        200: '#a2e2af',
        300: '#7fd791',
        400: '#5ccc72',
        500: '#3bbc54',
        600: '#319b46',
        700: '#267836',
        800: '#1b5527',
        900: '#113619',
        950: '#0b2310',
      },
      mintyFresh: {
        50: '#fbfefd',
        100: '#f7fdfb',
        200: '#ebf9f5',
        300: '#e4f7f1',
        400: '#dcf4ed',
        500: '#d2f1e7',
        600: '#9ae0ca',
        700: '#5fceab',
        800: '#35ac86',
        900: '#24755b',
        950: '#1a5643',
      },
      cavalry: {
        50: '#dbe0e6',
        100: '#c9d0d9',
        200: '#a2afbe',
        300: '#7b8da3',
        400: '#5a6c81',
        500: '#3e4a59',
        600: '#343f4b',
        700: '#2a323c',
        800: '#1f262d',
        900: '#15191e',
        950: '#0f1215',
      },
      mysticRed: {
        50: '#ffe0d1',
        100: '#ffcfb8',
        200: '#ffb18a',
        300: '#ff925c',
        400: '#ff742e',
        500: '#ff5500',
        600: '#d14600',
        700: '#a33600',
        800: '#752700',
        900: '#471800',
        950: '#331100',
      },
      hibiscusDelight: {
        50: '#fff4f0',
        100: '#ffece5',
        200: '#ffd5c7',
        300: '#ffc2ad',
        400: '#ffab8f',
        500: '#ff9673', //サーモンピンク
        600: '#ff6a38',
        700: '#ff4000',
        800: '#c23000',
        900: '#8a2200',
        950: '#6b1b00',
      },

      cabbage: {
        50: '#f3fbf9',
        100: '#e8f8f2',
        200: '#ccefe4',
        300: '#b5e8d7',
        400: '#9ae0c8',
        500: '#82d9bc', //ミントグリーン
        600: '#57cba5',
        700: '#38b78d',
        800: '#2b8c6c',
        900: '#1f654e',
        950: '#184e3c',
      },
      cavalry: {
        50: '#dbe0e6',
        100: '#c9d0d9',
        200: '#a2afbe',
        300: '#7b8da3',
        400: '#5a6c81',
        500: '#3e4a59', //ソフトネイビー
        600: '#343f4b',
        700: '#2a323c',
        800: '#1f262d',
        900: '#15191e',
        950: '#0f1215',
      },
    },
    colorSchemes: {
      primary: 'classicGreen',
      secondary: 'mintyFresh',
      tertiary: 'cavalry',
      danger: 'mysticRed.500',
    },
    fonts: {
      heading: `'Noto Sans JP', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "游ゴシック体", YuGothic, "YuGothic M", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      body: `'Noto Sans JP', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "游ゴシック体", YuGothic, "YuGothic M", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
    },
  },
})();

export default customTheme;
