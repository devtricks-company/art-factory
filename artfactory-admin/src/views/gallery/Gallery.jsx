import React from 'react'
import {Link} from 'react-router-dom';

const Gallery = () => {
    return (
        <div className="gallery">
            <div className="container mt-5 text-center">
                <div className="card">
                    <div className="card-body text-center">
                        <Link to="/admin/teachergallery">گالری مدرسین</Link>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-body">
                        <Link to="/admin/coursegallery">گالری دوره ها</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery
