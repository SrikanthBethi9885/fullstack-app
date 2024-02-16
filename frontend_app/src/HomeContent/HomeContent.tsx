import React, { useState, useEffect } from 'react';
import img from './img.jpg' // Import local image
import img1 from './img1.jpg' // Import local image
import img3 from './img3.jpg' // Import local image
import img4 from './img4.jpg' // Import local image
//import g3india from './g3india.jpg'
import { Grid, Link, Typography } from '@mui/material';
import axios from 'axios';

interface Article {
    url: string;
    author: string;
    title: string;
    description: string;
    urlToImage: string;
    // Add other properties based on the actual structure of the API response
}

const HomeContent = () => {
    const imageUrls = [img, img1, img3, img4];  // Array of locally imported images

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [newsData, setNewsData] = useState<Article[]>([]);

    useEffect(() => {
        // Fetch news data from your Node.js server
        axios.get('http://localhost:5000/news') // Update the URL based on your server endpoint
            .then(response => {
                setNewsData(response.data.articles);
                console.log(response.data.articles)
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 3000); // Change image every 3 seconds (adjust the interval as needed)

        return () => clearInterval(intervalId);
    }, [currentImageIndex, imageUrls.length]);



    return (
        <div>
            <img src={imageUrls[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} style={{ width: '75%', height: '500px' }} />
            <p>Messages are communications provided on the screen to the screen viewer.
                Screen messages fall into two broad categories: system and instructional.
                System messages are generated by the <b>system to keep the user informed of the system’s</b> state and activities.
                Instructional messages, sometimes referred to as prompting messages, are messages that tell the user how to work with, or complete, the screen displayed.</p>

            {/* Display news data */}
            <Grid container spacing={2}>
                {newsData.map((article, index) => (
                    <Grid item xs={4} key={index}>
                        <img src={article.urlToImage} alt={`Article ${index + 1}`} style={{ height: '400px', width: '400px' }} />

                        <Typography>{article.author}</Typography>
                        <Typography>{article.title}</Typography>
                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                            Read more
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default HomeContent;
