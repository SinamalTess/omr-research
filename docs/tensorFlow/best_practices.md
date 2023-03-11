# Best practices

## Shuffle your data

We should randomize the order of the examples we will feed to the training algorithm.
Shuffling is important because typically during training the dataset is broken up into smaller subsets, called batches, that the model is trained on.
Shuffling helps each batch have a variety of data from across the data distribution.

```ts
tf.util.shuffle(data);
```

By doing so we help the model:

- Not learn things that are purely dependent on the order the data was fed in
- Not be sensitive to the structure in subgroups
  (e.g. if it only see high horsepower cars for the first half of its training it may learn a relationship that does not apply across the rest of the dataset).

## Convert to tensors

This convert `inputs` and `labels` arrays to 2d tensors.

The tensors will have a shape of `[num_examples, num_features_per_example]`. 

Here we have `inputs.length` examples and each example has `1` input feature.

```ts
const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
```

## Normalize the data

Normalization is important because the internals of many machine learning models you will build with tensorflow.js are designed to work with numbers that are not too big.
Common ranges to normalize data to include `0` to `1` or `-1` to `1`.
You will have more success training your models if you get into the habit of normalizing your data to some reasonable range.
