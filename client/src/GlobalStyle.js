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
    }

    h1, h2, h3 {
        line-height: 1.2;
    }

    body, h1, h2, h3, p {
        margin: 0;
    }

    body {
        line-height: 1.2;
        font-family: sans-serif;
        background-color: var(--background);
    }
`;
