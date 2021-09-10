# Neural networks training

## Supervised training 

Probably the most common, it is used when we want to teach a network to map 2 things together.
For example an image to a label or to their semantic mask. It requires access to a dataset containing images and their truth label. 

- You feed the network with the images and collect the results. The network will initially fail, most likely. 
- You evaluate the loss, that is, how wrong the prediction went. And you compare the loss to the truth values. 
- The network will adjust its parameter accordingly to try to reduce the loss and will try again. 
- It will repeat this process until it converges, that is, until it cannot improve further. 

## Unsupervised training 

When we don't have data to train the network we can use unsupervised training. 
The idea is to craft a function that computes the network's loss based on its input and its corresponding output. 
It requires some expertise regarding use cases so that we can build meaningful loss functions.

## Reinforcement training 

In this case an agent, that is for example a robot moving in an environment, has a list of actions to perform
For example, move forward, jump, stop ect...After each action, it ends up in a new state. 
Some states can bring rewards (positive or negative) 
At each moment, the robot can only analyse its environment. 
From this, it has to learn what brings higher rewards and estimate the best short-term or long-term strategy to maximize its reward. 