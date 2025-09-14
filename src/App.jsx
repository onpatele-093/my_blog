import CategorySidebar from './CategorySidebar';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ArticleList from './ArticleList';
import CreateArticlePage from './CreateArticlePage';
import EditArticlePage from './EditArticlePage';
import ArticleDetailPage from './ArticleDetailPage';

function App() {

    const [articleKey, setArticleKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [categoryStats, setCategoryStats] = useState({});
    const [articles, setArticles] = useState([]); // 新增狀態來存儲文章

    useEffect(() => {
        const fetchAllArticles = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/articles');
                if (!response.ok) {
                    throw new Error('無法加載文章');
                }

                const data = await response.json();
                console.log('Fetched Articles:', data); // 檢查後端返回的文章數據
                console.log('Raw data from backend:', data); // 檢查後端返回的原始數據

                const stats = {};
                data.forEach(article => {
                    console.log('Article Category:', article.category); // 調試每篇文章的分類
                    console.log('Full Article Data:', article); // 調試完整的文章數據結構
                    const cat = article.category || '未分類';
                    stats[cat] = (stats[cat] || 0) + 1;
                });

                setCategoryStats(stats);
                setArticles(data); // 將文章數據存儲到狀態中
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchAllArticles();
    }, [articleKey]);

    const handleArticleChange = () => {
        setArticleKey(prevKey => prevKey + 1);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearch(""); // 點分類時清空搜尋
        setSearchInput("");
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInput);
    };

    const filteredArticles = selectedCategory
        ? articles.filter(article => article.category === selectedCategory)
        : articles; // 根據選中的分類過濾文章

    console.log('Articles passed to ArticleList:', articles); // 檢查傳遞給 ArticleList 的文章數據

    return (
        <>
            <iframe
                width="320"
                height="80"
                src="https://www.youtube.com/embed/iM0e4-ktVXw?autoplay=1&loop=1&playlist=iM0e4-ktVXw"
                title="YouTube music"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, background: '#000', borderRadius: '10px' }}
                id="yt-music-player"
            ></iframe>
            <div style={{ padding: '20px' }}>
                <header style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ margin: 0 }}>
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            onClick={() => setSelectedCategory(null)}
                        >
                            轉職宅的碎碎念
                        </Link>
                    </h1>
                    <form onSubmit={handleSearchSubmit} style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="搜尋文章..."
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px' }}
                        />
                        <button type="submit" style={{ padding: '6px 14px' }}>搜尋</button>
                    </form>
                    <nav>
                        <Link to="/create-article">新增文章</Link>
                    </nav>
                </header>
                {/* 新增 Flex 容器來並排顯示內容與側邊欄 */}
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1', paddingRight: '20px' }}>
                        <Routes>
                            <Route path="/" element={<ArticleList key={articleKey} search={search} data={filteredArticles} />} />
                            <Route path="/create-article" element={<CreateArticlePage onArticleCreated={handleArticleChange} />} />
                            <Route path="/edit-article/:id" element={<EditArticlePage onArticleUpdated={handleArticleChange} />} />
                            <Route path="/articles/:id" element={<ArticleDetailPage />} />
                        </Routes>
                    </div>
                    {/* 在右邊新增側邊欄 */}
                    <aside>
                        <CategorySidebar onCategorySelect={handleCategorySelect} categoryStats={categoryStats} />
                    </aside>
                </div>
            </div>
            <script dangerouslySetInnerHTML={{__html:`
            window.addEventListener('DOMContentLoaded', function() {
                var iframe = document.getElementById('yt-music-player');
                if (iframe && iframe.contentWindow) {
                    iframe.onload = function() {
                        try {
                            var player = new iframe.contentWindow.YT.Player(iframe, {
                                events: {
                                    'onReady': function(event) {
                                        event.target.setVolume(50);
                                    }
                                }
                            });
                        } catch(e) {}
                    }
                }
            });
            `}} />
        </>
    );
}

export default App;