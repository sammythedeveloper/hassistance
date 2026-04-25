// src/components/TelemetryInput.tsx
"use client";
import { useContext, useState } from "react";
import { ConfigContext } from "@/context/ConfigContext";

export function TelemetryInput() {
  const { config, setConfig } = useContext(ConfigContext);
  const [hours, setHours] = useState(config.hoursCoded || 0);
  const [stack, setStack] = useState(config.stack || "Frontend");

  const handleUpdate = () => {
    setConfig({ ...config, hoursCoded: hours, stack });
  };

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
      <h2 className="text-white text-lg">Initialize Metrics</h2>
      <input 
        type="number" 
        value={hours} 
        onChange={(e) => setHours(Number(e.target.value))}
        className="w-full p-2 bg-black text-white border border-zinc-700"
        placeholder="Hours Coded"
      />
      <select value={stack} onChange={(e) => setStack(e.target.value)} className="w-full p-2 bg-black text-white border border-zinc-700">
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="DevOps">DevOps</option>
      </select>
      <button onClick={handleUpdate} className="w-full p-2 bg-emerald-600 text-white rounded">
        Set Context
      </button>
    </div>
  );
}