import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import axios from "axios"

function AdminCourseLessonAdd({ course, setSelected, fetchCourses }) {
    if (!course) {
        return
    }

    const [formData, setFormData] = useState({name: '', topic: 'None', homework: false, course: course.name})
    const [file, setFile] = useState(undefined)
    const [error, setError] = useState({msg: '', success: 'danger'})
    const [preview, setPreview] = useState('')

    function MapTopics() {
        return (
            course.topics.map(topic => {
                return (
                    <option value={topic} key={topic} className="list-group-item">
                        {topic}
                    </option>
                )
            })
        )    
    }
    async function handleUpload(file) {
       const res = await fetch('https://content.dropboxapi.com/2/files/upload', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_DBX}`,
              'Content-Type': 'application/octet-stream',
              'Dropbox-API-Arg': `{"path":"/${course.name}/${formData.name}.pdf","mode":{".tag":"overwrite"},"autorename":true,"mute":false}`
          },
          body: file
      })
      return res.status.indexOf(0) !== '4' ? {msg: 'File uploaded Successfully', success: 'info'} : {msg: 'AN ERROR OCCURED WITH THE API', success: 'danger'}
      }

    async function createLink(name, submitData) {
        const path = `/${course.name}/${name}.pdf`
        const embed_link = await axios.post(`${import.meta.env.VITE_ENDPOINT}/createLink`, path)
        setPreview(embed_link.data)
        return embed_link.data
    }
    

    async function handleSubmit(e) {
        e.preventDefault()
        // Validate form
        const submitData = formData
        setError({msg: 'File upload in progress', success: 'info'})
        if (!formData.name.length || !file) {
            setError({msg: 'No file found or No name', success: 'danger'})
            return 
        }
        if (file.type != 'application/pdf') {
            setError({msg: 'Invalid file type', success: 'danger'})
            return
        }

        const courseLessonNames = course.lessons.map(lesson => lesson.name)

        if (courseLessonNames.includes(formData.name)) {
            setError({msg: 'That file already exists', success: 'danger'})
            return
        }
        // Add file to database here

        await handleUpload(file).then((error) => setError(error))
        .catch(() => (setError({msg: 'An error occurred while uploading', success: 'danger'})))
    

        // Get the link to the file here
        await createLink(submitData.name, submitData).
        then(async (link) => axios.post(`${import.meta.env.VITE_ENDPOINT}/addLesson`, {...submitData, embed: link, lessonID: crypto.randomUUID()})).
        then((res) => setError({msg: res.data, success: 'success'})).
        catch(() => setError({msg: "Cannot connect to database", success: 'danger'}))

        // Creates link then uploads it to databse

        course.lessons.push({name: formData.name, lessonID: formData.lessonID})
        fetchCourses()


    }


    return (
        <>
    <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between p-2">
                <h3>Add a lesson to {course.name}</h3>
                <Button onClick={() => setSelected(undefined)} variant="danger">Close</Button>
                </div>
                <div className="row">
                    <div className="col">
                        <label required className="form-label">Lesson Title</label>
                        <input className='form-control' type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
                        <label className="form-label">Additional Options</label>
                        <div className="form-check form-switch d-flex align-items-center gap-2">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={formData.homework} onChange={() => setFormData({...formData, homework: !formData.homework})}/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Assign as Homework for all</label>
                        </div>                        
                    </div>
                    <div className="col">
                        <div>
                            <label className="form-label">Topic</label>
                            <select className="form-select" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}>
                                <option defaultValue value="No Topic Selected">(Select)</option>
                                <MapTopics />
                            </select>
                        </div>
                        <div className="">
                            <label className="form-label">Lesson File (PDF)</label>
                            <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
                        </div>
                        
                    </div>
                </div>
                <Button type='submit' >Create Lesson</Button>
            </form>
            {Boolean(error.msg.length) ? (<div className={"mt-3 alert alert-" + error.success}>
                {error.msg}
            </div>) : ''}
            <Modal className='modal-fullscreen modal-xl h-80' show={Boolean(preview.length && error.success === 'success')}>
                <Modal.Header className="d-flex justify-content-between">
                    <h3>File Preview</h3>
                    <Button variant="danger" onClick={() => setPreview('')}>Close</Button>
                    </Modal.Header>
                <Modal.Body>
                <iframe height={800} width='100%' src={preview}></iframe>
                </Modal.Body>
                
            </Modal>
            </>
    )
}

export default AdminCourseLessonAdd