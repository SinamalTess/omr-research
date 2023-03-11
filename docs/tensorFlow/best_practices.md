# Best practices

## Shuffle your data

We should randomize the order of the examples we will feed to the training algorithm.
Shuffling is important because typically during training the dataset is broken up into smaller subsets, called batches, that the model is trained on.
Shuffling helps each batch have a variety of data from across the data distribution.

By doing so we help the model:

- Not learn things that are purely dependent on the order the data was fed in
- Not be sensitive to the structure in subgroups
  (e.g. if it only see high horsepower cars for the first half of its training it may learn a relationship that does not apply across the rest of the dataset).

## Normalize the data

Normalization is important because the internals of many machine learning models you will build with tensorflow.js are designed to work with numbers that are not too big.
Common ranges to normalize data to include `0` to `1` or `-1` to `1`.
You will have more success training your models if you get into the habit of normalizing your data to some reasonable range.
