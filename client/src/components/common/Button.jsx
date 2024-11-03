import React from 'react'
import { Button } from 'flowbite-react'

const CustomeButton = ({ title, handleClick, disable }) => {
    return (
        <Button gradientDuoTone='purpleToBlue' onClick={handleClick} outline disabled={disable || false}>
            {title}
        </Button>
    )
}

export default CustomeButton