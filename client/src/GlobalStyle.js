import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
  --primary: hsl(15, 74%, 66%);
  --primary-lightest:  hsl(15, 74%, 96%);
  --primary-light: hsl(15, 74%, 75%);
  --primary-dark:  hsl(15, 74%, 25%);


  --secondary: hsl(221, 25%, 27%);
  --secondary-lightest: hsl(221, 25%, 96%);
  --secondary-light:hsl(221, 25%, 85%);
  --secondary-dark: hsl(221, 25%, 25%);

  --tertiary: hsl(167, 38%, 35%);
  --tertiary-lightest: hsl(167, 38%, 96%);
  --tertiary-light: hsl(167, 38%, 85%);
  --tertiary-dark: hsl(167, 38%, 25%);

  --logout-remove: hsl(0, 50%, 46%);

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



#interactive.viewport {
  height: 200px;
  width: 300px;
}

#interactive.viewport canvas,
video {
  height: 200px;
 width: 300px;
}

#interactive.viewport canvas.drawingBuffer,
video.drawingBuffer {
  height: 200px;
  width: 300px;
}`;
