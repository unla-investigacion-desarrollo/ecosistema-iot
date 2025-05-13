//Definimos el conjunto de datos que tienen las publicaciones:
const posts: 
{
    id: string,
    content: string,
    dateTime: Date,
    enabled: boolean,
    user: 
    {
        id: string,
        name: string,
        lastName: string,
        email: string,
        age: number,
        enabled: boolean
    }
}[] = 

//Definimos las publicaciones que tenemos con su respectivo usuario:
[
    {id: '1', content: 'Primera publicación de Maximiliano', dateTime: new Date("2024-10-31T14:30:00Z"), enabled: true, user: {id: '1', name: 'Maximiliano', lastName: 'Calahorra', email: 'maximilianocalahorra@gmail.com', age: 21, enabled: true}},
    {id: '2', content: 'Primera publicación de Ramiro', dateTime: new Date("2024-10-31T14:50:00Z"), enabled: true, user: {id: '2', name: 'Ramiro Xavier', lastName: 'Ferreiro', email: 'ramiro.x.ferreiro@gmail.com', age: 21, enabled: true}},
    {id: '3', content: 'Primera publicación de Federico', dateTime: new Date("2024-10-31T19:22:00Z"), enabled: true, user: {id: '3', name: 'Federico Tomás', lastName: 'Noceti', email: 'fedenoceti@gmail.com', age: 20, enabled: false}},
    {id: '4', content: 'Primera publicación de Juan', dateTime: new Date("2024-11-01T11:20:00Z"), enabled: true, user: {id: '4', name: 'Juan Manuel', lastName: 'Noli', email: 'juannoli@gmail.com', age: 21, enabled: true}},
    {id: '5', content: 'Primera publicación de Manuel', dateTime: new Date("2024-11-01T13:35:00Z"), enabled: true, user: {id: '5', name: 'Manuel Florian', lastName: 'Guerrero', email: 'manuguerrero@gmail.com', age: 22, enabled: false}},
    {id: '6', content: 'Primera publicación de Alfredo', dateTime: new Date("2024-11-02T18:11:00Z"), enabled: true, user: {id: '6', name: 'Alfredo Honorio', lastName: 'Ivanovich', email: 'alfredoivanovich@gmail.com', age: 21, enabled: false}},
    {id: '7', content: 'Primera publicación de Ronny', dateTime: new Date("2024-11-02T19:45:00Z"), enabled: true, user: {id: '7', name: 'Ronny', lastName: 'Olmos', email: 'ronnyolmos@gmail.com', age: 20, enabled: true}},
    {id: '8', content: 'Segunda publicación de Federico', dateTime: new Date("2024-11-03T08:25:00Z"), enabled: true, user: {id: '3', name: 'Federico Tomás', lastName: 'Noceti', email: 'fedenoceti@gmail.com', age: 20, enabled: false}},
    {id: '9', content: 'Segunda publicación de Alfredo', dateTime: new Date("2024-11-03T12:50:00Z"), enabled: true, user: {id: '6', name: 'Alfredo Honorio', lastName: 'Ivanovich', email: 'alfredoivanovich@gmail.com', age: 21, enabled: false}},
    {id: '10', content: 'Segunda publicación de Ronny', dateTime: new Date("2024-11-03T17:20:00Z"), enabled: true, user: {id: '7', name: 'Ronny', lastName: 'Olmos', email: 'ronnyolmos@gmail.com', age: 20, enabled: true}},
];

//Exportamos las publicaciones:
export default posts;