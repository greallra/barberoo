
  const defaultState = []
  export const barbers = (state = defaultState, { type, data }) => {
      switch (type) {
          case 'SET_BARBERS':
              return [...data]
          default:
              break;
      }
    return state;
  };

//   {
//     uuid: 4,
//     username: 'steveyboy',
//     first_name: 'Steve',
//     last_name: 'Murphy',
//     email: 'bill@gmail.com',
//     short_summary: 'Can do a varierty of styles, or just your basic snip', 
//     pricing: {
//         basic: "10.50",
//         special1: 20.40
//     },
//     geo: {
//         name: "dublin",
//         latitude: 53.3298,
//         longitude: -6.2603,
//     },
//     thumbnail: 'https://randomuser.me/portraits/men/3.jpg',
//     photos: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
//     rating: {
//         aggregate_rating: "4.2",      
//     },
//     reviews: [{
//         uuid: 10,
//         desciption: 'amazing job',
//         timestamp: Date.now()
//     },{
//         uuid: 15,
//         desciption: 'highly recommend',
//         timestamp: Date.now()
//     },{
//         uuid: 17,
//         desciption: 'pleasant feelow great stuff',
//         timestamp: Date.now()
//     }]
// }
  