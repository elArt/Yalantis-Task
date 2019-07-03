import React, {Component} from 'react';
import {storage} from '../firebase';
// import ImageColection from './ImageColection';
import {db} from '../firebase';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      urlArray:[]
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }


  handleChange = e => {
    
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
      
       this.setState({
        progress: 0
      })
      
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(this.onLoadImage());
            
            if(image.name === this.onLoadImage ){
              return
            }
            console.log(image.name);
            this.setState({url});
            db.collection('pic').add({
              url: url,
              name: image.name
            })
        })
        this.onLoadImage();
    });
  }
  onLoadImage = () => {
    console.log('hello world');
    let firebaseArray = [];

    db.collection('pic').get().then((snapshot) => {
      firebaseArray = snapshot.docs.map(doc => {
           console.log(doc.data().url);
           return doc.data().url
          })
        });
        

    this.setState({
        urlArray:firebaseArray
            })


     
  }

  render() {

    const style = {
      // height: '100vh',
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
      // justifyContent: 'center'
    };
    return (
      
      <div style={style}>
        {this.onLoadImage()}
        <div>
            <progress value={this.state.progress} max="100"/>
            <br/>
              <input type="file" onChange={this.handleChange}/>
              <button onClick={this.handleUpload} display = 'block'>Upload</button>
              <br/>
        </div>
        <ul style = {{display: 'block', width: '100vw'}}>
              {this.state.urlArray.map(urlImg => <li style = {{listStyle:'none', display: 'inline'}}><img src={urlImg} height = '300px' /></li>
            )}
        </ul>
        {
         this.state.url && <img src={this.state.url} alt="Uploaded images" height="300"/>
        }
        
        </div>
    )
  }
}

export default ImageUpload;