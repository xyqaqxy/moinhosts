import React, { useState, useEffect } from 'react';
import { getCloudPlatforms } from '../services/cloudPlatform';
import { getCloudApis } from '../services/cloudApi';
import { callUnifiedApi } from '../services/unifiedApi';

interface CloudPlatform {
  id: number;
  attributes: {
    name: string;
  };
}

interface CloudApi {
  id: number;
  attributes: {
    name: string;
    parameters: string;
  };
}

const UnifiedApiInterface: React.FC = () => {
  const [platforms, setPlatforms] = useState<CloudPlatform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);
  const [apis, setApis] = useState<CloudApi[]>([]);
  const [selectedApi, setSelectedApi] = useState<number | null>(null);
  const [params, setParams] = useState<string>('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    fetchPlatforms();
  }, []);

  useEffect(() => {
    if (selectedPlatform) {
      fetchApis(selectedPlatform);
    }
  }, [selectedPlatform]);

  const fetchPlatforms = async () => {
    try {
      const response = await getCloudPlatforms();
      setPlatforms(response.data);
    } catch (error) {
      console.error('Error fetching cloud platforms:', error);
    }
  };

  const fetchApis = async (platformId: number) => {
    try {
      const response = await getCloudApis(platformId);
      setApis(response.data);
    } catch (error) {
      console.error('Error fetching cloud APIs:', error);
    }
  };

  const handleApiCall = async () => {
    if (!selectedPlatform || !selectedApi) {
      alert('Please select a platform and an API');
      return;
    }

    try {
      const response = await callUnifiedApi(selectedPlatform, selectedApi, JSON.parse(params));
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error calling unified API:', error);
      setResult('Error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Unified API Interface</h1>
      
      <div className="space-y-4">
        <select
          value={selectedPlatform || ''}
          onChange={(e) => setSelectedPlatform(Number(e.target.value))}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>{platform.attributes.name}</option>
          ))}
        </select>

        <select
          value={selectedApi || ''}
          onChange={(e) => setSelectedApi(Number(e.target.value))}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select an API</option>
          {apis.map((api) => (
            <option key={api.id} value={api.id}>{api.attributes.name}</option>
          ))}
        </select>

        <textarea
          placeholder="Parameters (JSON)"
          value={params}
          onChange={(e) => setParams(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={5}
        />

        <button
          onClick={handleApiCall}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Call API
        </button>

        {result && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-900">Result:</h2>
            <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedApiInterface;