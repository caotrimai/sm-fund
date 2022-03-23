import {Container} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Home from './features/home'

const useStyles = makeStyles({
  App: {
    backgroundColor: '#efefef'
  },
  body: {
    backgroundColor: '#fff'
  }
})

function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.App}>
      <Container className={classes.body}>
        <Home/>
      </Container>
    </div>
  );
}

export default App;
