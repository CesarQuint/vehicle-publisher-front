import { Paper, Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useContext } from "react";
import { AppContext } from "../context/App.context";

const ResponseIMage = ({ onClick }: { onClick: () => void }) => {
  const { imageUrl } = useContext(AppContext);
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "3vh 3vw",
        width: "auto",
        minHeight: "30vh",
      }}>
      <Box
        textAlign={"left"}
        sx={{
          padding: "1rem",
        }}>
        <span onClick={onClick}>
          <KeyboardBackspaceIcon
            sx={{
              ":hover": { cursor: "pointer" },
            }}
          />
        </span>
      </Box>
      <Box
        component="img"
        src={imageUrl}
        alt="Generated Vehicle Image"
        sx={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      />
    </Paper>
  );
};

export default ResponseIMage;
