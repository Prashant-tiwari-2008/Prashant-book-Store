import React from 'react'
import { Button } from 'flowbite-react'

const CustomeButton = ({ title }) => {
    return (
        <Button gradientDuoTone='purpleToBlue' outline>
            {title}
        </Button>
    )
}

export default CustomeButton