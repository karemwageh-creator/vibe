import React, { useState } from 'react';
import { X, Search, Check, Info, GraduationCap } from 'lucide-react';
import { useLearningStore } from '../../store/learningStore';
import { CURRICULUM_SUBJECTS } from '../../data/curriculum';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile, toggleSubjectCurrentlyStudying } = useLearningStore();

  const [name, setName] = useState(profile.displayName);
  const [academicYear, setAcademicYear] = useState<1 | 2 | 3 | 4>(profile.academicYear);
  const [preferredFormat, setPreferredFormat] = useState(profile.preferredFormat);
  const [accessPreference, setAccessPreference] = useState(profile.accessPreference);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    updateProfile({
      displayName: name.trim() || 'CS Student',
      academicYear,
      preferredFormat,
      accessPreference,
    });
    onClose();
  };

  const filteredSubjects = CURRICULUM_SUBJECTS.filter(s => 
    s.cleanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rawName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.curriculumOrder.toString() === searchQuery.trim()
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-canvas">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-teal-700" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Academic Focus & Profile</h2>
              <p className="text-xs text-gray-500">Configure your university standing and currently studied subjects</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Notice: Academic Year vs Player Level separation */}
          <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg flex items-start space-x-2.5 text-xs text-teal-900">
            <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Independent Academic & Gamification Model:</span> University Academic Year represents your place in your university degree. Your Player Level and XP are earned strictly through completed learning activities and problem sets.
            </div>
          </div>

          {/* Student Name & University Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Learner Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                University Academic Year
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([1, 2, 3, 4] as const).map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setAcademicYear(yr)}
                    className={`py-2 text-sm font-semibold rounded-lg border transition ${
                      academicYear === yr
                        ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Year {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Currently Studying Subjects Selector (Critical for MVP prioritization) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Subjects Currently Studying ({profile.currentlyStudyingSubjectIds.length} Selected)
              </label>
              <span className="text-[11px] text-teal-700 font-medium">
                Prioritizes recommendations in Today
              </span>
            </div>

            {/* Search Filter for 51 subjects */}
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 51 curriculum subjects..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            {/* Scrollable list of subjects */}
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-56 overflow-y-auto bg-gray-50/50">
              {filteredSubjects.map((sub) => {
                const isSelected = profile.currentlyStudyingSubjectIds.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubjectCurrentlyStudying(sub.id)}
                    className={`px-3 py-2 flex items-center justify-between cursor-pointer transition text-xs ${
                      isSelected ? 'bg-teal-50/80 hover:bg-teal-100/60' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <span className="font-mono text-[10px] text-gray-400 w-5 shrink-0">
                        #{sub.curriculumOrder}
                      </span>
                      <div className="truncate">
                        <span className={`font-medium ${isSelected ? 'text-teal-900 font-semibold' : 'text-gray-800'}`}>
                          {sub.cleanName}
                        </span>
                        {sub.cleanName.toLowerCase() !== sub.rawName.toLowerCase() && (
                          <span className="text-[10px] text-gray-400 ml-1.5 italic">
                            ({sub.rawName})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {sub.hasCuratedResources && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                          Curated
                        </span>
                      )}
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        isSelected 
                          ? 'bg-teal-700 border-teal-700 text-white' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Select the subjects you are taking in your current term. These receive top priority in your daily learning recommendations.
            </p>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Preferred Learning Format
              </label>
              <select
                value={preferredFormat}
                onChange={(e) => setPreferredFormat(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
              >
                <option value="all">Balanced (Courses + Reference Books)</option>
                <option value="video_course">Video Lecture & Assignment Focused</option>
                <option value="book">Deep Textbook & Reading Focused</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Cost & Access Filter
              </label>
              <select
                value={accessPreference}
                onChange={(e) => setAccessPreference(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
              >
                <option value="all">Show All Verified Resources (Free & Academic Books)</option>
                <option value="free_only">Free / Open-Access Only</option>
              </select>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-canvas flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Changes saved to browser storage
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition"
            >
              Save Focus & Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
