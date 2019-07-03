import React from 'react';
// import {db} from '../firebase';

export default function ImageColection (props){

 
     
     const iimg = props.map(srcIm => <li><img src={srcIm}/></li>
     )
console.log(iimg);
    // function func (doc){
    //     return<li><img src={doc}/></li>
        
    //   }

    //   console.log(
    //     //   db.collection('pic').get().then((snapshot) => {
    //     //       snapshot.docs.forEach(doc => 
    //     //       func(doc.data().url))
    // //   })
    //   );
      
      return(
          {iimg}
            //   <li><img src={props}/></li>
          
      )
    
}