import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <LoaderCircle className="mr-2 h-4 w-40 animate-spin" />
    </div>
  )
}

export default Loading
