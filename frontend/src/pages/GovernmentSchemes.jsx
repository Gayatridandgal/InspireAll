import { useState } from "react";
import SchemeSearchForm from "../components/SchemeSearchForm";
import SchemeCard from "../components/SchemeCard";

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState([]);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Government Schemes</h1>
      <p className="text-center mb-8 text-zinc-400">
        Discover financial support and business growth opportunities tailored for you.
      </p>
      <SchemeSearchForm onResults={setSchemes} />
      <div className="mt-10">
        {schemes.length > 0 ? (
          schemes.map((s, i) => <SchemeCard key={i} scheme={s} />)
        ) : (
          <p className="text-zinc-500 text-center mt-10">No schemes found.</p>
        )}
      </div>
    </div>
  );
}
