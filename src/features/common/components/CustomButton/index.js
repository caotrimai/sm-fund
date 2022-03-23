import {Button} from '@mui/material'
import {makeStyles} from '@mui/styles'

const useStyles =  makeStyles({
  customButton: {
    marginRight: '8px'
  }
})

export default function CustomButton (props) {
  const classes = useStyles()
  return (
    <span className={classes.customButton}>
      <Button size='small' variant='contained' {...props}/>
    </span>
  )
}