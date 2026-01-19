import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Settings, Eye } from 'lucide-react';

interface SimplePDFExporterProps {
  targetElementId: string;
  filename?: string;
  title?: string;
}

export const SimplePDFExporter: React.FC<SimplePDFExporterProps> = ({
  targetElementId,
  filename = 'export',
  title = 'Export PDF'
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [scale, setScale] = useState(2.5);
  const [quality, setQuality] = useState(0.95);
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'legal'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const exportPDF = async (preview = false) => {
    const element = document.getElementById(targetElementId);
    
    if (!element) {
      alert(`Cannot find element with ID: ${targetElementId}`);
      return;
    }

    setIsGenerating(true);
    setShowSettings(false);

    try {
      // Scroll to element and wait for render
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
      await new Promise(resolve => setTimeout(resolve, 1200));
      await document.fonts.ready;

      console.log('Generating PDF from element:', targetElementId);
      console.log('Element dimensions:', {
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight
      });

      // Create high-quality canvas from element with better settings
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        imageTimeout: 0,
        removeContainer: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById(targetElementId);
          if (clonedEl) {
            // Remove print-hidden elements and no-print class
            clonedEl.querySelectorAll('.print\\:hidden, .no-print, [class*="print:hidden"]').forEach(el => el.remove());
            
            // Force all colors and backgrounds to render
            clonedEl.style.colorAdjust = 'exact';
            clonedEl.style.webkitPrintColorAdjust = 'exact';
            
            // Ensure gradients and backgrounds are visible
            const allElements = clonedEl.querySelectorAll('*');
            allElements.forEach((el: any) => {
              if (el.style) {
                el.style.colorAdjust = 'exact';
                el.style.webkitPrintColorAdjust = 'exact';
              }
            });
          }
        }
      });

      console.log('Canvas created:', {
        width: canvas.width,
        height: canvas.height
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas has zero dimensions');
      }

      // Convert canvas to image with high-quality JPEG
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      if (!imgData || imgData === 'data:,' || imgData.length < 100) {
        throw new Error('Failed to generate image from canvas');
      }

      console.log('Image data length:', imgData.length);
      
      // Create PDF with proper page size
      const pageSizes = {
        a4: [210, 297],
        letter: [215.9, 279.4],
        legal: [215.9, 355.6]
      };
      
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: pageSize
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 10; // 5mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 5; // 5mm top margin

      // Add first page
      pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 10); // Account for top and bottom margins

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 5;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);
        heightLeft -= (pdfHeight - 10);
      }

      console.log('PDF generated successfully');

      if (preview) {
        // Open PDF in new tab
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } else {
        // Download PDF
        pdf.save(`${filename}.pdf`);
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={() => exportPDF(false)}
        disabled={isGenerating}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            {title}
          </>
        )}
      </button>

      {!isGenerating && (
        <>
          <button
            onClick={() => exportPDF(true)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors print:hidden"
            title="Preview PDF"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowSettings(s => !s)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors print:hidden"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </>
      )}

      {showSettings && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowSettings(false)} />
          <div className="absolute z-50 right-0 top-12 bg-white border rounded-lg shadow-xl p-5 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">PDF Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1">Page Size</label>
                  <select value={pageSize} onChange={e => setPageSize(e.target.value as any)} className="w-full p-2 border rounded text-sm">
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Orientation</label>
                  <select value={orientation} onChange={e => setOrientation(e.target.value as any)} className="w-full p-2 border rounded text-sm">
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Quality: {scale.toFixed(1)}x</label>
                <input type="range" min={1} max={3} step={0.1} value={scale} onChange={e => setScale(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Fast</span>
                  <span>Best</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Compression: {(quality * 100).toFixed(0)}%</label>
                <input type="range" min={0.6} max={1} step={0.05} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full" />
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <button onClick={() => exportPDF(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  <Eye className="w-4 h-4" />Preview
                </button>
                <button onClick={() => exportPDF(false)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  <Download className="w-4 h-4" />Export
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
