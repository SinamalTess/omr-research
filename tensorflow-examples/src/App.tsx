import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home } from "./vision/cars/views/Home";
import { Box, styled, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Navbar } from "./vision/cars/components/Navbar";
import { Controls } from "./vision/cars/components";
import { useData } from "./vision/cars/http";
import { TrainingData } from "./vision/types";
import { Coordinates } from "./vision/cars/domain";
import { getModel, startTraining } from "./vision/cars/model";
import { dataToCoordinates } from "./vision/cars/adapters";
import { Datashape } from "./vision/cars/views/Datashape/Datashape";

type TrainingStatus = "waiting" | "training" | "done";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [data] = useData();
  const [epochs, setEpochs] = useState(50);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [predictions, setPredictions] = useState<Coordinates[]>([]);
  const [model, setModel] = useState(getModel());
  const [activeTab, setActiveTab] = useState("1");
  const [trainingStatus, setTrainingStatus] =
    useState<TrainingStatus>("waiting");
  const chartData = dataToCoordinates(data);

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

  const handleTrainingEnd = (predictions: Coordinates[]) => {
    setPredictions(predictions);
    setTrainingStatus("done");
  };

  const train = () => {
    reset();
    setTrainingStatus("training");
    startTraining(model, data, {
      epochs,
      onEpochEnd: handleEpochEnd,
      onTrainingEnd: handleTrainingEnd,
    });
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
          <Datashape />
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}

export default App;
