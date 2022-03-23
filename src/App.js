import {Container} from '@mui/material'
import { makeStyles } from '@mui/styles';
import Fund from './features/Fund'

const useStyles = makeStyles({
  App: {
    backgroundColor: '#efefef',
    margin: 0,
    padding: 0
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
        <Fund/>
      </Container>
    </div>
  );
}

export default App;
