import React, {useState} from 'react'
import "./style.scss"



const SwitchTab = ({data, setEndPoint}) => {

    const [selectedItem, setSelectedItem] = useState(0)
    const [move, setMove] = useState(0)


    const activeItem = (e, index)=>{
        setMove(index * 100)
        setSelectedItem(index)
        setEndPoint(e.toLowerCase())
    }


    
  return (
    <div className='switchTab'>
      <div className="switchItems">
        {data.map((e,index)=>(
            <p key={e} className={selectedItem === index ? "active" : ""} onClick={()=> activeItem(e,index)}>{e}</p>

        ))}
        <span className="gradientBg" style={{ left: move + 'px' }}></span>
      </div>
      
    </div>
  )
}

export default SwitchTab
