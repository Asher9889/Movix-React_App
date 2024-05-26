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
    <div class='switchTab'>
      <div class="switchItems">
        {data.map((e,index)=>(
            <p key={e} class={selectedItem === index ? "active" : ""} onClick={()=> activeItem(e,index)}>{e}</p>

        ))}
        <span class="gradientBg" style={{ left: move + 'px' }}></span>
      </div>
      
    </div>
  )
}

export default SwitchTab
