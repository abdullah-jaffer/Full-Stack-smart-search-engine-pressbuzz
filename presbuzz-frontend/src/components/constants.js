import { createMuiTheme } from '@material-ui/core/styles';

const constants = {
    BASE_URL:'http://127.0.0.1:8000/',
    TERM_PATH:'api/sentiments/?term=',
    theme:createMuiTheme({
        palette: {
          primary: { main: '#ef6c00'}
        },
      })
}

export default constants;