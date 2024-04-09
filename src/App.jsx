import { CssBaseline } from '@mui/material';
import { lime, purple } from '@mui/material/colors';
import TaskApp from './components/TaskApp';
import { 
  ThemeProvider, 
  createTheme,
} from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: lime,
    secondary: purple
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TaskApp />
    </ThemeProvider>
  );
}

export default App;
