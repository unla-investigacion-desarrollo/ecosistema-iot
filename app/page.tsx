"use client";

import { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

interface SensorData {
  temperatura: number;
  humedad: number;
  fechaHora: string;
}

export default function Home() {
  const [data, setData] = useState<SensorData[]>([]);
  
  const chartStyle = {
    textColor: "#000000"
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/sensores");
      const result: SensorData[] = await response.json();
      setData(result);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const last10 = data.slice(-10);
  const avgTemp = last10.reduce((sum, item) => sum + item.temperatura, 0) / last10.length || 0;
  const avgHum = last10.reduce((sum, item) => sum + item.humedad, 0) / last10.length || 0;
  const currentTemp = data[data.length - 1]?.temperatura || 0;
  const currentHum = data[data.length - 1]?.humedad || 0;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard de Sensores</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black border border-white p-2 rounded">
            Temperatura Actual
          </h2>
          <GaugeChart id="temp-gauge" nrOfLevels={35} percent={currentTemp / 35} style={chartStyle} />
          <p className="text-black border-2 border-white rounded-lg p-2 mt-2">
            { currentTemp } actual / { (currentTemp / 35 * 100).toFixed(2) } %
          </p>
          <p className="text-black border border-white p-2 rounded">
            Promedio Últimas 10: {avgTemp.toFixed(2)}°C
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black border border-white p-2 rounded">
            Humedad Actual
          </h2>
          <GaugeChart id="hum-gauge" nrOfLevels={40} percent={currentHum / 40} style={chartStyle} />
          <p className="text-black border-2 border-white rounded-lg p-2 mt-2">
            { currentHum } actual / { (currentHum / 40 * 100).toFixed(2) } %
          </p>
          <p className="text-black border border-white p-2 rounded">
            Promedio Últimas 10: {avgHum.toFixed(2)}%
          </p>
        </div>
      </div>      
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Últimas Mediciones</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Fecha y Hora</th>
              <th className="border px-4 py-2">Temperatura (°C)</th>
              <th className="border px-4 py-2">Humedad (%)</th>
            </tr>
          </thead>
          <tbody>
            {last10
              .sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime()) // Ordena por fecha y hora, de más reciente a más antigua
              .map((item, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{item.fechaHora}</td>
                  <td className="border px-4 py-2">{item.temperatura}</td>
                  <td className="border px-4 py-2">{item.humedad}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
