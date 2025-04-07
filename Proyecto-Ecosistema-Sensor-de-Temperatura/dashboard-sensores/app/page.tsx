"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import GaugeChart from "react-gauge-chart";

///Definimos la estructura de la medición:
interface SensorData {
  temperatura: number;
  humedad: number;
  fechaHora: string;
}

///Definimos la estructura de las consultas:

//Obtener determinada cantidad de últimas mediciones:
const GET_ULTIMAS_MEDICIONES = gql`
  query Query ($cantidad: Int!) {
      traerUltimasMediciones(cantidad: $cantidad) {
        humedad
        fechaHora
        temperatura
    }
  }
`;

//Obtener el promedio de temperatura de determinada cantidad de últimas mediciones:
const GET_PROMEDIO_TEMPERATURA_ULTIMAS_MEDICIONES = gql`
  query Query ($cantidad: Int!) {
      traerPromedioTemperatura(cantidad: $cantidad)
  }
`;

//Obtener el promedio de humedad de determinada cantidad de últimas mediciones:
const GET_PROMEDIO_HUMEDAD_ULTIMAS_MEDICIONES = gql`
  query Query ($cantidad: Int!) {
      traerPromedioHumedad(cantidad: $cantidad)
  }
`;

//Obtener la última medición:
const GET_MEDICION_ACTUAL = gql`
  query {
    traerMedicionActual {
      fechaHora
      humedad
      temperatura
    }
  }
`;

//Función generadora del componente:
export default function Home() {
  ///Ejecución de las consultas:

  //Última medición:
  const { data: medicionActualData, refetch: refetchMedicionActual } = useQuery(GET_MEDICION_ACTUAL);

  //Últimas 10 mediciones:
  const { data: medicionesData, refetch: refetchUltimasMediciones } = useQuery(GET_ULTIMAS_MEDICIONES, {
    variables: { cantidad: 10 }, 
  });

  //Promedio de temperatura de las últimas 10 mediciones:
  const { data: promedioTemperaturaData, refetch: refetchPromedioTemperatura } = useQuery(GET_PROMEDIO_TEMPERATURA_ULTIMAS_MEDICIONES, {
    variables: { cantidad: 10 },
  });

  //Promedio de humedad de las últimas 10 mediciones:
  const { data: promedioHumedadData, refetch: refetchPromedioHumedad } = useQuery(GET_PROMEDIO_HUMEDAD_ULTIMAS_MEDICIONES, {
    variables: { cantidad: 10 },
  });

  //El componente se actualizará cada determinado tiempo, reflejando los cambios en la base de datos:
  useEffect(() => {
    //Reejecución de las consultas cada 5000 ms:
    const interval = setInterval(() => {
      refetchUltimasMediciones();
      refetchPromedioTemperatura();
      refetchPromedioHumedad();
      refetchMedicionActual();
    }, 5000);
  
    return () => clearInterval(interval);
  }, [refetchUltimasMediciones, refetchPromedioTemperatura, refetchPromedioHumedad, refetchMedicionActual]);

  //Extracción de resultados de las consultas:
  const last10: SensorData[] = medicionesData?.traerUltimasMediciones || []; //Últimas mediciones.
  const avgTemp = promedioTemperaturaData?.traerPromedioTemperatura || 0; //Promedio de temperatura.
  const avgHum = promedioHumedadData?.traerPromedioHumedad || 0; //Promedio de humedad.
  const currentTemp = medicionActualData?.traerMedicionActual?.temperatura || 0; //Última temperatura.
  const currentHum = medicionActualData?.traerMedicionActual?.humedad || 0; //Última humedad.

  //Componente:
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard de Sensores</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black border border-white p-2 rounded">
            Temperatura Actual
          </h2>
          <GaugeChart id="temp-gauge" nrOfLevels={35} percent={currentTemp / 50} />
          <p className="text-black border-2 border-white rounded-lg p-2 mt-2">
            {currentTemp} actual / {((currentTemp / 50) * 100).toFixed(2)} %
          </p>
          <p className="text-black border border-white p-2 rounded">
            Promedio Últimas 10: {avgTemp.toFixed(2)}°C
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-black border border-white p-2 rounded">
            Humedad Actual
          </h2>
          <GaugeChart id="hum-gauge" nrOfLevels={40} percent={currentHum / 100} />
          <p className="text-black border-2 border-white rounded-lg p-2 mt-2">
            {currentHum} actual / {((currentHum / 100) * 100).toFixed(2)} %
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
            {last10.length > 0 ? (
              last10.map((item, index) => (
                //Mostramos cada una de ellas:
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{item.fechaHora}</td>
                  <td className="border px-4 py-2">{item.temperatura}</td>
                  <td className="border px-4 py-2">{item.humedad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
