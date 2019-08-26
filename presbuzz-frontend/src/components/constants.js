import { createMuiTheme } from "@material-ui/core/styles";

const constants = {
  BASE_URL: "http://127.0.0.1:8000/",
  TERM_PATH: "api/sentiments/?term=",
  theme: createMuiTheme({
    palette: {
      primary: { main: "#001b4d" }
    }
  })
};

export default constants;
