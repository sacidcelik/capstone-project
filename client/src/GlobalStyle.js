import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary: #e9896a;
  --secondary: #343f56;
  --tertiary: #387c6d;
  --background: #f8f5f1;
  --box-shadow-offset-x: 5px;
  --box-shadow-offset-y: 5px;
  --box-shadow-blur: 10px;
  --box-shadow-color: #00000029;
  --border-radius: 5px;
}
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        font-family: 'Roboto', 'sans-serif';
    }

    h1, h2, h3, h4, h5 {
        line-height: 1.2;
        font-weight: 400;
    }

    body, h1, h2, h3, p {
        margin: 0;
    }

    h1 {
        font-family: 'Noto Serif SC', 'serif';
        font-weight: 200;
        font-size: 3rem;
    }

    h2 {
        font-weight: 300;
    }

    body {
        line-height: 1.2;
        background-color: var(--background);
    }

    button {
        font-size: 1rem;
        font-weight: 700;
    }
`;
