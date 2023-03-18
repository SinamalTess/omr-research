import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Home } from "./vision/UI/views/Home";
import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Controls, Navbar } from "./vision/UI/components";
import { EvaluationData, AxesKeys } from "./vision/types";
import { ModelParams } from "./vision/model/cars";
import { Datashape } from "./vision/UI/views/Datashape";
import { TrainingLogs } from "./vision/UI/views/TrainingLogs";
import { Mnist } from "./vision/UI/components/ModelControllers/Mnist";
import { Cars } from "./vision/UI/components/ModelControllers";
import { Coordinates, TrainingData } from "./vision/domain";
import { Sequential } from "@tensorflow/tfjs";

export type TrainingStatus = "waiting" | "training" | "done";

const DEFAULT_EVALUATION_DATA: EvaluationData = [[], []];

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [originalData, setOriginalData] = useState<unknown[]>([]);
  const [data, setData] = useState<unknown[]>([]);
  const [epochs, setEpochs] = useState(50);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [dataTraining, setDataTraining] = useState<TrainingData[]>([]);
  const [chartData, setChartData] = useState<Coordinates[]>([]);
  const [evaluationData, setEvaluationData] = useState<EvaluationData>(
    DEFAULT_EVALUATION_DATA
  );
  const [model, setModel] = useState<null | Sequential>(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [modelParams, setModelParams] = useState<ModelParams>();
  const tensors = modelParams ? modelParams.tensors : null;
  const [activeTab, setActiveTab] = useState("1");
  const [trainingLogs, setTrainingLogs] = useState<number[]>([]);
  const [axesKeys, setAxesKeys] = useState<AxesKeys | []>([]);
  const [trainingStatus, setTrainingStatus] =
    useState<TrainingStatus>("waiting");

  const reset = () => {
    setTrainingStatus("waiting");
    setCurrentEpoch(0);
    setModel(null);
    setDataTraining([]);
    setEvaluationData([[], []]);
  };

  const handleEpochEnd = (trainingData: TrainingData) => {
    const { epoch } = trainingData;
    setDataTraining((prevState) => [...prevState, trainingData]);
    setCurrentEpoch(epoch);
  };

  const handleTrainingEnd = (
    evaluationData: EvaluationData,
    finalLoss: number
  ) => {
    setTrainingLogs((prevState) => [...prevState, finalLoss]);
    setEvaluationData(evaluationData);
    setTrainingStatus("done");
  };

  const train = () => {
    reset();
    setTrainingStatus("training");
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
      <Mnist
        epochs={epochs}
        onEpochEnd={handleEpochEnd}
        onTrainingEnd={handleTrainingEnd}
        onOriginalDataChange={setOriginalData}
        onDataChange={setData}
        onDataUrlChange={setUrl}
        onModelChange={setModel}
        onAxesKeysChange={setAxesKeys}
        onChartDataChange={setChartData}
        onModelParamsChange={setModelParams}
        onTitleChange={setTitle}
        trainingStatus={trainingStatus}
      />
      <Navbar>
        <Typography variant="h4" component="h1" color={"primary"}>
          {title}
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
            axesKeys={axesKeys}
            evaluationData={evaluationData}
            dataPreview={chartData}
            dataTraining={dataTraining}
          />
        </TabPanel>
        <TabPanel value="2">
          <Datashape
            url={url}
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
