'use client'
import React, { useState } from "react";

export default function Home() {
  const [penilaian, setPenilaian] = useState(
    Array.from({ length: 10 }).reduce((acc, _, index) => {
      acc[`mahasiswa_${index + 1}`] = {
        aspek_1: 1,
        aspek_2: 1,
        aspek_3: 1,
        aspek_4: 1,
      };
      return acc;
    }, {})
  );
  const [showResult, setShowResult] = useState(false);

  const handleChange = (mahasiswa, aspek, value) => {
    setPenilaian((prev) => ({
      ...prev,
      [mahasiswa]: {
        ...prev[mahasiswa],
        [aspek]: Number(value),
      },
    }));
  };

  const transformData = () => {
    const formattedData = {
      aspek_penilaian_1: {},
      aspek_penilaian_2: {},
      aspek_penilaian_3: {},
      aspek_penilaian_4: {},
    };

    Object.entries(penilaian).forEach(([mahasiswa, aspek]) => {
      Object.keys(aspek).forEach((key, index) => {
        formattedData[`aspek_penilaian_${index + 1}`][mahasiswa] = aspek[key];
      });
    });

    return formattedData;
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Aspek Penilaian Mahasiswa</h1>
      
      <br/>

      <table className="w-full bg-white">
        <thead>
          <tr className="">
            <th className="py-4"></th>
            <th className="py-4 text-center text-gray-600 text-sm font-medium">Aspek penilaian 1</th>
            <th className="py-4 text-center text-gray-600 text-sm font-medium">Aspek penilaian 2</th>
            <th className="py-4 text-center text-gray-600 text-sm font-medium">Aspek penilaian 3</th>
            <th className="py-4 text-center text-gray-600 text-sm font-medium">Aspek penilaian 4</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => {
            const mahasiswaKey = `mahasiswa_${index + 1}`;
            return (
              <tr key={index} className="border border-gray-200 ">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Mahasiswa {index + 1}</span>
                  </div>
                </td>
                
                {["aspek_1", "aspek_2", "aspek_3", "aspek_4"].map((aspek, aspekIndex) => (
                  <td key={aspekIndex} className="text-center py-2">
                    <div className="relative inline-block w-4/5">
                      <select
                        value={penilaian[mahasiswaKey][aspek]}
                        onChange={(e) => handleChange(mahasiswaKey, aspek, e.target.value)}
                        className="block w-full appearance-none bg-white border border-gray-200 rounded px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        {Array.from({ length: 10 }).map((_, optionIndex) => (
                          <option key={optionIndex} value={optionIndex + 1}>
                            {optionIndex + 1}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex justify-end mt-4">
        <button 
          className="bg-black text-white px-4 py-2 rounded" 
          onClick={() => setShowResult(true)}
        >
          Submit
        </button>
      </div>

      {showResult && (
        <div className="mt-6 p-4 border border-gray-300 rounded w-full">
          <h2 className="text-xl font-bold">Hasil Penilaian:</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(transformData(), null, 2)}
          </pre>
        </div>
      )}

      <div className="pt-5">
        Ekky Mulia Lasardi - Interview Talenlytica
      </div>
    </div>
  );
}
