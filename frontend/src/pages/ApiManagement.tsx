import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCloudApis, createCloudApi, updateCloudApi, deleteCloudApi, importApis } from '../services/cloudApi';

interface CloudApi {
  id: number;
  attributes: {
    name: string;
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    parameters: string;
  };
}

const ApiManagement: React.FC = () => {
  const { platformId } = useParams<{ platformId: string }>();
  const [apis, setApis] = useState<CloudApi[]>([]);
  const [newApi, setNewApi] = useState({ name: '', endpoint: '', method: 'GET', parameters: '' });
  const [editingApi, setEditingApi] = useState<CloudApi | null>(null);
  const [importSpecification, setImportSpecification] = useState('');

  useEffect(() => {
    if (platformId) {
      fetchApis(parseInt(platformId));
    }
  }, [platformId]);

  const fetchApis = async (platformId: number) => {
    try {
      const response = await getCloudApis(platformId);
      setApis(response.data);
    } catch (error) {
      console.error('Error fetching cloud APIs:', error);
    }
  };

  const handleCreateApi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCloudApi({ ...newApi, cloudPlatform: platformId });
      setNewApi({ name: '', endpoint: '', method: 'GET', parameters: '' });
      fetchApis(parseInt(platformId!));
    } catch (error) {
      console.error('Error creating cloud API:', error);
    }
  };

  const handleUpdateApi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApi) return;
    try {
      await updateCloudApi(editingApi.id, editingApi.attributes);
      setEditingApi(null);
      fetchApis(parseInt(platformId!));
    } catch (error) {
      console.error('Error updating cloud API:', error);
    }
  };

  const handleDeleteApi = async (id: number) => {
    try {
      await deleteCloudApi(id);
      fetchApis(parseInt(platformId!));
    } catch (error) {
      console.error('Error deleting cloud API:', error);
    }
  };

  const handleImportApis = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await importApis(parseInt(platformId!), importSpecification);
      setImportSpecification('');
      fetchApis(parseInt(platformId!));
    } catch (error) {
      console.error('Error importing APIs:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">API Management</h1>
      
      {/* Create new API form */}
      <form onSubmit={handleCreateApi} className="space-y-4">
        <input
          type="text"
          placeholder="API Name"
          value={newApi.name}
          onChange={(e) => setNewApi({ ...newApi, name: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="API Endpoint"
          value={newApi.endpoint}
          onChange={(e) => setNewApi({ ...newApi, endpoint: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={newApi.method}
          onChange={(e) => setNewApi({ ...newApi, method: e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE' })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <textarea
          placeholder="Parameters (JSON)"
          value={newApi.parameters}
          onChange={(e) => setNewApi({ ...newApi, parameters: e.target.value })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add API
        </button>
      </form>

      {/* Import APIs form */}
      <form onSubmit={handleImportApis} className="space-y-4">
        <textarea
          placeholder="API Specification (OpenAPI/Swagger)"
          value={importSpecification}
          onChange={(e) => setImportSpecification(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Import APIs
        </button>
      </form>

      {/* List of APIs */}
      <div className="space-y-4">
        {apis.map((api) => (
          <div key={api.id} className="border p-4 rounded-md">
            <h3 className="text-lg font-medium">{api.attributes.name}</h3>
            <p>Endpoint: {api.attributes.endpoint}</p>
            <p>Method: {api.attributes.method}</p>
            <p>Parameters: {api.attributes.parameters}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => setEditingApi(api)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button onClick={() => handleDeleteApi(api.id)} className="text-red-600 hover:text-red-900">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit API form */}
      {editingApi && (
        <form onSubmit={handleUpdateApi} className="space-y-4">
          <input
            type="text"
            value={editingApi.attributes.name}
            onChange={(e) => setEditingApi({ ...editingApi, attributes: { ...editingApi.attributes, name: e.target.value } })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            value={editingApi.attributes.endpoint}
            onChange={(e) => setEditingApi({ ...editingApi, attributes: { ...editingApi.attributes, endpoint: e.target.value } })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={editingApi.attributes.method}
            onChange={(e) => setEditingApi({ ...editingApi, attributes: { ...editingApi.attributes, method: e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE' } })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <textarea
            value={editingApi.attributes.parameters}
            onChange={(e) => setEditingApi({ ...editingApi, attributes: { ...editingApi.attributes, parameters: e.target.value } })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update API
          </button>
        </form>
      )}
    </div>
  );
};

export default ApiManagement;