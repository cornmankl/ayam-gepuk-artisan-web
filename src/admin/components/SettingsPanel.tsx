import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  // Update form data when settings change
  React.useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Update settings
    updateSettings(formData);

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Site Name
                </label>
                <Input
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Email
                </label>
                <Input
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter contact email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Phone
                </label>
                <Input
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="Enter contact phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Business Hours
              </label>
              <Input
                name="businessHours"
                value={formData.businessHours}
                onChange={handleChange}
                placeholder="Enter business hours"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Title
              </label>
              <Input
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="Enter meta title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Meta Description
              </label>
              <Textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="Enter meta description"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        primaryColor: e.target.value,
                      }))
                    }
                    className="w-10 h-10 border-0 rounded cursor-pointer"
                  />
                  <Input
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    placeholder="Enter color code"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        secondaryColor: e.target.value,
                      }))
                    }
                    className="w-10 h-10 border-0 rounded cursor-pointer"
                  />
                  <Input
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    placeholder="Enter color code"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Accent Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    name="accentColor"
                    value={formData.accentColor}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        accentColor: e.target.value,
                      }))
                    }
                    className="w-10 h-10 border-0 rounded cursor-pointer"
                  />
                  <Input
                    name="accentColor"
                    value={formData.accentColor}
                    onChange={handleChange}
                    placeholder="Enter color code"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Facebook URL
                </label>
                <Input
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  placeholder="Enter Facebook URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Instagram URL
                </label>
                <Input
                  name="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                  placeholder="Enter Instagram URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Twitter URL
                </label>
                <Input
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  placeholder="Enter Twitter URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  WhatsApp Number
                </label>
                <Input
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Enter WhatsApp number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Special Offers
              </label>
              <Textarea
                name="specialOffers"
                value={formData.specialOffers}
                onChange={handleChange}
                placeholder="Enter current special offers"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SettingsPanel;
