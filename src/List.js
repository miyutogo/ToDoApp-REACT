import react from 'react';


const List = ({items, removeItem, editItem}) =>{
	return (
	<div className='toDoList'>
		{items.map((item)=>{
			const {id,title} = item
			return (
			<article key={id} className='toDoItem'>
				<p className='title'>{title}</p>
				<div className='btnContainer'>
					<button  className='deleteBtn' onClick={()=>removeItem(id)}>dlt</button>
					<button className='editBtn' onClick={()=>editItem(id)}>edt</button>
				</div>
			</article>
			)
		})}
	</div>
	)
}

export default List