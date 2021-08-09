import config from './scannerconfig.json';
import PropTypes from 'prop-types';
import Quagga from 'quagga';
import { useEffect } from 'react';

const Scanner = ({ onDetected }) => {
  const detected = (result) => {
    onDetected(result.codeResult.code);
    Quagga.offDetected();
  };

  useEffect(() => {
    Quagga.init(config, (error) => {
      if (error) {
        console.error(error);
      }
      Quagga.start();
      return () => {
        Quagga.stop();
      };
    });

    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute('width')),
            Number(drawingCanvas.getAttribute('height'))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: 'x', y: 'y' },
            drawingCtx,
            { color: 'red', lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="interactive" className="viewport" />;
};

export default Scanner;

Scanner.propTypes = {
  onDetected: PropTypes.func,
};
