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
					xs={11}
				>  
					<Grid xs={2} lg={2}	>
						<img src={done} className={classes.button} onClick={()=>removeItem(id)}/>
					</Grid>
					<Grid  xs={8} lg={8}	>
						<p style={{'overflowWrap': 'break-word'}} >{title}</p>
					</Grid>
					<Grid/>
					<Grid  
						container
						justifyContent="flex-end"
						lg={2}	
						xs={2}
					>
						<img src={edit} className={classes.button} onClick={()=>editItem(id)}/>
					</Grid>
				</Grid>
			</article>
			)
		})}
	</Container>

	)
}

export default List