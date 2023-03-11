# Training a model

`batchSize` refers to the size of the data subsets that the model will see on each iteration of training. 

Common batch sizes tend to be in the range 32-512. There isn't really an ideal batch size for all problems, you have to define it depending on the problem you are trying to solve. 

`epochs` refers to the number of times the model is going to look at the entire dataset that you provide it. Here we will take `50` iterations through the dataset.

```ts
const batchSize = 32;
const epochs = 50;

return await model.fit(inputs, labels, {
  batchSize,
  epochs,
  callbacks: tfvis.show.fitCallbacks(
    { name: 'Training Performance' },
    ['loss', 'mse'],
    { height: 200, callbacks: ['onEpochEnd'] }
  )
});

```
