import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { useEffect } from "react";

export function getModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
}

export function useShowModel() {
    useEffect(() => {
        const model = getModel();
        tfvis.show.modelSummary({ name: "Model Summary" }, model);
    }, []);
}
