import { useState } from "react";

export default function SchemeCard({ scheme }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-zinc-800 text-white rounded-md p-4 shadow mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{scheme.name}</h3>
        <button onClick={() => setOpen(!open)} className="text-purple-400">
          {open ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {open && (
        <div className="mt-3 space-y-2">
          <div><strong>Eligibility:</strong> {scheme.eligibility}</div>
          <div><strong>Benefits:</strong> {scheme.benefits}</div>
          <div><strong>How to Apply:</strong> {scheme.applicationProcess}</div>
        </div>
      )}
    </div>
  );
}
