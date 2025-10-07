import { useState } from 'react'
import PropertiesPanel from '../PropertiesPanel'

export default function PropertiesPanelExample() {
  const [mockObject, setMockObject] = useState({
    customType: 'ODP Tiang',
    customName: 'ODP-001'
  })

  return (
    <div className="h-screen">
      <PropertiesPanel 
        selectedObject={mockObject}
        onNameChange={(name) => {
          setMockObject({ ...mockObject, customName: name })
          console.log('Name changed to:', name)
        }}
      />
    </div>
  )
}
