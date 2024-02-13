import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './index.css'


const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 24;

function App() {

  const searchInput = useRef(null);
  const [ images, setImages] = useState([]);
  const [ page, setPage] = useState([]);
  const [ totalPages, setTotalPages] = useState(0);

 

  const fetchImages = async() =>{

    try{
      const {data} = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=${page}&per_page=${
          IMAGES_PER_PAGE
        }&client_id=${
          import.meta.env.VITE_API_KEY
        }`
    );
    setImages(data.results)
    setTotalPages(data.total_pages)
    } catch (error) {
      console.log(error);
    }

  }

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current);
    fetchImages();
  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <>
      <div className='container'>
        <h1 className='title'>Plixer</h1>
        <div className='search-section'>
          <Form onSubmit={handleSearch}>
            <Form.Control 
              type='search' 
              placeholder='Type somthing to search....'
              className='search-input'
              ref={searchInput}
              />
          </Form>
        </div>
        <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
      < div className='images'>
        {
          images.map((image) => {
            return (
            <img
              key={image.id} 
              src={image.urls.small} 
              alt={image.alt_description}
              className='image'
            />
            )
          })
        }
      </div>
      <div className='buttons'>
        {page > 1 && <Button>Previous</Button>}
        {page < totalPages && <Button>Next</Button>}
      </div>
      </div>
    </>
  )
}

export default App
