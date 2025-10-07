import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

interface PropertiesPanelProps {
  selectedObject: any | null;
  onNameChange: (name: string) => void;
}

export default function PropertiesPanel({ selectedObject, onNameChange }: PropertiesPanelProps) {
  return (
    <div className="w-64 bg-card border-l border-card-border h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-4" data-testid="text-properties-title">Properties</h2>
        
        {!selectedObject ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Layers className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground" data-testid="text-no-object-selected">No Object Selected</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Object Type</Label>
              <Badge variant="secondary" className="text-sm" data-testid="badge-object-type">
                {selectedObject.customType || 'Unknown'}
              </Badge>
            </div>
            
            <div>
              <Label htmlFor="object-name" className="text-xs text-muted-foreground mb-2 block">Name</Label>
              <Input
                id="object-name"
                type="text"
                value={selectedObject.customName || ''}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter object name"
                className="text-sm"
                data-testid="input-object-name"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
