'use client';
import { useState } from 'react';

export default function Home() {
const [CulturalHeritage, setCulturalHeritage] = useState('');
const [EventScale, setEventScale] = useState('');
const [TargetParticipants, setTargetParticipants] = useState('');
const [CommunityValues, setCommunityValues] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cultural_heritage, event_scale, target_participants, community_values }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch(e: any) { setOutput('Error: ' + e.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Cultural Festival Program</h1>
          <p className="text-gray-400 mb-8">Generate festival programs with event schedules.</p>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div><label className="block text-sm text-gray-400 mb-1">Cultural Heritage</label><input value={CulturalHeritage} onChange={e=>setCulturalHeritage(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter cultural heritage..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Event Scale</label><input value={EventScale} onChange={e=>setEventScale(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter event scale..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Target Participants</label><input value={TargetParticipants} onChange={e=>setTargetParticipants(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter target participants..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Community Values</label><input value={CommunityValues} onChange={e=>setCommunityValues(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter community values..." /></div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 transition-opacity"
              style={backgroundColor: 'hsl(145,60%,50%)'}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {output && (
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-200">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}