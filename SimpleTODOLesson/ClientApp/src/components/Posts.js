import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";


const URL = `/api/posts`;

const Posts = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [allPosts, setPosts] = useState([]);
        //useEffect(() => {
        //    // Your code that interacts with the DOM
        //    const addPost = async () => {
        //        const headerFromUser = document.querySelector('#header').value;
        //        const textFromUser = document.querySelector('#text').value;
        //        // ... rest of your code
        //    };
        //    // Rest of your useEffect logic

        //}, []); 


    const getPosts = async () => {
        const options = {
            method: 'GET',
            headers: new Headers()   
        }
        const result = await fetch(URL, options);
        if (result.ok){
            const posts = await result.json();
            setPosts(posts);
            return posts;
        }
        return [];
    }

    const addPost = async () => {

        
        const newPost = {
            Name: name,
            ImageUrl: imageUrl,
            Description: description,
            Quantity: quantity,
            Price: price
        };

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newPost)
        };

        const result = await fetch(URL, options);
        if (result.ok){
            const post = await result.json();
            allPosts.push(post);
            setPosts(allPosts.slice());
        }
    }

    const updatePost = async (oldPost) => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(oldPost)
        };

        const result = await fetch(URL, options);
        if (result.ok){
            const post = await result.json();
            const updatedPost = allPosts.findIndex(x => x.id === oldPost.id);
            allPosts[updatedPost] = post;
            setPosts(allPosts.slice());
        }
    }

    const deletePost = (id) => {
        const options = {
            method: 'DELETE',
            headers: new Headers()   
        }
        fetch(URL + `/${id}`, options);
        setPosts(allPosts.filter(x => x.id !== id));
    } 

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '60%', marginBottom: '20px' }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Product Management</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        id="name"
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        id="imageUrl"
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <textarea
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="quantity" style={{ marginBottom: '5px' }}>Quantity:</label>
                    <input
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        id="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={quantity !== '' ? quantity : 0}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <label htmlFor="price" style={{ marginBottom: '5px' }}>Price:</label>
                    <input
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        id="price"
                        type="number"
                        placeholder="Price"
                        value={price !== '' ? price : 0}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <button
                        style={{ padding: '8px 16px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                        onClick={() => addPost()}
                    >
                        Add Product
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {allPosts.map(product => (
                    <PostItem
                        key={product.id}
                        post={product}
                        deleteAction={deletePost}
                        updateAction={updatePost}
                    />
                ))}
            </div>
        </div>
    );
};

const PostItem = ({ post, deleteAction, updateAction }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [updatedName, setUpdatedName] = useState(post.Name);
    const [updatedImageUrl, setUpdatedImageUrl] = useState(post.imageUrl);
    const [updatedDescription, setUpdatedDescription] = useState(post.description);

    const handleUpdate = () => {
        const updatedPost = {
            ...post,
            Name: updatedName,
            imageUrl: updatedImageUrl,
            description: updatedDescription
        };
        updateAction(updatedPost);
        setModalOpen(false);
    };

    return (
        <div style={{ backgroundColor: 'whitesmoke', margin: '10px', borderRadius: '10px', padding: '20px', width: '300px' }}>
            <h2 style={{ marginBottom: '10px', fontSize: '20px' }}>{post.Name}</h2>
            <img src={post.imageUrl} alt={post.Name} style={{ marginBottom: '10px', width: '100%', borderRadius: '5px' }} />
            <p style={{ marginBottom: '10px' }}>{post.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    style={{ padding: '8px 16px', borderRadius: '5px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                    onClick={() => deleteAction(post.id)}
                >
                    Delete
                </button>
                <button
                    style={{ padding: '8px 16px', borderRadius: '5px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
                    onClick={() => setModalOpen(true)}
                >
                    Update
                </button>
            </div>
            {isModalOpen && (
                <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '60%', maxWidth: '500px' }}>
                        <h2>Edit Post</h2>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                        <input
                            type="text"
                            value={updatedImageUrl}
                            onChange={(e) => setUpdatedImageUrl(e.target.value)}
                            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                        />
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', resize: 'vertical' }}
                        />
                        <button
                            onClick={handleUpdate}
                            style={{ padding: '8px 16px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{ marginLeft: '10px', padding: '8px 16px', borderRadius: '5px', background: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
