import React, { useState } from 'react';
import { 
  Award, 
  Flame, 
  Download, 
  Upload, 
  RotateCcw, 
  Footprints, 
  Code2, 
  FlaskConical, 
  Rocket, 
  Compass
} from 'lucide-react';
import { useLearningStore } from '../../store/learningStore';

export const ProgressProfileView: React.FC = () => {
  const {
    profile,
    xpLedger,
    totalXp,
    playerProgression,
    achievements,
    resetAllData,
    exportDataJson,
    importDataJson
  } = useLearningStore();

  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evolve_cs_progress_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setStatusMessage('Progress JSON downloaded successfully.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importDataJson(importJsonText);
    if (success) {
      setStatusMessage('Progress data restored successfully!');
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      setStatusMessage('Invalid JSON format. Please verify and try again.');
    }
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress, XP ledger, and achievements to default fresh state?')) {
      resetAllData();
      setStatusMessage('All progress reset to clean state.');
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const getAchievementIcon = (name: string) => {
    switch (name) {
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Learner Profile & Verifiable Progression
        </h1>
        <p className="text-xs text-gray-500">
          Independent player gamification model, immutable XP ledger, and data backup controls
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 text-xs rounded-lg animate-in fade-in">
          {statusMessage}
        </div>
      )}

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Player Level */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Player Standing
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded">
              Independent of Univ. Year
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-gray-900">
              Level {playerProgression.level}: {playerProgression.levelTitle}
            </div>
            <p className="text-xs text-gray-500">
              {totalXp} Total Verified XP Earned
            </p>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-teal-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${playerProgression.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 font-mono">
              <span>{playerProgression.currentLevelMinXp} XP</span>
              <span>{playerProgression.progressPercent}% to Lvl {playerProgression.level + 1}</span>
              <span>{playerProgression.nextLevelTargetXp} XP</span>
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Study Streak
            </span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-gray-900 flex items-center space-x-2">
              <span>{profile.streakDays} Day{profile.streakDays > 1 ? 's' : ''}</span>
            </div>
            <p className="text-xs text-gray-500">
              Last study session logged on {profile.lastActiveDate}
            </p>
          </div>

          <p className="text-[11px] text-gray-500 pt-2 leading-relaxed">
            Streaks measure consistency. If a streak resets due to busy schedules, your completed activities and earned XP remain intact permanently.
          </p>
        </div>

        {/* University Academic Status */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              University Degree Standing
            </span>
            <span className="text-xs text-gray-400 font-mono">Curriculum Base</span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-gray-900">
              Year {profile.academicYear} Undergraduate
            </div>
            <p className="text-xs text-gray-500">
              {profile.currentlyStudyingSubjectIds.length} Subjects Currently Studying
            </p>
          </div>

          <p className="text-[11px] text-gray-500 pt-2 leading-relaxed">
            Your university year guides subject selection and MVP prioritization while official year/semester mappings are unassigned.
          </p>
        </div>

      </div>

      {/* Verified Achievements */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <Award className="w-4 h-4 text-teal-800" />
          <span>Verified Achievements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = !!ach.unlockedAt;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border transition flex items-start space-x-3 ${
                  isUnlocked
                    ? 'bg-white border-teal-200 shadow-xs'
                    : 'bg-gray-50/70 border-gray-200 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  isUnlocked ? 'bg-teal-100 text-teal-800' : 'bg-gray-200 text-gray-500'
                }`}>
                  {getAchievementIcon(ach.iconName)}
                </div>

                <div className="space-y-1">
                  <h4 className={`text-xs font-bold ${isUnlocked ? 'text-gray-900' : 'text-gray-600'}`}>
                    {ach.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    {ach.description}
                  </p>
                  {isUnlocked && (
                    <span className="inline-block text-[10px] text-teal-700 font-mono font-medium pt-0.5">
                      ✓ Unlocked {new Date(ach.unlockedAt || '').toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Immutable XP Ledger (Auditable Activity History) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden space-y-3">
        
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Immutable XP Ledger & Activity History
            </h3>
            <p className="text-xs text-gray-500">
              Authoritative, append-only record preventing duplicate credit
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
            {xpLedger.length} Record{xpLedger.length === 1 ? '' : 's'}
          </span>
        </div>

        {xpLedger.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No completed activities recorded yet. Complete lessons, problem sets, or checkpoints to earn verifiable XP!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 font-medium">
                <tr>
                  <th className="py-2.5 px-6">Timestamp</th>
                  <th className="py-2.5 px-4">Subject</th>
                  <th className="py-2.5 px-4">Activity Name</th>
                  <th className="py-2.5 px-4">Activity Kind</th>
                  <th className="py-2.5 px-6 text-right">XP Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {xpLedger.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-6 font-mono text-[11px] text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-gray-900">
                      {event.subjectName}
                    </td>
                    <td className="py-2.5 px-4 text-gray-700">
                      {event.activityTitle}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded capitalize">
                        {event.kind.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-6 text-right font-bold text-teal-800 font-mono">
                      +{event.xpAwarded} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Data Backup & Integrity Controls */}
      <div className="bg-canvas border border-gray-200 rounded-xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Data Portability & Integrity Tools
          </h3>
          <p className="text-xs text-gray-500">
            Export or restore your profile, verified activity progress, and XP ledger
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-gray-800 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-xs transition"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>Export Progress JSON</span>
          </button>

          <button
            onClick={() => setShowImportBox(!showImportBox)}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-gray-800 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-xs transition"
          >
            <Upload className="w-4 h-4 text-gray-500" />
            <span>Import Backup JSON</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-rose-800 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg shadow-xs transition ml-auto"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset Demo State</span>
          </button>
        </div>

        {/* Import JSON Box */}
        {showImportBox && (
          <div className="p-4 bg-white border border-gray-300 rounded-lg space-y-3 animate-in fade-in">
            <span className="text-xs font-semibold text-gray-800 block">
              Paste Exported Progress JSON:
            </span>
            <textarea
              rows={5}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='Paste JSON containing {"profile": ..., "progress": ..., "xpLedger": ...}'
              className="w-full p-2.5 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImportBox(false)}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg"
              >
                Restore Data
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
