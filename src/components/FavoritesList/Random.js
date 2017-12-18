// import React, { Component } from "react";
// import axios from "axios";
// import Favorite from "./Favorite";

// export default class Random extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userid: []
//     };
//   }
//   componentDidMount() {
//     axios.get("/api/me").then(response => {
//       if (!response.data) this.setState({ userid: null });
//       else this.setState({ userid: response.data.id });
//     });
//   }

//   render() {
//     return (
//       <div>
//         {this.state.userid.length === 0 ? (
//           <div className="checkout-user">
//             <h1>You must be logged in in order to use this feature</h1>
//           </div>
//         ) : (
//           <div>
//             <div>
//               <Favorite />
//             </div>
//             <nav className="pagination " aria-label="pagination">
//               <a
//                 className="pagination-previous"
//                 title="This is the first page"
//                 disabled
//               >
//                 Previous
//               </a>
//               <a className="pagination-next" href="/random2">
//                 Next page
//               </a>
//               <ul className="pagination-list">
//                 <li>
//                   <a
//                     className="pagination-link is-current"
//                     aria-label="Page 1"
//                     aria-current="page"
//                     href="/random"
//                   >
//                     1
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     className="pagination-link"
//                     aria-label="Goto page 2"
//                     href="/random2"
//                   >
//                     2
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     className="pagination-link"
//                     aria-label="Goto page 3"
//                     href="/random3"
//                   >
//                     3
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
