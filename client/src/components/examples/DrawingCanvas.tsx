import { useState } from 'react'
import DrawingCanvas from '../DrawingCanvas'

export default function DrawingCanvasExample() {
  const [selected, setSelected] = useState(null)
  
  return (
    <div className="h-screen w-full">
      <DrawingCanvas 
        onObjectSelected={(obj) => {
          setSelected(obj as any)
          console.log('Object selected:', obj)
        }}
        selectedSymbol={null}
        isLineDrawingMode={false}
        onLineDrawingComplete={() => console.log('Line drawing complete')}
      />
    </div>
  )
}
