export interface TrainingData {
  epoch: number;
  loss: number;
  mse?: number;
  acc?: number;
  val_loss?: number;
  val_acc?: number;
}
