import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Navbar from './Navbar'


import { addDoc, collection, deleteDoc, doc, getDoc , setDoc  } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../Firebaseconfg';
import { onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Body = () => {
  const [modal, setModal] = useState(false);
  const [Category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');


  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [form, setForm] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All'); // New state for selected category

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const storageRef = ref(storage, `product_images/${image.name}`);
      await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'products'), {
        Category,
        title,
        productPrice,
        productDesc,
        imageUrl,
        number,
      });

      setLoader(false);
      setModal(false);

      toast.success('Product successfully added');

    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const tempArr = [];
      snapshot.forEach((doc) => {
        tempArr.push({ ...doc.data(), id: doc.id });
      });
      setAllProducts(tempArr);
    });

    return () => unsub();
  }, []);


  //delete function


  const deleteProduct = async (productId) => {
    try {
      // Delete hone se pehle product ki data hasil karein
      const productRef = doc(db, 'products', productId);
      const productSnapshot = await getDoc(productRef);
      const productData = productSnapshot.data();

      // Firestore se delete karein
      await deleteDoc(productRef);

      // Storage se image ko delete karein
      const imageRef = ref(storage, productData.imageUrl);
      await deleteObject(imageRef);

      toast.success('Product successfully deleted');
    } catch (error) {
      console.error('Error deleting product:', error.message, error.code, error.stack); // Error object ko console.error mein dekhein
      toast.error('Error deleting product');
    }
  };


  //edit

  
  const edit = (product) => {
    setId(product.id);
    setCategory(product.Category);
    setTitle(product.title);
    setProductPrice(product.productPrice);
    setProductDesc(product.productDesc);
    setNumber(product.number);
    setImage(null); // Reset image field
    setModal(true);
    setForm(false);
  };


  //updateProduct
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const productRef = doc(db, 'products', id);
      await setDoc(productRef, {
        Category,
        title,
        productPrice,
        productDesc,
        number,
      });

      if (image) {
        // If a new image is selected, update it
        const storageRef = ref(storage, `product_images/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        await setDoc(productRef, { imageUrl }, { merge: true });
      }

      setLoader(false);
      setModal(false);
      toast.success('Product successfully updated');
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error('Error updating product');
    }
  };

  return (
<>
    <Navbar />
    <Container className="py-4 mt-40">
      <h1 className="text-center fw-bold text-3xl mb-3">ADD YOUR PRODUCTS </h1>
      <hr />

      {/* Select Buttons */}
      <div className="Buttons d-flex justify-content-center mb-2 pb-4 mt-6">
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('All')}>All</button>

        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Headphone')}>Headphone</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Earbuds')}>Earbuds</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Handfree')}>Handfree</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Power Bank')}>Power Bank</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Fast Charger')}>Fast Charger</button>
      </div>

      <div className="Buttons d-flex justify-content-center mb-2 pb-4 mt-6">
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Cables')}>Cables</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Speaker')}>Speaker</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Battery')}>Battery</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Smart watch')}>Smart watch</button>

        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('LCDs')}>LCDs</button>
        <button className="btn btn-outline-dark me-2" onClick={() => setSelectedCategory('Accessories')}>Accessories</button>
      </div>

      {/* Plus Button */}
      <Button onClick={() => setModal(true)} className="text-white bg-danger border-0 btn-design">
        <i className="fa fa-plus"></i>
      </Button>

      {/* Table */}
      <Table striped bordered hover responsive variant="" className="text-center text-black mt-1">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Num</th>
            <th>Picture</th>
            <th>Category</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allProducts
            .filter(product => selectedCategory === 'All' || product.Category === selectedCategory)
            .map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.number}</td>
                <td>
                  <img src={product.imageUrl} alt={product.title} width="40px" height="50px" />
                </td>
                <td>{product.Category}</td>
                <td>{product.title}</td>
                <td>{product.productDesc}</td>
                <td>{product.productPrice}</td>
                <td>
                  <button onClick={() => deleteProduct(product.id)} className='btn btn-danger'>
                    <i className='fa fa-trash'></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => edit(product)}
                    className='btn btn-primary'>
                    <i className='fa fa-edit'></i>
                  </button>
                </td>

              </tr>
            ))}
        </tbody>
      </Table>






      {/* Modal */}
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
        <Modal.Title className="text-bold">{form ? 'Submit' : 'Update Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={form ? addItem : updateProduct}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Category</Form.Label>
              <Form.Select onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                <option value="Headphone">Headphone</option>
                <option value="Earbuds">Earbuds</option>
                <option value="Handfree">Handfree</option>
                <option value="Power Bank">Power Bank</option>
                <option value="Fast Charger">Fast Charger</option>
                <option value="Cables">Cables</option>
                <option value="Speaker">Speaker</option>
                <option value="Battery">Battery</option>

                <option value="Smart watch">Smart watch</option>
                <option value="LCDs">LCDs</option>
                <option value="Accessories">Accessories</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Number</Form.Label>
              <Form.Control onChange={(e) => setNumber(e.target.value)} placeholder="Batch Number" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control as="textarea" onChange={(e) => setProductDesc(e.target.value)} placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Price</Form.Label>
              <Form.Control onChange={(e) => setProductPrice(e.target.value)} placeholder="Price" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label className="fw-bold">Picture</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} placeholder="Upload Picture" />
            </Form.Group>
            <Button type="submit" className="w-100 mt-2 mb-3 hover:translate-y-1 bg-primary">
              {form ? 'Upload' : 'Update'}
            </Button>


          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
};

export default Body;