import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Target, Award, TrendingUp, Gift } from 'lucide-react';

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
          <span className="text-sm font-semibold text-indigo-900 uppercase tracking-wider">Member Progression</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Member Progression Sequence</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Building Lifetime Wellness Through Milestone Rewards
        </p>
      </div>

      {/* Progress Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        <div className="space-y-4">
          {/* PHASE 1 */}
          <div className="relative">
            <div className="absolute left-0 top-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-xl font-bold text-white">1</span>
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
                        <h3 className="text-xl font-bold text-gray-900">Welcome & First Month</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">PHASE 1</span>
                      </div>
                      <p className="text-sm text-gray-600">Trial class experience + 15% off 1-month unlimited</p>
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
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Trial Class Experience</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      New members begin their journey with a complimentary trial class, experiencing the transformative power of the Physique 57 method firsthand.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">First Month Offer</h4>
                    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-5 h-5 text-indigo-600" />
                        <div className="text-sm font-bold text-indigo-900">Welcome Incentive: 15% off 1-month unlimited membership</div>
                      </div>
                      <p className="text-xs text-gray-700">
                        Following the trial class, new members receive an exclusive 15% discount on their first month of unlimited access.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Mumbai</div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs text-gray-500 line-through">₹17,750</span>
                          <span className="text-xl font-bold text-indigo-600">₹15,088</span>
                        </div>
                        <div className="text-xs text-gray-600">New Member Rate</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Bengaluru</div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs text-gray-500 line-through">₹13,900</span>
                          <span className="text-xl font-bold text-indigo-600">₹11,815</span>
                        </div>
                        <div className="text-xs text-gray-600">New Member Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-yellow-700 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-yellow-900 mb-2">Milestone 1: Consistency Achievement</div>
                        <div className="text-xs text-yellow-800 mb-3">
                          <strong>Qualification Criteria:</strong> Complete 3+ classes per week OR 18+ classes within the first month
                        </div>
                        <div className="bg-yellow-600 text-white rounded-lg p-3">
                          <div className="text-xs font-semibold mb-1">Reward</div>
                          <div className="text-base font-bold">₹10,000 discount on 3-month unlimited membership</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PHASE 2 */}
          <div className="relative">
            <div className="absolute left-0 top-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-xl font-bold text-white">2</span>
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
                        <h3 className="text-xl font-bold text-gray-900">Three-Month Commitment</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">PHASE 2</span>
                      </div>
                      <p className="text-sm text-gray-600">3-month unlimited with ₹10,000 milestone discount</p>
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
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">3-Month Unlimited Membership</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Upon qualifying through Milestone 1, members upgrade to a 3-month unlimited membership with their earned ₹10,000 discount applied.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-indigo-300 shadow-sm">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Mumbai</div>
                        <div className="space-y-1 mb-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-gray-500">Standard:</span>
                            <span className="text-sm text-gray-700">₹53,250</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-green-600">Discount:</span>
                            <span className="text-sm text-green-600 font-semibold">- ₹10,000</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-indigo-600">₹43,250</div>
                        <div className="text-xs text-gray-600">Member Rate</div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border-2 border-indigo-300 shadow-sm">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Bengaluru</div>
                        <div className="space-y-1 mb-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-gray-500">Standard:</span>
                            <span className="text-sm text-gray-700">₹41,700</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-green-600">Discount:</span>
                            <span className="text-sm text-green-600 font-semibold">- ₹10,000</span>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-indigo-600">₹31,700</div>
                        <div className="text-xs text-gray-600">Member Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-yellow-700 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-yellow-900 mb-2">Milestone 2: Advanced Consistency</div>
                        <div className="text-xs text-yellow-800 mb-3">
                          <strong>Qualification Criteria:</strong> Complete 4+ classes per week consistently throughout the 3-month period
                        </div>
                        <div className="bg-yellow-600 text-white rounded-lg p-3">
                          <div className="text-xs font-semibold mb-1">Reward</div>
                          <div className="text-base font-bold">6-month unlimited membership for the price of 5 months</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PHASE 3 */}
          <div className="relative">
            <div className="absolute left-0 top-6 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-xl font-bold text-white">3</span>
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
                        <h3 className="text-xl font-bold text-gray-900">Extended Commitment</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">PHASE 3</span>
                      </div>
                      <p className="text-sm text-gray-600">6-month unlimited - pay for only 5 months</p>
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
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">6-Month Unlimited Membership</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Members who achieve Milestone 2 advance to the 6-month unlimited tier, paying for only 5 months of access—a testament to their dedication and consistency.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-lg p-5 shadow-lg">
                        <div className="text-xs font-semibold text-white/90 mb-2">Mumbai</div>
                        <div className="space-y-1 mb-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-white/80">6-Month Standard:</span>
                            <span className="text-sm text-white/90 line-through">₹1,06,500</span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">₹88,750</div>
                        <div className="text-xs text-white/90 font-semibold">Pay for 5 Months Only</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-lg p-5 shadow-lg">
                        <div className="text-xs font-semibold text-white/90 mb-2">Bengaluru</div>
                        <div className="space-y-1 mb-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-white/80">6-Month Standard:</span>
                            <span className="text-sm text-white/90 line-through">₹83,400</span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">₹69,500</div>
                        <div className="text-xs text-white/90 font-semibold">Pay for 5 Months Only</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-5 border-2 border-indigo-200">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-gray-900 mb-2">Established Member Status</div>
                        <p className="text-xs text-gray-700">
                          Members completing this phase become established community members with proven dedication to their wellness journey.
                        </p>
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
        {/* Program Benefits */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Program Benefits</h3>
          <div className="space-y-3">
            {[
              { title: 'Progressive Value', desc: 'Each milestone unlocks greater savings and longer commitment periods' },
              { title: 'Habit Formation', desc: 'Structured attendance goals naturally build sustainable wellness habits' },
              { title: 'Community Integration', desc: 'Regular attendance fosters deeper connections with instructors and members' },
              { title: 'Results-Driven', desc: 'Consistent attendance accelerates transformation and delivers full method benefits' }
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-gray-200">
                <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-gray-900">{benefit.title}</div>
                  <div className="text-xs text-gray-600">{benefit.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member Journey Summary */}
        <div className="bg-gray-900 text-white rounded-xl p-5">
          <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">Member Journey Summary</h3>
          <div className="space-y-3">
            {[
              { phase: '1', membership: '1-Month Unlimited (15% off)', qualification: 'Complete trial class', reward: '3+ classes/week OR 18+ classes → ₹10,000 off' },
              { phase: '2', membership: '3-Month Unlimited (₹10,000 off)', qualification: 'Complete Milestone 1', reward: '4+ classes/week → 6 months for price of 5' },
              { phase: '3', membership: '6-Month Unlimited (1 month free)', qualification: 'Complete Milestone 2', reward: 'Established member status' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold">{item.phase}</span>
                  </div>
                  <div className="text-xs font-bold">{item.membership}</div>
                </div>
                <div className="text-xs text-white/80 mb-1">
                  <strong>Qualification:</strong> {item.qualification}
                </div>
                <div className="text-xs text-white/70">
                  <strong>Reward:</strong> {item.reward}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Implementation Guidelines */}
      <div className="mt-6 bg-indigo-50 rounded-xl p-6 border-2 border-indigo-100">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          Implementation Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Tracking & Communication', text: 'Members receive regular progress updates via email and app notifications, celebrating milestones as they approach qualification' },
            { title: 'Automatic Eligibility', text: 'System automatically flags members who meet milestone criteria, triggering personalized outreach from studio teams' },
            { title: 'Grace Period', text: 'Members have 7 days from qualification notification to claim their milestone reward, ensuring adequate decision time' },
            { title: 'Personal Support', text: 'Front desk teams and instructors receive training to encourage new members and answer progression questions' },
            { title: 'Success Stories', text: 'Highlight members who successfully complete the progression in studio communications, creating aspirational examples' },
            { title: 'Financial Accessibility', text: 'Significant discounts at each stage make long-term wellness commitment more achievable for new members' }
          ].map((guideline, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border border-indigo-200">
              <div className="text-sm font-bold text-indigo-900 mb-2">{guideline.title}</div>
              <div className="text-xs text-gray-700">{guideline.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
