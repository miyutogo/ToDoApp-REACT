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
				<p className='title'>{title}</p>
				<div className='btnContainer'>
					<Button  className='deleteBtn' onClick={()=>removeItem(id)}>dlt</Button>
					<Button className='editBtn' onClick={()=>editItem(id)}>edt</Button>
				</div>
			</article>
			)
		})}
	</Container>
	)
}

export default List