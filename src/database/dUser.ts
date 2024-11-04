//Definimos el conjunto de datos que tienen los usuarios:
const users: 
{
    id: string,
    name: string,
    lastName: string,
    email: string,
    age: number,
    enabled: boolean
}[] = 

//Definimos los usuarios que tenemos:
[
    {id: '1', name: 'Maximiliano', lastName: 'Calahorra', email: 'maximilianocalahorra@gmail.com', age: 21, enabled: true},
    {id: '2', name: 'Ramiro Xavier', lastName: 'Ferreiro', email: 'ramiro.x.ferreiro@gmail.com', age: 21, enabled: true},
    {id: '3', name: 'Federico Tomás', lastName: 'Noceti', email: 'fedenoceti@gmail.com', age: 20, enabled: false},
    {id: '4', name: 'Juan Manuel', lastName: 'Noli', email: 'juannoli@gmail.com', age: 21, enabled: true},
    {id: '5', name: 'Manuel Florian', lastName: 'Guerrero', email: 'manuguerrero@gmail.com', age: 22, enabled: false},
    {id: '6', name: 'Alfredo Honorio', lastName: 'Ivanovich', email: 'alfredoivanovich@gmail.com', age: 21, enabled: false},
    {id: '7', name: 'Ronny', lastName: 'Olmos', email: 'ronnyolmos@gmail.com', age: 20, enabled: true}
];

//Exportamos los usuarios:
export default users;