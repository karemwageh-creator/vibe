import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Info
} from 'lucide-react';
import { CURRICULUM_SUBJECTS } from '../../data/curriculum';
import { useLearningStore } from '../../store/learningStore';

interface CurriculumViewProps {
  onSelectSubject: (subjectId: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onSelectSubject }) => {
  const { profile, toggleSubjectCurrentlyStudying, getSubjectProgress } = useLearningStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'studying' | 'curated' | 'foundations' | 'systems' | 'software_eng' | 'applied_ai'>('all');

  // Filter subjects preserving original 1-51 order
  const filteredSubjects = CURRICULUM_SUBJECTS.filter((sub) => {
    // Search query match
    const matchesSearch = 
      sub.cleanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.rawName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.curriculumOrder.toString() === searchQuery.trim() ||
      sub.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Filter pill match
    if (activeFilter === 'studying') {
      return profile.currentlyStudyingSubjectIds.includes(sub.id);
    }
    if (activeFilter === 'curated') {
      return sub.hasCuratedResources;
    }
    if (activeFilter === 'foundations') {
      return sub.category === 'foundations' || sub.category === 'theory';
    }
    if (activeFilter === 'systems') {
      return sub.category === 'systems';
    }
    if (activeFilter === 'software_eng') {
      return sub.category === 'software_eng';
    }
    if (activeFilter === 'applied_ai') {
      return sub.category === 'applied_ai' || sub.category === 'specialized';
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Authoritative Catalog Notice */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Predefined CS Curriculum Catalog
            </h1>
            <p className="text-xs text-gray-500">
              All 51 authoritative subjects in exact preserved curriculum order (1 to 51)
            </p>
          </div>
          <span className="text-xs font-mono text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
            Showing {filteredSubjects.length} of 51 subjects
          </span>
        </div>

        {/* Note on Unassigned Semester Mapping */}
        <div className="p-3 bg-canvas border border-gray-200 rounded-lg flex items-start space-x-2 text-xs text-gray-600">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <span>
            <strong>Unassigned Semester Mapping:</strong> As specified by the curriculum authority, official year/semester assignments have not been supplied. Subjects are presented in canonical sequence without synthetic 4-year groupings. Mark subjects as <em>"Currently Studying"</em> to set your active term focus.
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-3">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject name, source title, topic (e.g. 'Operating systems', 'C++', 'B+ Tree'), or # number..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeFilter === 'all'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All 51 Subjects
          </button>

          <button
            onClick={() => setActiveFilter('studying')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1 ${
              activeFilter === 'studying'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Currently Studying ({profile.currentlyStudyingSubjectIds.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('curated')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1 ${
              activeFilter === 'curated'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Curated Resources Ready</span>
          </button>

          <button
            onClick={() => setActiveFilter('foundations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeFilter === 'foundations'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Foundations & Math
          </button>

          <button
            onClick={() => setActiveFilter('systems')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeFilter === 'systems'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Computer Systems
          </button>

          <button
            onClick={() => setActiveFilter('software_eng')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeFilter === 'software_eng'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Software Engineering
          </button>

          <button
            onClick={() => setActiveFilter('applied_ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeFilter === 'applied_ai'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Applied AI & Specialized
          </button>
        </div>

      </div>

      {/* 51-Subject List in Exact Preserved Order */}
      <div className="space-y-3">
        {filteredSubjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-xs text-gray-500">
            No subjects match your current search and filter criteria.
          </div>
        ) : (
          filteredSubjects.map((subject) => {
            const isStudying = profile.currentlyStudyingSubjectIds.includes(subject.id);
            const subProg = getSubjectProgress(subject.id);

            return (
              <div
                key={subject.id}
                className={`bg-white rounded-xl border p-4 sm:p-5 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isStudying 
                    ? 'border-teal-300 ring-1 ring-teal-200/50 shadow-xs' 
                    : 'border-gray-200 hover:border-gray-300 shadow-2xs'
                }`}
              >
                
                {/* Left: Position Number, Titles & Badges */}
                <div className="space-y-1.5 max-w-2xl">
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                      #{subject.curriculumOrder}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-50 text-gray-600 border border-gray-200 rounded capitalize">
                      {subject.category.replace('_', ' ')}
                    </span>
                    {subject.hasCuratedResources ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Curated</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded">
                        Pending Curation
                      </span>
                    )}

                    {subProg.stage1Complete && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded flex items-center space-x-1">
                        <Check className="w-3 h-3 text-teal-700 stroke-[3]" />
                        <span>Stage 1 Mastered</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline space-x-2">
                    <h3 
                      onClick={() => onSelectSubject(subject.id)}
                      className="text-base font-bold text-gray-900 hover:text-teal-800 cursor-pointer transition tracking-tight"
                    >
                      {subject.cleanName}
                    </h3>

                    {subject.cleanName.toLowerCase() !== subject.rawName.toLowerCase() && (
                      <span className="text-[11px] text-gray-400 font-mono italic">
                        ({subject.rawName})
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {subject.shortDescription}
                  </p>

                  {/* Topics Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {subject.topics.slice(0, 4).map((topic, i) => (
                      <span key={i} className="text-[10px] bg-canvas text-gray-700 px-1.5 py-0.5 rounded border border-gray-100">
                        {topic}
                      </span>
                    ))}
                    {subject.topics.length > 4 && (
                      <span className="text-[10px] text-gray-400 px-1 py-0.5">
                        +{subject.topics.length - 4} more
                      </span>
                    )}
                  </div>

                </div>

                {/* Right: Actions */}
                <div className="shrink-0 flex items-center space-x-2 self-end sm:self-center">
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleSubjectCurrentlyStudying(subject.id)}
                    className={`p-2 rounded-lg border text-xs transition ${
                      isStudying
                        ? 'bg-teal-50 border-teal-300 text-teal-800 hover:bg-teal-100'
                        : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                    title={isStudying ? 'Marked as Currently Studying' : 'Mark as Currently Studying'}
                  >
                    <Bookmark className={`w-4 h-4 ${isStudying ? 'fill-teal-700 text-teal-700' : ''}`} />
                  </button>

                  {/* Open Subject Button */}
                  <button
                    onClick={() => onSelectSubject(subject.id)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition"
                  >
                    <span>Explore Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
