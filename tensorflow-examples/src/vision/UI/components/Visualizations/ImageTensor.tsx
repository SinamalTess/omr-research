import * as tf from "@tensorflow/tfjs";
import {useEffect, useRef} from "react";

interface ImageProps {
    imageTensor: tf.Tensor<tf.Rank>;
}

export const ImageTensor = ({ imageTensor }: ImageProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvas = canvasRef.current;

    if (canvas) {
        canvas.width = 28;
        canvas.height = 28;
    }

    useEffect(() => {
        if (!canvas) return;
        // @ts-ignore
        tf.browser.toPixels(imageTensor, canvas).then(() => {
            imageTensor.dispose();
        });
    }, [canvas]);

    return <canvas ref={canvasRef} />;
};
