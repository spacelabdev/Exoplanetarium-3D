import React, { useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState({ stats: false });

  const updateSettings = (newSettings) => {
    console.log("Updating settings", newSettings);
    setSettings({ ...newSettings });
  };

  return { settings, updateSettings };
};
