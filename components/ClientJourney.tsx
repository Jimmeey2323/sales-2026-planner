import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Clock, Target, Award, TrendingUp } from 'lucide-react';

export const ClientJourney: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const togglePhase = (phase: number) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">Client Onboarding</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">The 57-Day Performance Pathway</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A precision-engineered journey designed to drive conversion, habit formation, and long-term loyalty
        </p>
      </div>

      {/* Progress Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-4">
          {/* PHASE I */}
          <div className="relative">
            <div className="absolute left-0 top-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-xl font-bold text-white">I</span>
            </div>
            
            <div className="ml-20">
              <button
                onClick={() => togglePhase(1)}
                className="w-full bg-white border-2 border-gray-200 hover:border-indigo-300 rounded-xl p-6 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">Initiation & Commitment</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">DAYS 0-7</span>
                      </div>
                      <p className="text-sm text-gray-600">Remove entry friction & "Pre-Flight" the client</p>
                    </div>
                  </div>
                  {expandedPhase === 1 ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {expandedPhase === 1 && (
                <div className="mt-4 bg-indigo-50 border-2 border-indigo-100 rounded-xl p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Digital Onboarding Flow</h4>
                    <p className="text-sm text-gray-700 mb-3">Mobile-first link via WhatsApp/SMS:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['Digital Liability Waiver', 'Personalization Scan (Goals, Injuries, Experience)', 'Commitment Trigger: "What outcome would make the next 30 days a success?"', 'Access Unlock: Studio Success Guide'].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-indigo-200">
                          <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Entry Programs</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 mb-1">Foundation Start</div>
                        <div className="text-xl font-bold text-gray-900 mb-2">₹3,400</div>
                        <div className="text-xs text-gray-600 mb-2">4 Classes · 14 days</div>
                        <div className="text-xs text-indigo-700 font-medium">Controlled exposure</div>
                      </div>
                      
                      <div className="bg-indigo-600 text-white rounded-lg p-4 border-2 border-indigo-700 shadow-md relative">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">RECOMMENDED</div>
                        <div className="text-xs font-semibold text-indigo-100 mb-1">Progress Start</div>
                        <div className="text-xl font-bold mb-2">₹6,200</div>
                        <div className="text-xs text-indigo-100 mb-2">8 Classes · 30 days</div>
                        <div className="text-xs font-medium">Behavior formation</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 mb-1">Performance Access</div>
                        <div className="text-xl font-bold text-gray-900 mb-2">₹13,900</div>
                        <div className="text-xs text-gray-600 mb-2">Unlimited · 30 days</div>
                        <div className="text-xs text-indigo-700 font-medium">Full immersion</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PHASE II */}
          <div className="relative">
            <div className="absolute left-0 top-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-xl font-bold text-white">II</span>
            </div>
            
            <div className="ml-20">
              <button
                onClick={() => togglePhase(2)}
                className="w-full bg-white border-2 border-gray-200 hover:border-indigo-300 rounded-xl p-6 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">Activation & Habit Formation</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">DAYS 8-30</span>
                      </div>
                      <p className="text-sm text-gray-600">Establish consistent attendance rhythm</p>
                    </div>
                  </div>
                  {expandedPhase === 2 ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {expandedPhase === 2 && (
                <div className="mt-4 bg-indigo-50 border-2 border-indigo-100 rounded-xl p-6 space-y-6">
                  <div className="bg-white rounded-lg p-5 border border-indigo-200">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">The Momentum Ledger</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">Digital progress bar tracking class completion</p>
                    <div className="bg-indigo-600 text-white rounded-lg p-3">
                      <div className="text-xs font-semibold mb-1">Core Rule</div>
                      <div className="text-base font-bold">8 classes in 30 days = "Momentum Qualified"</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Milestone Rewards</h4>
                    <div className="space-y-2">
                      {[
                        { count: 4, title: '4 Classes', reward: 'Momentum Acknowledgement + Retail perk' },
                        { count: 8, title: '8 Classes', reward: 'Momentum Qualified Status + Upgrade Eligibility' },
                        { count: 12, title: '12 Classes', reward: 'Priority Upgrade Offer' }
                      ].map((milestone, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-indigo-200">
                          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-white">{milestone.count}</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-gray-900">{milestone.title}</div>
                            <div className="text-xs text-gray-600">{milestone.reward}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-yellow-700 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-yellow-900 mb-1">Performance Check (Day 14)</div>
                        <div className="text-xs text-yellow-800">Automated WhatsApp check-in to identify and assist struggling clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PHASE III */}
          <div className="relative">
            <div className="absolute left-0 top-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-xl font-bold text-white">III</span>
            </div>
            
            <div className="ml-20">
              <button
                onClick={() => togglePhase(3)}
                className="w-full bg-white border-2 border-gray-200 hover:border-indigo-300 rounded-xl p-6 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">Consolidation & Identity</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">DAYS 31-57</span>
                      </div>
                      <p className="text-sm text-gray-600">Transition to long-term member</p>
                    </div>
                  </div>
                  {expandedPhase === 3 ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {expandedPhase === 3 && (
                <div className="mt-4 bg-indigo-50 border-2 border-indigo-100 rounded-xl p-6 space-y-6">
                  <div className="bg-white rounded-lg p-5 border border-indigo-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Day 35 Performance Recap</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">Automated email summarizing attendance and instructor notes</p>
                    <div className="bg-indigo-600 text-white rounded-lg p-3">
                      <div className="text-xs font-semibold mb-1">The Hook</div>
                      <div className="text-sm font-bold">48-hour window to upgrade to Unlimited for remainder of 57 days</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-5 text-white shadow-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold mb-2">Day 57 Gold Status Elevation</div>
                        <div className="text-sm text-white/95 mb-3">Permanent status for completing the path</div>
                        <div className="space-y-1.5">
                          {['10% lifetime retail benefit', 'Quarterly guest passes', 'Priority waitlist access'].map((perk, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              <span>{perk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
        {/* Feedback Loop */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Feedback Loop</h3>
          <div className="space-y-2">
            {[
              { time: 'Post-First Class (+1 hr)', action: '1-5 star rating to flag at-risk trials' },
              { time: 'Class #8 (Momentum)', action: '2-question survey for testimonials' },
              { time: 'Inactivity Alert (14 days)', action: 'WhatsApp check-in for churn diagnosis' },
              { time: 'Day 57 (Gold Status)', action: 'NPS survey for advocacy measurement' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="text-xs font-bold text-gray-900">{item.time}</div>
                <div className="text-xs text-gray-600">{item.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gray-900 text-white rounded-xl p-5">
          <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">Success Metrics (KPIs)</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Pre-Flight Completion', value: '95%+' },
              { label: 'Trial-to-Paid Conversion', value: '65%+' },
              { label: 'Early Frequency (30 Days)', value: '8+ visits' },
              { label: 'Customer Satisfaction', value: 'NPS 70+' }
            ].map((metric, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-xs font-semibold text-white/70 mb-1">{metric.label}</div>
                <div className="text-lg font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
