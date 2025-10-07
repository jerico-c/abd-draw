import { useState } from 'react'
import TitleBlockEditor from '../TitleBlockEditor'

export default function TitleBlockEditorExample() {
  const [namaGambar, setNamaGambar] = useState('PT2UI-25-TMG-FAR016-ANDI AULIA')
  const [daerahSTO, setDaerahSTO] = useState('SKEMA KABEL')

  return (
    <TitleBlockEditor 
      namaGambar={namaGambar}
      daerahSTO={daerahSTO}
      onNamaGambarChange={setNamaGambar}
      onDaerahSTOChange={setDaerahSTO}
    />
  )
}
