"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, Key } from "lucide-react";
import { toast } from "sonner";

type Props = {};

const SettingsClient = (props: Props) => {
  const [showKeys, setShowKeys] = useState({
    serper: false,
    rapidapi: false,
    gemini: false,
  });

  const [keys, setKeys] = useState({
    serper: "",
    rapidapi: "",
    gemini: "",
  });

  const [loading, setLoading] = useState(false);

  const toggleShowKey = (key: "serper" | "rapidapi" | "gemini") => {
    setShowKeys({
      ...showKeys,
      [key]: !showKeys[key],
    });
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      // Save logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your API keys and preferences
        </p>
      </div>

      {/* API Keys Card */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-500" />
            API Keys
          </CardTitle>
          <CardDescription>
            Configure your API keys for external services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serper">Serper API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="serper"
                  type={showKeys.serper ? "text" : "password"}
                  value={keys.serper}
                  onChange={(e) => setKeys({ ...keys, serper: e.target.value })}
                  placeholder="Enter your Serper API key"
                  className="focus-visible:ring-indigo-500"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey("serper")}
                className="hover:border-indigo-500 hover:text-indigo-500"
              >
                {showKeys.serper ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your key from{" "}
              <a
                href="https://serper.dev"
                target="_blank"
                className="text-indigo-500 hover:text-indigo-600 hover:underline"
              >
                serper.dev
              </a>
            </p>
          </div>
          {/* RapidAPI Key */}
          <div className="space-y-2 py-4">
            <Label htmlFor="rapidapi">RapidAPI Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="rapidapi"
                  type={showKeys.rapidapi ? "text" : "password"}
                  value={keys.rapidapi}
                  onChange={(e) =>
                    setKeys({ ...keys, rapidapi: e.target.value })
                  }
                  placeholder="Enter your RapidAPI key"
                  className="focus-visible:ring-indigo-500"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey("rapidapi")}
                className="hover:border-indigo-500 hover:text-indigo-500"
              >
                {showKeys.rapidapi ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your key from{" "}
              <a
                href="https://rapidapi.com"
                target="_blank"
                className="text-indigo-500 hover:text-indigo-600 hover:underline"
              >
                rapidapi.com
              </a>
            </p>
          </div>
          {/* Gemini API Key */}
          <div className="space-y-2">
            <Label htmlFor="gemini">Gemini Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="gemini"
                  type={showKeys.gemini ? "text" : "password"}
                  value={keys.gemini}
                  onChange={(e) => setKeys({ ...keys, gemini: e.target.value })}
                  placeholder="Enter your Gemini key"
                  className="focus-visible:ring-indigo-500"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey("gemini")}
                className="hover:border-indigo-500 hover:text-indigo-500"
              >
                {showKeys.gemini ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your key from{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                className="text-indigo-500 hover:text-indigo-600 hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 mt-4 text-white cursor-pointer">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsClient;
