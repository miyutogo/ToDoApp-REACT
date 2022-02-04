import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


const List = ({items, removeItem, editItem}) =>{
	return (
	<Container className='toDoList'>
		{items.map((item)=>{
			const {id,title} = item
			return (
			<article key={id} className='toDoItem'>
				<Container className='btnContainer'>
					<p className='title'>{title}</p>
					<Button  className='deleteBtn' onClick={()=>removeItem(id)}>Done</Button>
					<Button className='editBtn' onClick={()=>editItem(id)}>Edit</Button>
				</Container>
			</article>
			)
		})}
	</Container>
	)
}

export default List