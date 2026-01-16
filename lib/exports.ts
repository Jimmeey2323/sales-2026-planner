import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableCell, TableRow, WidthType } from 'docx';
import { MonthData } from '../types';

// Generate PDF Export - Light Report Style (jsPDF native)
export async function exportToPDF(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Light theme palette
  const colors = {
    ink: [20, 23, 28] as const,
    muted: [92, 99, 110] as const,
    rule: [215, 220, 228] as const,
    softRule: [235, 238, 243] as const,
    accent: [150, 116, 58] as const, // warm gold-brown
    accentSoft: [247, 242, 233] as const,
  };

  const setTextColor = (c: readonly [number, number, number]) => pdf.setTextColor(c[0], c[1], c[2]);
  const setDrawColor = (c: readonly [number, number, number]) => pdf.setDrawColor(c[0], c[1], c[2]);
  const setFillColor = (c: readonly [number, number, number]) => pdf.setFillColor(c[0], c[1], c[2]);

  const line = (y: number, soft: boolean = false) => {
    setDrawColor(soft ? colors.softRule : colors.rule);
    pdf.setLineWidth(0.35);
    pdf.line(margin, y, pageWidth - margin, y);
  };

  const toNumberUnits = (v: unknown): number => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    if (typeof v === 'string') {
      const n = parseInt(v.replace(/[^0-9-]/g, ''), 10);
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  };

  const formatINRCompact = (value: number): string => {
    const abs = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    const fmt = (n: number) => {
      const rounded = Math.round(n * 10) / 10;
      return rounded % 1 === 0 ? String(Math.round(rounded)) : String(rounded);
    };

    if (abs >= 1e7) return `${sign}₹${fmt(abs / 1e7)} Cr`;
    if (abs >= 1e5) return `${sign}₹${fmt(abs / 1e5)} L`;
    if (abs >= 1e3) return `${sign}₹${fmt(abs / 1e3)} K`;
    return `${sign}₹${Math.round(abs).toLocaleString('en-IN')}`;
  };

  const parseINRCompact = (input?: string): number | null => {
    if (!input) return null;
    const raw = input.replace(/,/g, '').trim();

    const m = raw.match(/(-?[0-9]*\.?[0-9]+)\s*(cr|crore|l|lac|lakh|k|thousand)?/i);
    if (!m) return null;

    const num = parseFloat(m[1]);
    if (!Number.isFinite(num)) return null;

    const unit = (m[2] || '').toLowerCase();
    const mult = unit === 'cr' || unit === 'crore' ? 1e7 : unit === 'l' || unit === 'lac' || unit === 'lakh' ? 1e5 : unit === 'k' || unit === 'thousand' ? 1e3 : 1;
    return num * mult;
  };

  const safeText = (text: string | undefined | null) => (text || '').toString().trim();

  const writeWrapped = (opts: {
    text: string;
    x: number;
    y: number;
    maxWidth: number;
    font: 'times' | 'helvetica';
    style: 'normal' | 'bold' | 'italic';
    size: number;
    lineHeight: number;
    color?: readonly [number, number, number];
  }) => {
    const lines = pdf.splitTextToSize(opts.text, opts.maxWidth);
    pdf.setFont(opts.font, opts.style);
    pdf.setFontSize(opts.size);
    setTextColor(opts.color || colors.ink);
    pdf.text(lines, opts.x, opts.y);
    return opts.y + lines.length * opts.lineHeight;
  };

  const bullet = (y: number) => {
    setTextColor(colors.accent);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('•', margin, y);
  };

  // ---------------- Title page (light) ----------------
  setFillColor([255, 255, 255]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  setTextColor(colors.accent);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(10);
  pdf.text('PHYSIQUE 57 INDIA', margin, 28);

  setTextColor(colors.ink);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(28);
  pdf.text('2026 Sales Masterplan', margin, 45);

  setTextColor(colors.muted);
  pdf.setFont('times', 'italic');
  pdf.setFontSize(12);
  pdf.text('Strategic monthly report', margin, 55);

  line(63);

  const subtitle = 'Monthly plan with offers, pricing, targets, and operational notes.';
  writeWrapped({
    text: subtitle,
    x: margin,
    y: 74,
    maxWidth: 150,
    font: 'helvetica',
    style: 'normal',
    size: 10,
    lineHeight: 5,
    color: colors.muted,
  });

  const totalOffers = exportData.reduce((acc, m) => acc + m.offers.filter(o => !o.cancelled).length, 0);
  const statsY = 110;

  setTextColor(colors.ink);
  pdf.setFont('times', 'bold');
  pdf.setFontSize(12);
  pdf.text('Report Summary', margin, statsY);

  line(statsY + 4, true);

  const summaryLeftX = margin;
  const summaryRightX = margin + 92;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  setTextColor(colors.muted);
  pdf.text(`Scope: ${scope === 'all' ? 'Full year' : 'Current month'}`, summaryLeftX, statsY + 15);
  pdf.text(`Months included: ${exportData.length}`, summaryLeftX, statsY + 22);
  pdf.text(`Active offers: ${totalOffers}`, summaryLeftX, statsY + 29);

  pdf.text('Generated:', summaryRightX, statsY + 15);
  setTextColor(colors.ink);
  pdf.text(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }), summaryRightX + 20, statsY + 15);

  setTextColor(colors.muted);
  pdf.text('Document:', summaryRightX, statsY + 22);
  setTextColor(colors.ink);
  pdf.text('Confidential', summaryRightX + 20, statsY + 22);

  // ---------------- Month pages ----------------
  exportData.forEach((month) => {
    pdf.addPage();
    setFillColor([255, 255, 255]);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    let y = 22;

    // Header
    setTextColor(colors.accent);
    pdf.setFont('times', 'bold');
    pdf.setFontSize(10);
    pdf.text('MONTHLY SECTION', margin, y);

    setTextColor(colors.ink);
    pdf.setFont('times', 'bold');
    pdf.setFontSize(22);
    pdf.text(month.name, margin, y + 14);

    setTextColor(colors.muted);
    pdf.setFont('times', 'italic');
    pdf.setFontSize(11);
    pdf.text(month.theme, margin, y + 22);

    // April special note
    if (month.name.toLowerCase() === 'april') {
      setTextColor(colors.accent);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('Celebrating Year 8 in India', margin, y + 30);
      y += 8;
    }

    y += 30;
    line(y);

    // Summary
    y += 8;
    y = writeWrapped({
      text: safeText(month.summary),
      x: margin,
      y,
      maxWidth: contentWidth,
      font: 'helvetica',
      style: 'normal',
      size: 10,
      lineHeight: 5,
      color: colors.ink,
    });

    // Revenue target (formatted)
    y += 4;
    line(y, true);
    y += 8;

    const parsedTarget = parseINRCompact(safeText(month.revenueTargetTotal).replace(/[₹]/g, ''));
    const targetDisplay = parsedTarget != null ? formatINRCompact(parsedTarget) : (month.revenueTargetTotal || 'TBD');

    setTextColor(colors.muted);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text('Revenue Target:', margin, y);

    setTextColor(colors.ink);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(String(targetDisplay), margin + 35, y);

    y += 12;

    // Offers section
    const activeOffers = month.offers.filter(o => !o.cancelled);

    setTextColor(colors.accent);
    pdf.setFont('times', 'bold');
    pdf.setFontSize(12);
    pdf.text(`Offers (${activeOffers.length})`, margin, y);

    y += 6;
    line(y, true);
    y += 10;

    const ensureSpace = (minSpace: number) => {
      if (y + minSpace <= pageHeight - margin) return;
      pdf.addPage();
      setFillColor([255, 255, 255]);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      y = 22;
      setTextColor(colors.muted);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text(`${month.name} — Offers (continued)`, margin, y);
      y += 8;
      line(y, true);
      y += 12;
    };

    const sectionStartX = margin + 2;
    const sectionLeftRuleX = margin;

    activeOffers.forEach((offer, idx) => {
      // Try to keep each offer together; if it doesn't fit, start a new page.
      ensureSpace(70);

      const startY = y;

      // Top border
      setDrawColor(colors.rule);
      pdf.setLineWidth(0.35);
      pdf.line(margin, startY - 4, pageWidth - margin, startY - 4);

      // Offer heading
      setTextColor(colors.ink);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      const heading = `${idx + 1}. ${offer.title}`;
      const headingLines = pdf.splitTextToSize(heading, contentWidth);
      pdf.text(headingLines, margin, y);
      y += headingLines.length * 6;

      setTextColor(colors.muted);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(`Type: ${offer.type}${offer.promoteOnAds ? ' • Promote on Ads: Yes' : ' • Promote on Ads: No'}`, margin, y);
      y += 7;

      // Bullets
      const writeBulletKV = (label: string, value: string) => {
        const v = safeText(value);
        if (!v) return;

        ensureSpace(14);
        bullet(y);
        setTextColor(colors.ink);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.text(`${label}:`, sectionStartX, y);

        const labelW = pdf.getTextWidth(`${label}: `);
        const xValue = sectionStartX + labelW + 1;
        const maxW = pageWidth - margin - xValue;

        const lines = pdf.splitTextToSize(v, maxW);
        pdf.setFont('helvetica', 'normal');
        setTextColor(colors.ink);
        pdf.text(lines, xValue, y);
        y += Math.max(1, lines.length) * 5.2;
      };

      writeBulletKV('Description', safeText(offer.description));
      writeBulletKV('Pricing display', safeText(offer.pricing));

      const discountText = offer.discountPercent != null ? `${offer.discountPercent}%` : '';
      writeBulletKV('Discount', discountText);
      writeBulletKV('Savings', safeText(offer.savings));

      // Location numbers + projected revenue
      const mumbaiUnits = toNumberUnits(offer.targetUnitsMumbai ?? offer.targetUnits);
      const blrUnits = toNumberUnits(offer.targetUnitsBengaluru ?? offer.targetUnits);

      const mumbaiPrice = offer.finalPriceMumbai ?? offer.priceMumbai;
      const blrPrice = offer.finalPriceBengaluru ?? offer.priceBengaluru;

      const mumbaiRevenue = mumbaiPrice && mumbaiUnits ? mumbaiPrice * mumbaiUnits : 0;
      const blrRevenue = blrPrice && blrUnits ? blrPrice * blrUnits : 0;

      if (offer.priceMumbai || offer.finalPriceMumbai || offer.targetUnitsMumbai || offer.targetUnits) {
        const mumbaiLine = `Mumbai — Price: ${mumbaiPrice != null ? formatINRCompact(mumbaiPrice) : 'N/A'} | Units: ${mumbaiUnits || 0} | Projected: ${mumbaiRevenue ? formatINRCompact(mumbaiRevenue) : '₹0'}`;
        writeBulletKV('Mumbai', mumbaiLine);
      }

      if (offer.priceBengaluru || offer.finalPriceBengaluru || offer.targetUnitsBengaluru || offer.targetUnits) {
        const blrLine = `Bengaluru — Price: ${blrPrice != null ? formatINRCompact(blrPrice) : 'N/A'} | Units: ${blrUnits || 0} | Projected: ${blrRevenue ? formatINRCompact(blrRevenue) : '₹0'}`;
        writeBulletKV('Bengaluru', blrLine);
      }

      writeBulletKV('Why it works', safeText(offer.whyItWorks));
      writeBulletKV('Marketing collateral', safeText(offer.marketingCollateral));
      writeBulletKV('Operational support', safeText(offer.operationalSupport));

      // Collateral selections (channels/types)
      const channels = offer.collateralChannels
        ? Object.entries(offer.collateralChannels)
            .filter(([, v]) => v)
            .map(([k]) => k)
        : [];
      const types = offer.collateralTypes
        ? Object.entries(offer.collateralTypes)
            .filter(([, v]) => v)
            .map(([k]) => k)
        : [];

      if (channels.length) writeBulletKV('Collateral channels', channels.join(', '));
      if (types.length) writeBulletKV('Collateral types', types.join(', '));

      // Bottom border + left rule
      const endY = y + 3;
      setDrawColor(colors.softRule);
      pdf.setLineWidth(0.35);
      pdf.line(margin, endY, pageWidth - margin, endY);

      setDrawColor(colors.accent);
      pdf.setLineWidth(0.6);
      pdf.line(sectionLeftRuleX, startY - 2, sectionLeftRuleX, endY);

      y = endY + 10;
    });

    // Financial targets (report-style)
    if (month.financialTargets && month.financialTargets.length > 0) {
      ensureSpace(40);
      setTextColor(colors.accent);
      pdf.setFont('times', 'bold');
      pdf.setFontSize(12);
      pdf.text('Studio Targets', margin, y);
      y += 6;
      line(y, true);
      y += 10;

      month.financialTargets.forEach((t) => {
        ensureSpace(18);

        const parsed = parseINRCompact(safeText(t.revenueTarget).replace(/[₹]/g, ''));
        const rev = parsed != null ? formatINRCompact(parsed) : t.revenueTarget;

        setTextColor(colors.ink);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.text(`${t.location}`, margin, y);

        setTextColor(colors.muted);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.text(`Target: ${rev}  •  Units: ${t.targetUnits}  •  Ticket: ${t.estTicketSize}`, margin, y + 6);

        const logic = safeText(t.logic);
        if (logic) {
          const nextY = y + 12;
          const maxW = contentWidth;
          const lines = pdf.splitTextToSize(logic, maxW);
          setTextColor(colors.muted);
          pdf.setFont('helvetica', 'italic');
          pdf.setFontSize(8.5);
          pdf.text(lines.slice(0, 2), margin, nextY);
          y = nextY + Math.min(2, lines.length) * 4.8 + 6;
        } else {
          y += 18;
        }

        setDrawColor(colors.softRule);
        pdf.setLineWidth(0.25);
        pdf.line(margin, y - 3, pageWidth - margin, y - 3);
      });
    }

    // Footer
    setTextColor(colors.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('Physique 57 India — 2026 Sales Masterplan', margin, pageHeight - 12);
    pdf.text(month.name, pageWidth - margin, pageHeight - 12, { align: 'right' });
  });

  pdf.save(`Physique57_Sales_Plan_${scope === 'all' ? 'Full' : currentMonth?.name || 'Current'}_${new Date().toISOString().split('T')[0]}.pdf`);
}


// Generate Word Document Export
export async function exportToWord(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  const children: any[] = [
    new Paragraph({
      text: "Physique 57 India",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      text: "2026 Sales Masterplan",
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      text: `Generated: ${new Date().toLocaleDateString()}`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  ];
  
  exportData.forEach(month => {
    // Month header
    children.push(
      new Paragraph({
        text: month.name,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: month.theme,
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 }
      }),
      new Paragraph({
        text: month.summary,
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Revenue Target: ${month.revenueTargetTotal}`,
            bold: true,
            color: "059669"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    // Strategic Offers
    children.push(
      new Paragraph({
        text: `Strategic Offers (${month.offers.filter(o => !o.cancelled).length} Active)`,
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 300, after: 200 }
      })
    );
    
    month.offers.filter(o => !o.cancelled).forEach(offer => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${offer.title} `,
              bold: true,
              size: 24
            }),
            new TextRun({
              text: `[${offer.type}]`,
              color: "7c3aed",
              bold: true
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: offer.description,
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: offer.pricing,
              bold: true,
              color: "c026d3"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Mumbai: ₹${offer.priceMumbai?.toLocaleString('en-IN') || 'N/A'} → ₹${offer.finalPriceMumbai?.toLocaleString('en-IN') || 'N/A'} | `,
              size: 20
            }),
            new TextRun({
              text: `Bengaluru: ₹${offer.priceBengaluru?.toLocaleString('en-IN') || 'N/A'} → ₹${offer.finalPriceBengaluru?.toLocaleString('en-IN') || 'N/A'}`,
              size: 20
            })
          ],
          spacing: { after: 50 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Discount: ${offer.discountPercent}% | Savings: ${offer.savings} | Target: ${offer.targetUnits} units`,
              size: 20,
              color: "059669"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Strategy: ${offer.whyItWorks}`,
              italics: true
            })
          ],
          spacing: { after: 100 }
        })
      );
      
      if (offer.marketingCollateral) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Marketing: ${offer.marketingCollateral}`,
                size: 18,
                color: "7c3aed"
              })
            ],
            spacing: { after: 50 }
          })
        );
      }
      
      if (offer.operationalSupport) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Operations: ${offer.operationalSupport}`,
                size: 18,
                color: "059669"
              })
            ],
            spacing: { after: 200 }
          })
        );
      }
    });
    
    // Financial Targets
    if (month.financialTargets && month.financialTargets.length > 0) {
      children.push(
        new Paragraph({
          text: "Financial Targets",
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 200 }
        })
      );
      
      month.financialTargets.forEach(target => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${target.location} - ${target.category}`,
                bold: true
              })
            ],
            spacing: { before: 150, after: 50 }
          }),
          new Paragraph({
            text: `Target: ${target.targetUnits} units | Revenue: ${target.revenueTarget}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: target.logic,
                italics: true
              })
            ],
            spacing: { after: 150 }
          })
        );
      });
    }
  });
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });
  
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const filename = scope === 'current' && currentMonth 
    ? `Physique57_${currentMonth.name}_Plan_${new Date().toISOString().split('T')[0]}.docx`
    : `Physique57_2026_Sales_Plan_${new Date().toISOString().split('T')[0]}.docx`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate Image Export
export async function exportToImage(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  // Create a temporary container
  const container = document.createElement('div');
  container.style.width = '1200px';
  container.style.padding = '60px';
  container.style.backgroundColor = 'white';
  container.style.fontFamily = 'Inter, Arial, sans-serif';
  
  let html = `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #c026d3; font-size: 48px; margin-bottom: 15px; font-weight: bold;">Physique 57 India</h1>
      <h2 style="color: #6b7280; font-size: 32px; margin-bottom: 20px;">2026 Sales Masterplan</h2>
      <p style="color: #9ca3af; font-size: 16px;">Generated: ${new Date().toLocaleDateString()}</p>
    </div>
  `;
  
  exportData.forEach(month => {
    html += `
      <div style="margin-bottom: 50px; padding: 40px; background: linear-gradient(135deg, #fdf4ff 0%, #f0abfc 100%); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h3 style="color: #c026d3; font-size: 36px; margin-bottom: 10px; font-weight: bold;">${month.name}</h3>
        <h4 style="color: #7c3aed; font-size: 24px; margin-bottom: 20px;">${month.theme}</h4>
        <p style="color: #4b5563; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">${month.summary}</p>
        <p style="color: #059669; font-weight: bold; font-size: 22px;">💰 Revenue Target: ${month.revenueTargetTotal}</p>
        
        <div style="margin-top: 30px; padding-top: 30px; border-top: 3px solid #c026d3;">
          <h5 style="color: #374151; font-size: 24px; margin-bottom: 20px;">✨ Strategic Offers (${month.offers.filter(o => !o.cancelled).length} Active)</h5>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            ${month.offers.filter(o => !o.cancelled).map(offer => `
              <div style="padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <h6 style="color: #111827; font-size: 18px; font-weight: bold; margin: 0;">${offer.title}</h6>
                  <span style="background: #ddd6fe; color: #7c3aed; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: bold;">${offer.type}</span>
                </div>
                <p style="color: #6b7280; font-size: 14px; margin: 10px 0; line-height: 1.5;">${offer.description}</p>
                <p style="color: #c026d3; font-weight: bold; font-size: 16px; margin: 10px 0;">${offer.pricing}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  document.body.appendChild(container);
  
  const canvas = await html2canvas(container, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false
  });
  
  document.body.removeChild(container);
  
  // Download as PNG
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  const filename = scope === 'current' && currentMonth 
    ? `Physique57_${currentMonth.name}_Plan_${new Date().toISOString().split('T')[0]}.png`
    : `Physique57_2026_Sales_Plan_${new Date().toISOString().split('T')[0]}.png`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Generate Email Body HTML
export function generateEmailBody(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData): string {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Physique 57 India - 2026 Sales Masterplan</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #c026d3 0%, #7c3aed 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 10px 0;">Physique 57 India</h1>
              <h2 style="color: #fdf4ff; font-size: 20px; margin: 0;">2026 Sales Masterplan</h2>
            </td>
          </tr>
          
          <!-- Content -->
          ${exportData.map(month => `
          <tr>
            <td style="padding: 30px;">
              <h3 style="color: #c026d3; font-size: 24px; margin: 0 0 10px 0;">${month.name}: ${month.theme}</h3>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">${month.summary}</p>
              <p style="color: #059669; font-weight: bold; font-size: 16px; margin: 0 0 20px 0;">💰 Revenue Target: ${month.revenueTargetTotal}</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                ${month.offers.filter(o => !o.cancelled).map(offer => `
                <tr>
                  <td style="padding: 15px; background: #f9fafb; border-radius: 8px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <strong style="color: #111827; font-size: 16px;">${offer.title}</strong>
                      <span style="background: #ddd6fe; color: #7c3aed; padding: 4px 10px; border-radius: 12px; font-size: 11px;">${offer.type}</span>
                    </div>
                    <p style="color: #6b7280; font-size: 13px; margin: 5px 0;">${offer.description}</p>
                    <p style="color: #c026d3; font-weight: bold; font-size: 14px;">${offer.pricing}</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                `).join('')}
              </table>
            </td>
          </tr>
          <tr><td style="height: 1px; background: #e5e7eb;"></td></tr>
          `).join('')}
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; background: #f9fafb; border-radius: 0 0 12px 12px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">Generated: ${new Date().toLocaleDateString()}</p>
              <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">Physique 57 India - Premium Fitness Studios</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  
  return html;
}

// Copy email to clipboard
export async function copyEmailToClipboard(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData): Promise<void> {
  const emailHtml = generateEmailBody(data, scope, currentMonth);
  
  try {
    await navigator.clipboard.writeText(emailHtml);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = emailHtml;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
