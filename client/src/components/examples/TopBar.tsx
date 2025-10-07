import TopBar from '../TopBar'

export default function TopBarExample() {
  return (
    <TopBar 
      onExportPDF={() => console.log('Export PDF clicked')}
      onClearCanvas={() => console.log('Clear canvas clicked')}
      onSaveDrawing={() => console.log('Save drawing clicked')}
      onLoadDrawing={() => console.log('Load drawing clicked')}
    />
  )
}
