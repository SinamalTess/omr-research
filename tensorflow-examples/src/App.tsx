import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home } from "./vision/UI/views/Home";
import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Controls, Navbar } from "./vision/UI/components";
import { useData } from "./vision/UI/hooks";
import { TrainingData } from "./vision/types";
import { Car, Coordinates } from "./vision/domain";
import {
  getModel,
  getModelParams,
  ModelParams,
  startTraining,
} from "./vision/model/cars";
import { dataToCoordinates } from "./vision/adapters";
import { Datashape } from "./vision/UI/views/Datashape";
import { filterCarsData } from "./vision/adapters";
import { TrainingLogs } from "./vision/UI/views/TrainingLogs";
import { Test } from "./vision/UI/components/Test";

const URL = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";

type TrainingStatus = "waiting" | "training" | "done";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [originalData] = useData<Car[]>(URL, []);
  const data = filterCarsData(originalData);
  const [epochs, setEpochs] = useState(50);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<Coordinates[]>([]);
  const [model, setModel] = useState(getModel());
  const [modelParams, setModelParams] = useState<ModelParams>();
  const tensors = modelParams ? modelParams.tensors : null;
  const [activeTab, setActiveTab] = useState("1");
  const [trainingLogs, setTrainingLogs] = useState<number[]>([]);
  const [trainingStatus, setTrainingStatus] =
    useState<TrainingStatus>("waiting");
  const chartData = dataToCoordinates(data, "horsepower", "mpg");

  useEffect(() => {
    if (data.length) {
      const { modelParams } = getModelParams(data, epochs);
      setModelParams(modelParams);
    }
  }, [originalData, epochs]);

  const reset = () => {
    setCurrentEpoch(0);
    setModel(getModel());
    setDataTraining([]);
    setPredictions([]);
  };

  const handleEpochEnd = (trainingData: TrainingData) => {
    const { epoch } = trainingData;
    setDataTraining((prevState) => [...prevState, trainingData]);
    setCurrentEpoch(epoch);
  };

  const handleTrainingEnd = (predictions: Coordinates[], finalLoss: number) => {
    setTrainingLogs((prevState) => [...prevState, finalLoss]);
    setPredictions(predictions);
    setTrainingStatus("done");
  };

  const train = () => {
    if (modelParams) {
      reset();
      setTrainingStatus("training");
      startTraining(model, data, {
        modelParams,
        onEpochEnd: handleEpochEnd,
        onTrainingEnd: handleTrainingEnd,
      });
    }
  };

  const handleEpochsChanged = (newEpochsValue: number) => {
    reset();
    setEpochs(newEpochsValue);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const isTraining = trainingStatus === "training";

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar>
        <Test />
        <Typography variant="h4" component="h1" color={"primary"}>
          Horsepower vs MPG (miles per gallon)
        </Typography>
        <Controls
          epochs={epochs}
          currentEpoch={currentEpoch}
          isTraining={isTraining}
          onClick={train}
          onChangeEpochs={handleEpochsChanged}
          onEnterKeyDown={train}
        />
      </Navbar>
      <TabContext value={activeTab}>
        <Box>
          <TabList onChange={handleTabChange}>
            <Tab label="Home" value="1" />
            <Tab label="Data Shape" value="2" />
            <Tab label="Training Logs" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Home
            model={model}
            predictions={predictions}
            dataPreview={chartData}
            dataTraining={dataTraining}
          />
        </TabPanel>
        <TabPanel value="2">
          <Datashape
            url={URL}
            originalData={originalData}
            filteredData={data}
            tensors={tensors}
          />
        </TabPanel>
        <TabPanel value="3">
          <TrainingLogs trainingLogs={trainingLogs} />
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}

export default App;
