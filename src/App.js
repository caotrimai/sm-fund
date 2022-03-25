import {Container} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Donate from './features/Donate'

const useStyles = makeStyles({
  App: {
    backgroundColor: '#efefef',
    margin: 0,
    padding: 0
  },
  body: {
    minHeight: '100%',
  }
})

function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.App}>
      <Container className={classes.body}>
        <Donate/>
      </Container>
    </div>
  );
}

export default App;
