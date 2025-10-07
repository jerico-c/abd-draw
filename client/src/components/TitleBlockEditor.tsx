import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleBlockEditorProps {
  namaGambar: string;
  daerahSTO: string;
  onNamaGambarChange: (value: string) => void;
  onDaerahSTOChange: (value: string) => void;
}

export default function TitleBlockEditor({
  namaGambar,
  daerahSTO,
  onNamaGambarChange,
  onDaerahSTOChange
}: TitleBlockEditorProps) {
  return (
    <div className="h-24 bg-card border-t border-card-border px-6 py-3">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="flex flex-col">
          <Label htmlFor="nama-gambar" className="text-xs text-muted-foreground mb-1">
            Nama Gambar
          </Label>
          <Input
            id="nama-gambar"
            type="text"
            value={namaGambar}
            onChange={(e) => onNamaGambarChange(e.target.value)}
            placeholder="Enter drawing name"
            className="text-sm"
            data-testid="input-nama-gambar"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="daerah-sto" className="text-xs text-muted-foreground mb-1">
            Daerah STO
          </Label>
          <Input
            id="daerah-sto"
            type="text"
            value={daerahSTO}
            onChange={(e) => onDaerahSTOChange(e.target.value)}
            placeholder="Enter STO region"
            className="text-sm"
            data-testid="input-daerah-sto"
          />
        </div>
      </div>
    </div>
  );
}
