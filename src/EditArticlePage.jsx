import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EditArticlePage = ({ onArticleUpdated }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/articles/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('找不到這篇文章');
                }
                const data = await response.json();
                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category || '');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const updatedArticle = {
            id,
            title,
            content,
            category,
            createdAt: new Date().toISOString(),
        };

        // 獲取現有文章數據
        const existingArticles = JSON.parse(localStorage.getItem('articles')) || [];
        const updatedArticles = existingArticles.map(article =>
            article.id === id ? updatedArticle : article
        );
        localStorage.setItem('articles', JSON.stringify(updatedArticles)); // 保存到 localStorage

        onArticleUpdated(updatedArticle);
        navigate('/');
        setIsSaving(false);
    };

    if (loading) return <p>載入中...</p>;
    if (error) return <p style={{ color: 'red' }}>錯誤：{error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
            <h2>編輯文章</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="category">文章分類:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
                    >
                        <option value="">請選擇分類</option>
                        <option value="家庭">家庭</option>
                        <option value="程式">程式</option>
                        <option value="心情">心情</option>
                        <option value="音樂">音樂</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="title">文章標題:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', fontSize: '1.1em' }}
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
                <div style={{ marginTop: '20px' }}>
                    <button type="submit" disabled={isSaving}>
                        {isSaving ? '儲存中...' : '儲存'}
                    </button>
                    <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>取消</button>
                </div>
            </form>
            <div style={{ marginTop: '20px' }}>
                <h3>預覽:</h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default EditArticlePage;
