import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ReactCardFlip from 'react-card-flip';
import dataSource from '../data/main'
import Box from "@material-ui/core/Box";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
}))

export default function Quiz(props: any) {
  const classes = useStyles()
  const history = useHistory();
  const [seen, setSeen] = React.useState(false);
const [value, setValue] = React.useState('')
const [score, setScore] = React.useState(0)
  const [index, setIndex] = React.useState(0)
  const [data, setData] = React.useState(dataSource);
  const [isFlipped, setIsFlipped] = React.useState(false);
  
	const handleRadioChange = (event: any) => {
		setValue(event.target.value)
	}
	console.log({score});
	
  
  const handleClick = (e:any) => {
    e.preventDefault();
    setIsFlipped((prev) => !prev);
    setSeen(true);
  }

	const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsFlipped(false);
    setValue('');
    setSeen(false);
    

		if (value + '' === data.answers[index] + '') {
			setScore((score) => score + 1)
			props.handler({ score: score + 1 })
		}

		if (index === data.image.length - 1) {
			props.handler({ name: '' });
			history.push("/page/landing");
		}
		setIndex((index) => index + 1)
	}

  return (
	  <>
		<Paper
			elevation={0}
			  style={{ padding: '8px', width: '100%' }}
			  key={index}
    >
      <p>Question: {index + 1}/ {data.image.length} </p>
			<form onSubmit={handleSubmit} style={{}}>
				<FormControl component='fieldset' className={classes.formControl}>
					<FormLabel
						component='legend'
						style={{ color: 'black', fontSize: '16pt' }}
					>
            <Box
                display="flex"
                flexDirection="column"
 				 justifyContent="center"
 				 alignItems="center"
				minHeight="30vh"
			  key={index}
            >
              { !isFlipped ? <img onClick={handleClick} src={data.image[index]} alt="" /> :  <p onClick={handleClick}>
                Answer: { data.answers[index] }
              </p>}
    
            </Box>        
					</FormLabel>
					<RadioGroup
						aria-label='quiz'
						name='quiz'
						value={value}
						onChange={handleRadioChange}
						style={{ marginTop: '15px' }}
					>
						{data.choices[index].map((el: any, j) => {
							return (
								<FormControlLabel
									value={el}
									control={<Radio disabled={seen} />}
									label={el}
                  style={{ marginTop: '8px' }}
                  key={j}
								/>
							)
						})}
					</RadioGroup>

					<Button
						type='submit'
						variant='outlined'
						color='primary'
						className={classes.button}
					>
						next
					</Button>
				</FormControl>
			</form>
      </Paper>
      </>
	)
}