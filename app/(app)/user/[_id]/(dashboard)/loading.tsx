import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <LoaderCircle className="h-40 w-40 animate-spin" />
    </div>
  )
}

export default Loading
