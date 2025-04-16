import { Alert, Box, Button, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/App.context";
import axios from "axios";
import InputArea from "./InputArea";

const VehicleForm = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({
    description: false,
    price: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [postError, setPostError] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<string>("");
  const { setImageUrl, setStep } = useContext(AppContext);

  useEffect(() => {
    return () => {
      setPrice("");
      setDescription("");
    };
  }, []);

  const validate = () => {
    const newErrors = {
      description: description.trim() === "" || description.length < 25,
      price: price.trim() === "" || Number(price) <= 50000,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("price", price);
      const response = await axios.post(
        "http://localhost:3000/vehicle",
        formData,
        {
          responseType: "blob",
        }
      );

      const imgURL = URL.createObjectURL(response.data);
      setImageUrl(imgURL);
      setStep(1);
    } catch (err) {
      setErrorData((err as string) ?? "Threre's been an error ,try later.");
      setPostError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    val: string,
    label: string,
    setFunction: (value: React.SetStateAction<string>) => void
  ) => {
    const field = label.toLowerCase();

    if (field === "price" && Number(val) < 0) return;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
    setFunction(val);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "3vh 3vw",
        width: "auto",
        minHeight: "30vh",
      }}>
      {postError && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="error">
          Error In the Server Try Later
        </Alert>
      )}
      <Box
        sx={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
        <InputArea
          error={errors.description}
          label="Description"
          type="text"
          multiline={true}
          rows={4}
          value={description}
          onChange={(val) => {
            handleChange(val, "Description", setDescription);
          }}
          errorMsg="Description is required.Must be at least 25 characters."
        />

        <InputArea
          error={errors.price}
          label="Price"
          type="number"
          value={price}
          onChange={(val) => {
            handleChange(val, "Price", setPrice);
          }}
          placeholder="Price must be at least 50000"
          errorMsg="Price must be at least 50000"
        />

        <Button
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          color={errors.description || errors.price ? "error" : "primary"}
          disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Box>
    </Paper>
  );
};

export default VehicleForm;
