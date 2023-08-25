import React, { useState, useEffect } from "react";
import "./Settings.scss";
import HomeButton from "../../components/shared/HomeButton";
import { useSettings } from "../../hooks/useSettings";

const Settings = ({ settings, updateSettings }) => {
  const [stats, setStats] = useState(false);

  useEffect(() => {
    setStats(settings.stats);
  }, [settings.stats]);

  return (
    <>
      <div className="settings-wrapper">
        <div className="settings-container">
          <h1 className="title">Settings</h1>
          <div className="stats-wrap">
            <p>FPS Stats: </p>
            <button
              className={stats ? "stats-button active" : "stats-button"}
              onClick={() => {
                updateSettings({ ...settings, stats: true });
                setStats(true);
              }}
            >
              On
            </button>
            <button
              className={!stats ? "stats-button active" : "stats-button"}
              onClick={() => {
                updateSettings({ ...settings, stats: false });
                setStats(false);
              }}
            >
              Off
            </button>
          </div>
        </div>
      </div>

      <HomeButton />
    </>
  );
};

export default Settings;
