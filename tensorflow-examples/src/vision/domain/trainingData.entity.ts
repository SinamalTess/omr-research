export interface TrainingData {
    loss: number;
    mse?: number;
    acc?: number;
    val_loss?: number;
    val_acc?: number;
    epoch: number;
}
