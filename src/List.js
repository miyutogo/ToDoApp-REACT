import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import edit from './assets/edit.png'
import done from './assets/done.png'
import {makeStyles, styled}  from '@mui/styles';

const useStyles = makeStyles({
	button: {
	  background: 'white',
	  height: 20,
	},
  });

const Item = styled(Paper)(({ theme }) => ({
...theme.typography.body2,
padding: theme.spacing(1),
textAlign: 'center',
color: theme.palette.text.secondary,
}));

const List = ({items, removeItem, editItem}) =>{
	const classes = useStyles();
	return (

	<Container className='toDoList'>
		{items.map((item)=>{
			const {id,title} = item
			return (
			<article key={id} className='toDoItem'>
				<Grid
					container
					spacing={0}
					direction="row"
					alignItems="center"		
				>  
					<Grid xs={3}>
						<Button  className='deleteBtn' onClick={()=>removeItem(id)}><img src={done} className={classes.button}/></Button> 
					</Grid>
					<Grid  xs={7}>
						<p className='title'>{title}</p>
					</Grid>
					<Grid  xs={2}>
						<Button  onClick={()=>editItem(id)}><img src={edit} className={classes.button}/></Button>
					</Grid>
				</Grid>
			</article>
			)
		})}
	</Container>

	)
}

export default List