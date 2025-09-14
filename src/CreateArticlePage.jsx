import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage = ({ onArticleCreated }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        const finalContent = imageUrl ? `${content}\n\n![文章圖片](${imageUrl})` : content;
        const newArticle = {
            id: Date.now(),
            title,
            content: finalContent,
            category,
            createdAt: new Date().toISOString(),
        };

        console.log('Submitting new article with category:', category); // 檢查提交的分類
        console.log('New article submitted:', newArticle); // 檢查提交的文章數據

        try {
            onArticleCreated(newArticle);
            setMessage('文章新增成功！');
            navigate('/');
        } catch (err) {
            setError('新增文章失敗');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
            <h2>新增文章</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">文章標題:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor="content">文章內容:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={{ width: '100%', minHeight: '300px', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor="category">分類:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        <option value="">請選擇分類</option>
                        <option value="家庭">家庭</option>
                        <option value="程式">程式</option>
                        <option value="心情">心情</option>
                        <option value="音樂">音樂</option>
                    </select>
                </div>
                
                <div style={{ marginTop: '15px' }}>
                    <label htmlFor="imageUrl">圖片網址:</label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="請貼上圖片的網址"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                <div style={{ marginTop: '20px' }}>
                    <button type="submit" disabled={loading}>
                        {loading ? '發布中...' : '發布文章'}
                    </button>
                    <button type="button" onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>取消</button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticlePage;