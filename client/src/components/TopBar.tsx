import { Button } from "@/components/ui/button";
import { FileDown, Trash2, Save, Upload } from "lucide-react";

interface TopBarProps {
  onExportPDF: () => void;
  onClearCanvas: () => void;
  onSaveDrawing: () => void;
  onLoadDrawing: () => void;
}

export default function TopBar({ onExportPDF, onClearCanvas, onSaveDrawing, onLoadDrawing }: TopBarProps) {
  return (
    <div className="h-14 bg-card border-b border-card-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold" data-testid="text-app-title">ABD Revisi Kilat</h1>
        <div className="h-4 w-px bg-border"></div>
        <p className="text-xs text-muted-foreground">Telecommunication Network Editor</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline"
          size="sm"
          onClick={onClearCanvas}
          className="gap-2"
          data-testid="button-clear-canvas"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={onSaveDrawing}
          className="gap-2"
          data-testid="button-save-drawing"
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={onLoadDrawing}
          className="gap-2"
          data-testid="button-load-drawing"
        >
          <Upload className="w-4 h-4" />
          Load
        </Button>
        
        <div className="h-6 w-px bg-border mx-1"></div>
        
        <Button 
          onClick={onExportPDF}
          className="gap-2"
          data-testid="button-export-pdf"
        >
          <FileDown className="w-4 h-4" />
          Export to PDF
        </Button>
      </div>
    </div>
  );
}
