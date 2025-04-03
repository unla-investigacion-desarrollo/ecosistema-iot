export async function GET() {
    const now = new Date();
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      temperatura: 10 + Math.floor(Math.random() * 16),
      humedad: 20 + Math.floor(Math.random() * 21),
      fechaHora: new Date(now.getTime() - i * 60000).toISOString(),
    }));
  
    return Response.json(mockData);
  }
  