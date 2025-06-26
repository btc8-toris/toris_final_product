import { extendTheme } from "@yamada-ui/react";

const customTheme = extendTheme({
    semantics: {
      colors: {
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
          500: '#82d9bc',//ミントグリーン
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
          500: '#3e4a59',//ソフトネイビー
          600: '#343f4b',
          700: '#2a323c',
          800: '#1f262d',
          900: '#15191e',
          950: '#0f1215',
        },
      },
      colorSchemes: {
        primary: 'hibiscusDelight',
        secondary:'cabbage',
        tertiary:'cavalry',
        salmonPink: '#FF9673',
        mintGreen: '#82D9BC',
        softNavy: '#3E4A59',
      },
    },
  })();

  export default customTheme