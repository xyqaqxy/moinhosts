import React, { useState, useEffect } from 'react';
import { getCloudPlatforms, createCloudPlatform, updateCloudPlatform, deleteCloudPlatform } from '../services/cloudPlatform';

interface CloudPlatform {
  id: number;
  attributes: {
    name: string;
    apiEndpoint: string;
    status: 'active' | 'inactive';
  };
}

const Clouds: React.FC = () => {
  const [platforms, setPlatforms] = useState<CloudPlatform[]>([]);
  const [newPlatform, setNewPlatform] = useState({ name: '', apiEndpoint: '', apiKey: '' });
  const [editingPlatform, setEditingPlatform] = useState<CloudPlatform | null>(null);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const response = await getCloudPlatforms();
      setPlatforms(response.data);
    } catch (error) {
      console.error('Error fetching cloud platforms:', error);
    }
  };

  const handleCreatePlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCloudPlatform(newPlatform);
      setNewPlatform({ name: '', apiEndpoint: '', apiKey: '' });
      fetchPlatforms();
    } catch (error) {
      console.error('Error creating cloud platform:', error);
    }
  };

  const handleUpdatePlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlatform) return;
    try {
      await updateCloudPlatform(editingPlatform.id, editingPlatform.attributes);
      setEditingPlatform(null);
      fetchPlatforms();
    } catch (error) {
      console.error('Error updating cloud platform:', error);
    }
  };

  const handleDeletePlatform = async (id: number) => {
    try {
      await deleteCloudPlatform(id);
      fetchPlatforms();
    } catch (error) {
      console.error('Error deleting cloud platform:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Cloud Platforms</h1>
      
      {/* Create new platform form */}
      <form onSubmit={handleCreatePlatform} className="space-y-4">
        <input
          type="text"
          placeholder="Platform Name"
          value={newPlatform.name}
          onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="API Endpoint"
          value={newPlatform.apiEndpoint}
          onChange={(e) => setNewPlatform({ ...newPlatform, apiEndpoint: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder="API Key"
          value={newPlatform.apiKey}
          onChange={(e) => setNewPlatform({ ...newPlatform, apiKey: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Platform
        </button>
      </form>

      {/* List of platforms */}
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="border p-4 rounded-md">
            <h3 className="text-lg font-medium">{platform.attributes.name}</h3>
            <p>API Endpoint: {platform.attributes.apiEndpoint}</p>
            <p>Status: {platform.attributes.status}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => setEditingPlatform(platform)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button onClick={() => handleDeletePlatform(platform.id)} className="text-red-600 hover:text-red-900">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit platform form */}
      {editingPlatform && (
        <form onSubmit={handleUpdatePlatform} className="space-y-4">
          <input
            type="text"
            value={editingPlatform.attributes.name}
            onChange={(e) => setEditingPlatform({ ...editingPlatform, attributes: { ...editingPlatform.attributes, name: e.target.value } })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            value={editingPlatform.attributes.apiEndpoint}
            onChange={(e) => setEditingPlatform({ ...editingPlatform, attributes: { ...editingPlatform.attributes, apiEndpoint: e.target.value } })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update Platform
          </button>
        </form>
      )}
    </div>
  );
};

export default Clouds;