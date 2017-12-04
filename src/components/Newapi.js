// import React, { Component } from "react";
// import axios from "axios";

// export default class Newapi extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       beer: [],
//       beerId: 0,
//       favorites: [],
//       favId: null,
//       userid: [],
//       beerimg: [],
//       beerdesc: [],
//       foodpairing: [],
//       brewerstips: [],
//       beername: [],
//       disabled: false,
//       active: true,
//       modal: "modal"
//     };
//     this.addToFavs = this.addToFavs.bind(this);
//     this.toggleModal = this.toggleModal.bind(this);
//   }

//   componentDidMount() {
//     axios
//       .get("http://localhost:3001/api/getbeer")
//       .then(results => {
//         console.log(results);
//         this.setState({
//           beer: results.data.data
//           //   beerId: results.data.data.id,
//           //   beerimg: results.data.data.labels,
//           //   beerdesc: results.data.data.style.description,
//           //   foodpairing: results.data.data.food_pairings,
//           //   brewerstips: results.data.data.style.description,
//           //   beername: results.data.data.nameDisplay
//         });
//       })
//       .catch(console.log);

//     axios.get("/api/me").then(response => {
//       if (!response.data) this.setState({ userid: null });
//       else this.setState({ userid: response.data.id });
//     });
//   }

//   addToFavs(beer) {
//     axios
//       .post("/api/favorites", {
//         userid: this.state.userid,
//         id: beer.id,
//         image_url: beer.image_url,
//         description: beer.description,
//         food_pairing: beer.food_pairing,
//         brewers_tips: beer.brewers_tips,
//         name: beer.name
//       })
//       .then(response => {
//         this.setState({ favId: parseInt(response.data[0].beerid, 10) });
//       })
//       .catch(console.log);
//   }

//   toggleModal = beer => {
//     // console.log(beer);
//     if (this.state.active) {
//       this.setState({
//         active: false,
//         modal: "is-active",
//         image_url: beer[0].label.icon,
//         description: beer[0].description,
//         food_pairing: beer.food_pairing,
//         brewers_tips: beer.brewers_tips,
//         beername: beer[0].nameDisplay
//       });
//     } else {
//       this.setState({ active: true, modal: "modal" });
//     }
//   };

//   render() {
//     // console.log(this.state.beer);

//     const beers = this.state.beer.map((beer, index) => {
//       //   console.log(beer);
//       return (
//         <div className="beer-container" key={index}>
//           <ul>
//             {this.state.favId !== beer.id ? (
//               <button
//                 className="button is-primary"
//                 key={index}
//                 onClick={() => this.addToFavs(beer)}
//               >
//                 LIKE ❤
//               </button>
//             ) : (
//               <button
//                 className="button is-danger"
//                 key={index}
//                 onClick={() => this.addToFavs(beer)}
//               >
//                 ❤
//               </button>
//             )}

//             <li>
//               <h2>{beer.nameDisplay}</h2>
//             </li>

//             <li>
//               <img
//                 onClick={() => this.toggleModal(beer)}
//                 src={beer.labels.medium}
//                 className="responsive-image"
//                 alt="beer"
//               />
//             </li>
//           </ul>
//         </div>
//       );
//     });

//     return (
//       <div className="background">
//         {this.state.modal === "is-active" ? (
//           <div className="beer-display-fixed">{beers}</div>
//         ) : (
//           <div className="beer-display">
//             {beers}
//             {/* {console.log(this.state.beer)} */}
//           </div>
//         )}
//         <div className={this.state.modal}>
//           <div className="modal-background" />
//           <div className="modal-card">
//             <header className="modal-card-head">
//               <p className="modal-card-title">{this.state.name}</p>
//               <button
//                 className="delete"
//                 aria-label="close"
//                 onClick={() => this.toggleModal(this.state.beer)}
//               />
//             </header>
//             <section className="modal-card-body">
//               <img
//                 className="beer-img"
//                 alt="beer"
//                 src="http://www.derekphillipsphotography.co.uk/images/cinemagraph/BeerPour.gif"
//               />
//               <p className="popups">
//                 <strong>Description:</strong> {this.state.description}
//               </p>
//               <br />

//               <p className="popups">
//                 <strong>Food pairing:</strong> {this.state.food_pairing}
//               </p>
//               <br />

//               <p className="popups">
//                 <strong>Brewers tips:</strong> {this.state.brewers_tips}
//               </p>
//             </section>
//             <footer className="modal-card-foot" />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }