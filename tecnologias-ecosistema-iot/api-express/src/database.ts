//Simulacion de base de datos
const pets: {
  id: string;
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
}[] = [];

pets.push({
  id: "1",
  name: "Fido",
  age: 3,
  pictureUri: "http://example.com/fido.jpg",
  ownerName: "John Doe",
});

console.log(pets);

export default pets;