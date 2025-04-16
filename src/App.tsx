import VehicleForm from "./components/VehicleForm";
import { useContext } from "react";
import { AppContext } from "./context/App.context";
import { Box, Paper } from "@mui/material";
import ResponseIMage from "./components/ResponseIMage";

import "./App.css";

function App() {
  const { step, setStep, setImageUrl } = useContext(AppContext);

  const goBack = () => {
    setStep(0);
    setImageUrl("");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}>
        {step === 0 && <VehicleForm />}
        {step === 1 && <ResponseIMage onClick={goBack} />}
      </Box>

      <p className="read-the-docs">Vehicle Publisher</p>
    </>
  );
}

export default App;
