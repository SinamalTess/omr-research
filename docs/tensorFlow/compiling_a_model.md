# Compiling a model

```js
model.compile({
  optimizer: tf.train.adam(),
  loss: tf.losses.meanSquaredError,
  metrics: ['mse'],
})
```

`optimizer`: This is the algorithm that is going to govern the updates to the model as it sees examples.
There are many optimizers available in TensorFlow.js.
Here we have picked the `adam` optimizer as it is quite effective in practice and requires no configuration.

`loss`: this is a function that will tell the model how well it is doing on learning each of the batches (data subsets) that it is shown.
Here we use `meanSquaredError` to compare the predictions made by the model with the true values.
When training a model we want to see the loss go down. In this case, because our metric is a measure of error, we want to see it go down as well.
