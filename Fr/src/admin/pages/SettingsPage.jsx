// admin/pages/SettingsPage.jsx
import React from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-purple-400">Settings</h1>

      <div className="max-w-2xl">
        <Card>
          <h2 className="text-xl font-semibold mb-6">Platform Settings</h2>
          <div className="space-y-4">
            <Input label="Site Name" defaultValue="MusicStream" />
            <Input label="Support Email" defaultValue="support@musicstream.com" />
            <Input label="Premium Price ($)" defaultValue="1.99" />
            <div className="flex gap-3 pt-4">
              <Button>Save Changes</Button>
              <Button variant="outline">Reset</Button>
            </div>
          </div>
        </Card>

        <Card className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-4">
            These actions are irreversible.
          </p>
          <Button variant="danger">Clear All Cache</Button>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;