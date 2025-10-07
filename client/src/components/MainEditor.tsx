import { useState, useRef } from "react";
import SymbolLibrary, { type SymbolType } from "./SymbolLibrary";
import DrawingCanvas from "./DrawingCanvas";
import PropertiesPanel from "./PropertiesPanel";
import TitleBlockEditor from "./TitleBlockEditor";
import TopBar from "./TopBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

export default function MainEditor() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolType | null>(null);
  const [isLineDrawingMode, setIsLineDrawingMode] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any | null>(null);
  const [namaGambar, setNamaGambar] = useState("");
  const [daerahSTO, setDaerahSTO] = useState("");
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<any>(null);
  const { toast } = useToast();

  const getCanvas = () => {
    return fabricCanvasRef.current;
  };

  const handleSymbolClick = (symbolType: SymbolType) => {
    if (symbolType === "Cable") {
      setIsLineDrawingMode(!isLineDrawingMode);
      setSelectedSymbol(null);
    } else {
      setSelectedSymbol(symbolType);
      setIsLineDrawingMode(false);
      setTimeout(() => setSelectedSymbol(null), 100);
    }
  };

  const handleObjectSelected = (object: any) => {
    setSelectedObject(object);
  };

  const handleNameChange = (name: string) => {
    if (selectedObject) {
      selectedObject.set({ customName: name });
      setSelectedObject({ ...selectedObject, customName: name });
    }
  };

  const handleClearCanvas = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    if (confirm('Are you sure you want to clear the entire canvas? This action cannot be undone.')) {
      canvas.clear();
      canvas.backgroundColor = '#FFFFFF';
      canvas.renderAll();
      setSelectedObject(null);
      toast({
        title: "Canvas Cleared",
        description: "All objects have been removed from the canvas.",
      });
    }
  };

  const handleSaveDrawing = () => {
    const canvas = getCanvas();
    if (!canvas) return;

    const json = canvas.toJSON(['customType', 'customName']);
    const dataStr = JSON.stringify({
      canvas: json,
      namaGambar,
      daerahSTO
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ABD-drawing-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Drawing Saved",
      description: "Your drawing has been saved as a JSON file.",
    });
  };

  const handleLoadDrawing = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        const canvas = getCanvas();
        if (!canvas) return;

        canvas.loadFromJSON(data.canvas, () => {
          canvas.renderAll();
          setNamaGambar(data.namaGambar || '');
          setDaerahSTO(data.daerahSTO || '');
          toast({
            title: "Drawing Loaded",
            description: "Your drawing has been loaded successfully.",
          });
        });
      } catch (error) {
        console.error('Error loading drawing:', error);
        toast({
          title: "Load Failed",
          description: "There was an error loading the drawing file.",
          variant: "destructive",
        });
      }
    };

    input.click();
  };

  const handleExportPDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your PDF document.",
      });

      const canvasElement = canvasContainerRef.current;
      if (!canvasElement) return;

      const canvas = await html2canvas(canvasElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 90;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, Math.min(imgHeight, pdfHeight - 20));
      
      const titleBlockX = pdfWidth - 75;
      const titleBlockY = pdfHeight - 45;
      const titleBlockWidth = 65;
      const titleBlockHeight = 35;
      
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(titleBlockX, titleBlockY, titleBlockWidth, titleBlockHeight);
      
      pdf.setFillColor(240, 240, 240);
      pdf.rect(titleBlockX, titleBlockY, titleBlockWidth, 8, 'F');
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AS BUILT DRAWING', titleBlockX + titleBlockWidth / 2, titleBlockY + 5.5, { align: 'center' });
      
      pdf.setLineWidth(0.3);
      pdf.line(titleBlockX, titleBlockY + 8, titleBlockX + titleBlockWidth, titleBlockY + 8);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text('Nama Gambar:', titleBlockX + 2, titleBlockY + 14);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      const namaText = namaGambar || '-';
      pdf.text(namaText.length > 35 ? namaText.substring(0, 35) + '...' : namaText, titleBlockX + 2, titleBlockY + 19);
      
      pdf.line(titleBlockX, titleBlockY + 22, titleBlockX + titleBlockWidth, titleBlockY + 22);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text('Daerah STO:', titleBlockX + 2, titleBlockY + 28);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      const daerahText = daerahSTO || '-';
      pdf.text(daerahText.length > 35 ? daerahText.substring(0, 35) + '...' : daerahText, titleBlockX + 2, titleBlockY + 33);
      
      pdf.save(`ABD-drawing-${Date.now()}.pdf`);

      toast({
        title: "PDF Exported Successfully!",
        description: "Your drawing has been saved as a PDF file.",
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <TopBar 
        onExportPDF={handleExportPDF}
        onClearCanvas={handleClearCanvas}
        onSaveDrawing={handleSaveDrawing}
        onLoadDrawing={handleLoadDrawing}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <SymbolLibrary 
          onSymbolClick={handleSymbolClick}
          isLineDrawingMode={isLineDrawingMode}
        />
        
        <div className="flex flex-col flex-1">
          <div ref={canvasContainerRef} className="flex-1">
            <DrawingCanvas
              onObjectSelected={handleObjectSelected}
              selectedSymbol={selectedSymbol}
              isLineDrawingMode={isLineDrawingMode}
              onLineDrawingComplete={() => setIsLineDrawingMode(false)}
              onCanvasReady={(canvas) => { fabricCanvasRef.current = canvas; }}
            />
          </div>
          
          <TitleBlockEditor
            namaGambar={namaGambar}
            daerahSTO={daerahSTO}
            onNamaGambarChange={setNamaGambar}
            onDaerahSTOChange={setDaerahSTO}
          />
        </div>
        
        <PropertiesPanel
          selectedObject={selectedObject}
          onNameChange={handleNameChange}
        />
      </div>
    </div>
  );
}
