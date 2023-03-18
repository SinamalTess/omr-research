import * as tf from "@tensorflow/tfjs";
import {useEffect, useRef} from "react";

interface ImageProps {
    imageTensor: tf.Tensor<tf.Rank>;
}

export const ImageTensor = ({ imageTensor }: ImageProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvas = canvasRef.current;

    useEffect(() => {
        if (!canvas) return;
        console.log(imageTensor)
        console.log(canvas)
        // @ts-ignore
        tf.browser.toPixels(imageTensor, canvas).then(() => {
            imageTensor.dispose();
        });
    }, [canvas]);

    return <canvas ref={canvasRef} width={28} height={28}/>;
};
