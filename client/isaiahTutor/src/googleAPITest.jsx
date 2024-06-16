
// async function handleUpload () {
//     const formData = new FormData() 
//     formData.append('file', file)
//     console.log(formData.get('file'))
//     await axios.post('http://localhost:4000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//     }
//     })
//   }

// //test
// const [file, setFile] = useState(undefined)

// <a href="http://localhost:4000/googleAuth">google auth</a>
//       <form 
//       id='uploadForm' 
//       action='http://localhost:4000/upload' 
//       method='post' 
//       encType="multipart/form-data"
//       >
//         <input type="file" name="file" onChange={e => setFile(e.target.files[0])} />
//         <button type='submit'>submit</button>
//     </form> 
//     <button onClick={handleUpload}>TESTSUBMIT</button>
    
//     {/* only works when inside of a form? */}