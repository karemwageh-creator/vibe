import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';
import { Activity } from '../../types';
import { useLearningStore } from '../../store/learningStore';

interface ActivityCompletionModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ActivityCompletionModal: React.FC<ActivityCompletionModalProps> = ({
  activity,
  isOpen,
  onClose
}) => {
  const { progress, completeActivity } = useLearningStore();

  const currentProgress = activity ? progress[activity.id] : null;
  const isAlreadyCompleted = currentProgress?.status === 'completed';

  const [evidenceNote, setEvidenceNote] = useState(currentProgress?.evidenceNote || '');
  const [confirmed, setConfirmed] = useState(isAlreadyCompleted);

  if (!isOpen || !activity) return null;

  const handleComplete = () => {
    completeActivity(activity.id, evidenceNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-lg w-full overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-canvas">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                {isAlreadyCompleted ? 'Activity Verification Record' : 'Complete & Record Activity'}
              </h2>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                {activity.stageLabel}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          <div>
            <h3 className="text-base font-semibold text-gray-900">{activity.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
          </div>

          {/* Reward & Criteria Box */}
          <div className="p-3 bg-teal-50/50 border border-teal-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-teal-950">First-Time Reward Intent:</span>
              <span className="px-2 py-0.5 font-bold bg-teal-700 text-white rounded text-[11px]">
                +{activity.xpReward} XP
              </span>
            </div>
            <div className="text-xs text-gray-700">
              <span className="font-medium text-gray-900">Completion Criteria: </span>
              {activity.completionCriteria}
            </div>
          </div>

          {/* Idempotent Reward Notice */}
          {isAlreadyCompleted ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Already Recorded:</span> This activity was completed on {new Date(currentProgress.completedAt || '').toLocaleDateString()}. Re-submitting will update your solution notes without awarding duplicate XP (strict anti-double-counting policy).
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-gray-500 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Honest Progress: XP is recorded immutably in your player ledger upon genuine completion.</span>
            </div>
          )}

          {/* Deliverable / Notes Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              {activity.deliverablePrompt ? 'Deliverable / Solution Explanation' : 'Study Notes & Evidence'}
            </label>
            {activity.deliverablePrompt && (
              <p className="text-[11px] text-teal-800 bg-teal-50/50 p-2 rounded mb-2 border border-teal-100">
                {activity.deliverablePrompt}
              </p>
            )}
            <textarea
              rows={4}
              value={evidenceNote}
              onChange={(e) => setEvidenceNote(e.target.value)}
              placeholder="Record your solution insights, repository link, benchmark results, or proof steps here..."
              className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 font-mono"
            />
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start space-x-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-teal-700 focus:ring-teal-500"
            />
            <span className="text-xs text-gray-700 select-none">
              I have solved the problem set / passed the checkpoint through genuine effort.
            </span>
          </label>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-canvas flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!confirmed}
            onClick={handleComplete}
            className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>{isAlreadyCompleted ? 'Update Verification Notes' : `Confirm & Earn ${activity.xpReward} XP`}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
