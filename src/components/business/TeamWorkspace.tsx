```typescript
import React, { useState } from 'react';
import { Users, Plus, Settings, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatar: string;
};

type Workspace = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
};

export function TeamWorkspace() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'Business Plan Team',
      description: 'Collaborative workspace for our business plan',
      members: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'owner',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      ],
      createdAt: new Date().toISOString()
    }
  ]);

  const [showNewWorkspace, setShowNewWorkspace] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: ''
  });

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const workspace: Workspace = {
        id: Date.now().toString(),
        name: newWorkspace.name,
        description: newWorkspace.description,
        members: [],
        createdAt: new Date().toISOString()
      };

      setWorkspaces([...workspaces, workspace]);
      setShowNewWorkspace(false);
      setNewWorkspace({ name: '', description: '' });
      toast.success('Workspace created successfully');
    } catch (error) {
      toast.error('Failed to create workspace');
    }
  };

  const handleInviteMember = async (workspaceId: string) => {
    try {
      // TODO: Implement member invitation
      toast.success('Invitation sent successfully');
    } catch (error) {
      toast.error('Failed to send invitation');
    }
  };

  return (
    <div className="space-y-6">
      {/* Workspace List */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Your Workspaces</h3>
        <button
          onClick={() => setShowNewWorkspace(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="h-5 w-5" />
          New Workspace
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">{workspace.name}</h4>
                <p className="text-sm text-gray-600">{workspace.description}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex -space-x-2">
                {workspace.members.map((member) => (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
                <button
                  onClick={() => handleInviteMember(workspace.id)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <UserPlus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {workspace.members.length} members
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Open Workspace
              </button>
              <button
                onClick={() => handleInviteMember(workspace.id)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Invite
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Workspace Modal */}
      {showNewWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Create New Workspace
            </h3>
            <form onSubmit={handleCreateWorkspace} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewWorkspace(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
```