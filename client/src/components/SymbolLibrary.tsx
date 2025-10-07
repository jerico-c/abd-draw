import { Button } from "@/components/ui/button";
import { Cable } from "lucide-react";

export type SymbolType = 
  | "ODC"
  | "ODP Wall"
  | "ODP Tiang"
  | "ODP Pedestal"
  | "Tiang Eksisting"
  | "Tiang Baru"
  | "MSAN / MDU"
  | "Closure Penuh"
  | "Closure Suntik"
  | "Manhole"
  | "Grounding"
  | "Cable";

interface SymbolLibraryProps {
  onSymbolClick: (symbolType: SymbolType) => void;
  isLineDrawingMode: boolean;
}

export default function SymbolLibrary({ onSymbolClick, isLineDrawingMode }: SymbolLibraryProps) {
  const symbols: { type: SymbolType; svg: string; label: string }[] = [
    {
      type: "ODC",
      label: "ODC",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 6 L26 26 L6 26 Z" fill="none" stroke="red" stroke-width="2"/><path d="M16 12 L22 22 L10 22 Z M12 18 L20 18 M14 14 L18 14" stroke="red" stroke-width="1"/></svg>`
    },
    {
      type: "ODP Wall",
      label: "ODP Wall",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 26 L6 6 L26 6 Z" fill="red"/></svg>`
    },
    {
      type: "ODP Tiang",
      label: "ODP Tiang",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 6 L26 26 L6 26 Z" fill="red"/></svg>`
    },
    {
      type: "ODP Pedestal",
      label: "ODP Pedestal",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 26 L6 6 L26 6 Z" fill="red"/><line x1="6" y1="6" x2="26" y2="6" stroke="red" stroke-width="2"/></svg>`
    },
    {
      type: "Tiang Eksisting",
      label: "Tiang Eksisting",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="white" stroke="black" stroke-width="2"/></svg>`
    },
    {
      type: "Tiang Baru",
      label: "Tiang Baru",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="red"/></svg>`
    },
    {
      type: "MSAN / MDU",
      label: "MSAN / MDU",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><rect x="8" y="12" width="16" height="12" fill="red"/><rect x="10" y="14" width="4" height="3" fill="white"/><rect x="18" y="14" width="4" height="3" fill="white"/></svg>`
    },
    {
      type: "Closure Penuh",
      label: "Closure Penuh",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="none" stroke="red" stroke-width="2"/><line x1="8" y1="16" x2="24" y2="16" stroke="red" stroke-width="2"/></svg>`
    },
    {
      type: "Closure Suntik",
      label: "Closure Suntik",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="8" fill="none" stroke="red" stroke-width="2"/><line x1="10" y1="10" x2="22" y2="22" stroke="red" stroke-width="2"/></svg>`
    },
    {
      type: "Manhole",
      label: "Manhole",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><rect x="8" y="12" width="16" height="8" fill="none" stroke="red" stroke-width="2"/></svg>`
    },
    {
      type: "Grounding",
      label: "Grounding",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32"><line x1="16" y1="8" x2="16" y2="18" stroke="red" stroke-width="2"/><line x1="12" y1="18" x2="20" y2="18" stroke="red" stroke-width="2"/><line x1="13" y1="21" x2="19" y2="21" stroke="red" stroke-width="2"/><line x1="14" y1="24" x2="18" y2="24" stroke="red" stroke-width="2"/></svg>`
    }
  ];

  return (
    <div className="w-52 bg-card border-r border-card-border h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-4" data-testid="text-symbol-library-title">Symbol Library</h2>
        <div className="grid grid-cols-2 gap-2">
          {symbols.map((symbol) => (
            <Button
              key={symbol.type}
              variant="outline"
              size="sm"
              className="flex flex-col items-center justify-center h-20 p-2 hover-elevate active-elevate-2"
              onClick={() => onSymbolClick(symbol.type)}
              data-testid={`button-symbol-${symbol.type.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div 
                className="mb-1"
                dangerouslySetInnerHTML={{ __html: symbol.svg }}
              />
              <span className="text-xs text-center truncate w-full">{symbol.label}</span>
            </Button>
          ))}
          <Button
            variant={isLineDrawingMode ? "default" : "outline"}
            size="sm"
            className="flex flex-col items-center justify-center h-20 p-2 col-span-2 hover-elevate active-elevate-2"
            onClick={() => onSymbolClick("Cable")}
            data-testid="button-symbol-cable"
          >
            <Cable className="w-6 h-6 mb-1" />
            <span className="text-xs">Add Cable</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
