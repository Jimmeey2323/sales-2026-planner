import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';
import { MonthData, Offer } from '../types';
import { Download, Sparkles } from 'lucide-react';

// Register fonts for better typography
// Font.register({
//   family: 'Inter',
//   src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#4f46e5',
    paddingBottom: 15,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 3,
  },
  summaryGrid: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
  },
  summaryCard: {
    flex: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 8,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  monthSection: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    breakInside: 'avoid',
    border: '1px solid #e2e8f0',
  },
  monthHeader: {
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  monthTheme: {
    fontSize: 11,
    opacity: 0.95,
    color: '#e0e7ff',
  },
  monthContent: {
    padding: 15,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 10,
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 5,
  },
  summaryBox: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
  },
  summaryText: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.6,
    fontStyle: 'italic',
  },
  offersGrid: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12,
  },
  offerCard: {
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    breakInside: 'avoid',
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  offerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 0,
    flex: 1,
  },
  offerType: {
    fontSize: 7,
    color: '#6366f1',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  offerDescription: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 1.6,
  },
  whyItWorksBox: {
    marginTop: 6,
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fffbeb',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  whyItWorksLabel: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  whyItWorksText: {
    fontSize: 8,
    color: '#78350f',
    lineHeight: 1.5,
  },
  pricingSection: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pricingLabel: {
    fontSize: 8,
    color: '#64748b',
    fontWeight: 'bold',
  },
  pricingValueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  pricingValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  savingsText: {
    fontSize: 7,
    color: '#059669',
    fontWeight: 'bold',
  },
  targetBox: {
    marginTop: 8,
    padding: 6,
    backgroundColor: '#f0fdf4',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  targetLabel: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#065f46',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  targetValue: {
    fontSize: 8,
    color: '#166534',
    fontWeight: 'bold',
  },
  strategySection: {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: 6,
    padding: 12,
    marginTop: 12,
  },
  strategyTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  strategyGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  strategyColumn: {
    flex: 1,
    backgroundColor: '#ffffff',
    border: '1px solid #dbeafe',
    borderRadius: 4,
    padding: 8,
  },
  strategySubtitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
  },
  strategyItem: {
    fontSize: 8,
    color: '#334155',
    marginBottom: 3,
    marginLeft: 5,
    lineHeight: 1.5,
  },
});

interface ReactPDFDocumentProps {
  data: MonthData[];
  yearlyStats: {
    totalOffers: number;
    activeOffers: number;
    totalRevenue: number;
    mumbaiRevenue: number;
    bengaluruRevenue: number;
    growthPercent: number;
  };
}

export const ReactPDFDocument: React.FC<ReactPDFDocumentProps> = ({ data, yearlyStats }) => {
  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toFixed(0)}`;
  };

  // Determine location-based theming
  const getLocationTheme = () => {
    const hasMumbai = data.some(m => m.offers.some(o => o.priceMumbai));
    const hasBengaluru = data.some(m => m.offers.some(o => o.priceBengaluru));
    
    if (hasMumbai && !hasBengaluru) {
      return { primary: '#1e40af', secondary: '#3b82f6', name: 'Mumbai' }; // Blue theme
    } else if (hasBengaluru && !hasMumbai) {
      return { primary: '#c2410c', secondary: '#f97316', name: 'Bengaluru' }; // Orange theme
    } else {
      return { primary: '#4f46e5', secondary: '#6366f1', name: 'Both Locations' }; // Indigo theme
    }
  };

  const locationTheme = getLocationTheme();

  const getStrategyItems = (monthId: string, type: 'focus' | 'offers'): string[] => {
    const monthNum = parseInt(monthId);
    const strategies: Record<number, { focus: string[], offers: string[] }> = {
      1: {
        focus: ['New Year campaigns', 'Winter collections', 'Goal-setting products'],
        offers: ['Resolution packages', 'Early bird discounts', 'Bundle deals']
      },
      2: {
        focus: ['Valentine promotions', 'Love campaigns', 'Couples packages'],
        offers: ['Romantic packages', 'BOGO offers', 'Date night deals']
      },
      // Add more months as needed...
    };
    return strategies[monthNum]?.[type] || ['Strategic focus areas', 'Tailored offers', 'Seasonal opportunities'];
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Professional Header */}
        <View style={[styles.header, { borderBottomColor: locationTheme.primary }]}>
          <Text style={[styles.title, { color: locationTheme.primary }]}>2026 Sales Masterplan</Text>
          <Text style={styles.subtitle}>Strategic Planning Document - {locationTheme.name}</Text>
          <Text style={styles.subtitle}>Generated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
        </View>

        {/* Executive Summary Stats */}
        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, { borderLeftColor: locationTheme.primary }]}>
            <Text style={styles.summaryLabel}>Total Offers</Text>
            <Text style={[styles.summaryValue, { color: locationTheme.primary }]}>{yearlyStats.totalOffers}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: locationTheme.primary }]}>
            <Text style={styles.summaryLabel}>Active Offers</Text>
            <Text style={[styles.summaryValue, { color: locationTheme.primary }]}>{yearlyStats.activeOffers}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: locationTheme.primary }]}>
            <Text style={styles.summaryLabel}>Revenue Target</Text>
            <Text style={[styles.summaryValue, { color: locationTheme.primary }]}>{formatCurrency(yearlyStats.totalRevenue)}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: locationTheme.primary }]}>
            <Text style={styles.summaryLabel}>Growth Target</Text>
            <Text style={[styles.summaryValue, { color: locationTheme.primary }]}>{yearlyStats.growthPercent.toFixed(1)}%</Text>
          </View>
        </View>

        {/* Monthly Breakdown */}
        {data.map((month, index) => (
          <View key={month.id} style={styles.monthSection} break={index > 0 && index % 2 === 0}>
            <View style={[styles.monthHeader, { backgroundColor: locationTheme.primary }]}>
              <Text style={styles.monthTitle}>{month.name} - {month.theme}</Text>
              <Text style={styles.monthTheme}>{month.offers.filter(o => !o.cancelled).length} Active Offers</Text>
            </View>
            
            <View style={styles.monthContent}>
              {/* Month Summary */}
              {month.summary && (
                <View>
                  <Text style={styles.sectionLabel}>Overview</Text>
                  <View style={[styles.summaryBox, { borderLeftColor: locationTheme.secondary }]}>
                    <Text style={styles.summaryText}>{month.summary}</Text>
                  </View>
                </View>
              )}

              {/* Offers Section */}
              <Text style={styles.sectionLabel}>Strategic Offers</Text>
              <View style={styles.offersGrid}>
                {month.offers.filter(offer => !offer.cancelled).map((offer) => (
                  <View key={offer.id} style={[styles.offerCard, { borderColor: locationTheme.secondary + '40' }]}>
                    <View style={styles.offerHeader}>
                      <Text style={[styles.offerTitle, { color: locationTheme.primary }]}>{offer.title}</Text>
                      <Text style={[styles.offerType, { backgroundColor: locationTheme.primary + '15', color: locationTheme.primary }]}>
                        {offer.type}
                      </Text>
                    </View>
                    
                    <Text style={styles.offerDescription}>{offer.description}</Text>
                    
                    {/* Why It Works Section */}
                    {offer.whyItWorks && (
                      <View style={styles.whyItWorksBox}>
                        <Text style={styles.whyItWorksLabel}>Strategic Rationale</Text>
                        <Text style={styles.whyItWorksText}>{offer.whyItWorks}</Text>
                      </View>
                    )}
                    
                    {/* Pricing Information */}
                    <View style={styles.pricingSection}>
                      {offer.priceMumbai && (
                        <View style={styles.pricingRow}>
                          <Text style={styles.pricingLabel}>Mumbai Pricing:</Text>
                          <View style={styles.pricingValueContainer}>
                            <Text style={styles.pricingValue}>Rs. {offer.priceMumbai.toLocaleString('en-IN')}</Text>
                            {offer.finalPriceMumbai && offer.finalPriceMumbai < offer.priceMumbai && (
                              <Text style={styles.savingsText}>
                                Savings: Rs. {(offer.priceMumbai - offer.finalPriceMumbai).toLocaleString('en-IN')}
                              </Text>
                            )}
                          </View>
                        </View>
                      )}
                      {offer.priceBengaluru && (
                        <View style={styles.pricingRow}>
                          <Text style={styles.pricingLabel}>Bengaluru Pricing:</Text>
                          <View style={styles.pricingValueContainer}>
                            <Text style={styles.pricingValue}>Rs. {offer.priceBengaluru.toLocaleString('en-IN')}</Text>
                            {offer.finalPriceBengaluru && offer.finalPriceBengaluru < offer.priceBengaluru && (
                              <Text style={styles.savingsText}>
                                Savings: Rs. {(offer.priceBengaluru - offer.finalPriceBengaluru).toLocaleString('en-IN')}
                              </Text>
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                    
                    {/* Target Units */}
                    {(offer.targetUnits || offer.targetUnitsMumbai || offer.targetUnitsBengaluru) && (
                      <View style={styles.targetBox}>
                        <Text style={styles.targetLabel}>Target Units</Text>
                        <Text style={styles.targetValue}>
                          {offer.targetUnits || `Mumbai: ${offer.targetUnitsMumbai || 0} | Bengaluru: ${offer.targetUnitsBengaluru || 0}`}
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {/* Strategy & Focus Section */}
              <View style={[styles.strategySection, { borderColor: locationTheme.secondary, backgroundColor: locationTheme.primary + '08' }]}>
                <Text style={[styles.strategyTitle, { color: locationTheme.primary }]}>Monthly Strategy & Focus Areas</Text>
                <View style={styles.strategyGrid}>
                  <View style={[styles.strategyColumn, { borderColor: locationTheme.secondary + '40' }]}>
                    <Text style={[styles.strategySubtitle, { color: locationTheme.primary }]}>Key Focus Areas</Text>
                    {getStrategyItems(month.id, 'focus').map((item, idx) => (
                      <Text key={idx} style={styles.strategyItem}>- {item}</Text>
                    ))}
                  </View>
                  <View style={[styles.strategyColumn, { borderColor: locationTheme.secondary + '40' }]}>
                    <Text style={[styles.strategySubtitle, { color: locationTheme.primary }]}>Offer Strategy</Text>
                    {getStrategyItems(month.id, 'offers').map((item, idx) => (
                      <Text key={idx} style={styles.strategyItem}>- {item}</Text>
                    ))}
                  </View>
                  <View style={[styles.strategyColumn, { borderColor: locationTheme.secondary + '40' }]}>
                    <Text style={[styles.strategySubtitle, { color: locationTheme.primary }]}>Performance Metrics</Text>
                    <Text style={styles.strategyItem}>- Revenue Target: {formatCurrency(month.revenueTarget || 0)}</Text>
                    <Text style={styles.strategyItem}>- Active Offers: {month.offers.filter(o => !o.cancelled).length}</Text>
                    <Text style={styles.strategyItem}>- Hero Offers: {month.offers.filter(o => o.type === 'Hero').length}</Text>
                    <Text style={styles.strategyItem}>- New Launches: {month.offers.filter(o => o.type === 'New').length}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

interface ProfessionalPDFExporterProps {
  data: MonthData[];
  yearlyStats: {
    totalOffers: number;
    activeOffers: number;
    totalRevenue: number;
    mumbaiRevenue: number;
    bengaluruRevenue: number;
    growthPercent: number;
  };
  filename?: string;
}

export const ProfessionalPDFExporter: React.FC<ProfessionalPDFExporterProps> = ({ 
  data, 
  yearlyStats, 
  filename = 'sales-masterplan-2026-professional' 
}) => {
  return (
    <PDFDownloadLink
      document={<ReactPDFDocument data={data} yearlyStats={yearlyStats} />}
      fileName={`${filename}.pdf`}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg print:hidden"
    >
      {({ blob, url, loading, error }) => (
        loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating Professional PDF...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Download Professional PDF
          </>
        )
      )}
    </PDFDownloadLink>
  );
};