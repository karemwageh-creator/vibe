import React, { useState } from 'react';
import { 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { Resource, ResourceRole } from '../../types';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const [expanded, setExpanded] = useState(false);

  // Role Badge Styling and Labels
  const getRoleBadge = (role: ResourceRole) => {
    switch (role) {
      case 'primary_balanced':
        return {
          label: 'Primary Recommendation — Balanced Core (Theory + Practice)',
          bg: 'bg-teal-50 border-teal-300 text-teal-900',
          dot: 'bg-teal-600'
        };
      case 'theory_focused':
        return {
          label: 'Theory-Focused (Conceptual Depth)',
          bg: 'bg-blue-50 border-blue-200 text-blue-900',
          dot: 'bg-blue-500'
        };
      case 'practice_focused':
        return {
          label: 'Practice-Focused (Labs & Problem Sets)',
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          dot: 'bg-emerald-600'
        };
      case 'deepening_advanced':
        return {
          label: 'Stage 2 Deepening / Advanced Specialization',
          bg: 'bg-purple-50 border-purple-200 text-purple-900',
          dot: 'bg-purple-600'
        };
      case 'project_extension':
        return {
          label: 'Applied Project Path',
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          dot: 'bg-amber-600'
        };
      case 'alternative':
        return {
          label: 'Balanced Alternative (Alternative Style/Language)',
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-900',
          dot: 'bg-indigo-600'
        };
      case 'book_companion':
        return {
          label: 'Authoritative Book Companion',
          bg: 'bg-stone-100 border-stone-300 text-stone-900',
          dot: 'bg-stone-600'
        };
    }
  };

  const roleMeta = getRoleBadge(resource.role);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:border-gray-300 transition-all">
      
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Role Badge */}
        <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${roleMeta.bg}`}>
          <span className={`w-2 h-2 rounded-full ${roleMeta.dot}`} />
          <span>{roleMeta.label}</span>
        </div>

        {/* Verification Status */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">Verified {resource.verifiedDate}</span>
          </div>
          <span className="px-1.5 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-700 rounded capitalize">
            {resource.accessTerms.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Title & Creator */}
      <div className="mb-2">
        <h4 className="text-base font-bold text-gray-900 tracking-tight flex items-center justify-between">
          <span>{resource.title}</span>
        </h4>
        <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-600 mt-0.5">
          <span className="font-semibold text-gray-800">{resource.instructorOrAuthor}</span>
          <span>•</span>
          <span>{resource.provider}</span>
          {resource.platform && resource.platform !== resource.provider && (
            <>
              <span>•</span>
              <span className="text-gray-500">Platform: {resource.platform}</span>
            </>
          )}
          {resource.publisher && (
            <>
              <span>•</span>
              <span className="text-gray-500">Publisher: {resource.publisher} ({resource.publicationYear || 'Academic'})</span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-700 leading-relaxed mb-3">
        {resource.description}
      </p>

      {/* Format & Access note */}
      <div className="p-2.5 bg-canvas border border-gray-100 rounded-lg text-xs space-y-1 mb-3">
        <div className="flex items-center justify-between text-gray-600">
          <span className="font-medium">Structure & Format:</span>
          <span className="text-gray-800 font-mono text-[11px]">{resource.format}</span>
        </div>
        <div className="text-gray-600">
          <span className="font-medium">Access Terms: </span>
          <span>{resource.accessCostNote}</span>
        </div>
        {resource.assignedChapters && (
          <div className="text-teal-900 font-medium text-[11px] pt-0.5">
            Target Chapters: {resource.assignedChapters}
          </div>
        )}
      </div>

      {/* Transparent Match Reason (Section 7 rule) */}
      <div className="bg-teal-50/50 border border-teal-100 rounded-lg p-3 text-xs mb-3 space-y-1.5">
        <div className="font-semibold text-teal-950 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-700" />
          <span>Why This Resource Is Recommended:</span>
        </div>
        <p className="text-teal-900 leading-relaxed text-[11px]">
          {resource.whyRecommended}
        </p>

        {/* Theory & Practice Assessments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-teal-100/70 text-[11px]">
          <div>
            <span className="font-semibold text-gray-800 block">Theory Evaluation:</span>
            <span className="text-gray-600">{resource.theoryRatingNote}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-800 block">Practice Evaluation:</span>
            <span className="text-gray-600">{resource.practiceRatingNote}</span>
          </div>
        </div>
      </div>

      {/* Toggle Expandable Details: Covered Topics, Known Gaps & Evidence Citations */}
      {expanded && (
        <div className="pt-3 border-t border-gray-200 space-y-3 text-xs animate-in fade-in duration-150">
          
          {/* Covered Topics */}
          <div>
            <span className="font-semibold text-gray-900 block mb-1.5 text-[11px] uppercase tracking-wider">
              Covered Core Topics & Outcomes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {resource.coveredTopics.map((topic, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-[11px] rounded border border-gray-200">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Known Gaps (Transparent Curation requirement) */}
          {resource.knownGaps.length > 0 && (
            <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg">
              <span className="font-semibold text-stone-900 flex items-center space-x-1 mb-1 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-stone-600" />
                <span>Known Scope Limitations / What Is Not Covered:</span>
              </span>
              <ul className="list-disc list-inside text-stone-700 text-[11px] space-y-0.5">
                {resource.knownGaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Evidence Sources & Citations */}
          <div>
            <span className="font-semibold text-gray-900 block mb-1 text-[11px] uppercase tracking-wider">
              Curriculum Discovery & Verification Evidence:
            </span>
            <div className="space-y-1">
              {resource.evidenceSources.map((ev, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] text-gray-600 bg-canvas px-2.5 py-1 rounded border border-gray-100">
                  <span>
                    <strong className="text-gray-800">{ev.name}:</strong> {ev.note || 'Independent curriculum inclusion'}
                  </span>
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 hover:text-teal-900 inline-flex items-center space-x-0.5 ml-2 font-medium"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {resource.prerequisites && (
            <div className="text-[11px] text-gray-600">
              <span className="font-semibold text-gray-800">Target Prerequisite: </span>
              {resource.prerequisites}
            </div>
          )}

        </div>
      )}

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition"
        >
          <span>{expanded ? 'Hide Details & Gaps' : 'View Syllabus Coverage & Evidence'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <a
          href={resource.officialUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition"
        >
          <span>Open Official Page</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
