import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ArticleList = ({ data = [], search }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 新增刪除文章的處理函數
    const handleDelete = async (id) => {
    // 這裡使用硬編碼的帳號密碼
    const username = 'userroot';
    const password = '123456789';
    
    // 創建 base64 編碼的認證字串
    const base64Credentials = btoa(`${username}:${password}`);

    if (window.confirm('確定要刪除這篇文章嗎？')) {
        try {
            const response = await fetch(`http://localhost:8082/api/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${base64Credentials}` // <-- 新增這行
                }
            });

            if (response.status === 204) {
                setArticles(articles.filter(article => article.id !== id));
                alert('文章已成功刪除！');
            } else if (response.status === 401) {
                alert('認證失敗，無法刪除文章。');
            } else {
                throw new Error('刪除文章失敗');
            }
        } catch (err) {
            console.error('刪除文章時出錯:', err);
            alert('刪除文章時出錯：' + err.message);
        }
    }
};

    useEffect(() => {
        console.log('Updating articles state with data:', data); // 檢查更新狀態時的數據
        setArticles(data); // 確保正確更新本地狀態
        setLoading(false); // 確保在數據設置後更新 loading 狀態
    }, [data]); // 依賴 data，確保數據變化時觸發

    console.log('Rendering ArticleList with articles:', articles); // 檢查渲染時的文章數據
    console.log('Loading state:', loading); // 檢查 loading 狀態
    console.log('Error state:', error); // 檢查 error 狀態
    console.log('Articles in ArticleList:', articles); // 檢查 ArticleList 中的文章數據

    if (loading) {
        return <div>載入中...</div>;
    }

    if (error) {
        return <div>錯誤：{error}</div>;
    }

    return (
        <div>
            {articles.length === 0 ? (
                <p>目前沒有任何文章。</p>
            ) : (
                articles.map(article => (
                    <div key={article.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                        <h3>
                            <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                {article.title}
                            </Link>
                        </h3>
                        <small>發布於: {new Date(article.createdAt).toLocaleDateString()} | 分類: {article.category || '未分類'}</small>
                        <div style={{ marginTop: '10px' }}>
                            <Link to={`/edit-article/${article.id}`}>編輯</Link>
                            <button 
                                onClick={() => handleDelete(article.id)} 
                                style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                            >
                                刪除
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ArticleList;