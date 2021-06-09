import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary: #e9896a;
  --secondary: #343f56;
  --tertiary: #387c6d;
  --background: #f8f5f1;
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
        line-height: 1.5;
        font-size: 1.1rem;
        font-family: sans-serif;
        background-color: var(--background);
    }
`;
