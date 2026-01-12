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
import { set } from "zod";

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

  const toggleShowKey = async () => {
    // TODO: Save to backend or environment
    setLoading(true);

    // Simulate save
    setShowKeys({
      ...showKeys,
      serper: !showKeys.serper,
    });

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Manage your API keys and preferences
      </p>

      {/* API Keys Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
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
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey()}
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
                className="text-blue-600 hover:underline"
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
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey()}
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
                className="text-blue-600 hover:underline"
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
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => toggleShowKey()}
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
                href="https://gemini.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                gemini.com
              </a>
            </p>
          </div>

          {/* Save Button */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsClient;
