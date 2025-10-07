import SymbolLibrary from '../SymbolLibrary'

export default function SymbolLibraryExample() {
  return (
    <div className="h-screen">
      <SymbolLibrary 
        onSymbolClick={(type) => console.log('Symbol clicked:', type)}
        isLineDrawingMode={false}
      />
    </div>
  )
}
