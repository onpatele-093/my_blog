const CategorySidebar = ({ onCategorySelect, categoryStats = {} }) => {
    console.log('Category Stats:', categoryStats); // 檢查 categoryStats
    const categories = ['家庭', '程式', '心情', '音樂'];

    return (
        <div style={{ padding: '20px', borderLeft: '1px solid #ccc', minWidth: '200px' }}>
            <h3>文章分類</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                    <a href="#" onClick={() => onCategorySelect(null)} style={{ textDecoration: 'none', color: '#00bcd4', fontWeight: 'bold' }}>
                        所有文章
                    </a>
                </li>
                {categories.map((category, index) => (
                    <li key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <a href="#" onClick={() => onCategorySelect(category)} style={{ textDecoration: 'none', color: '#007bff' }}>
                            {category}
                        </a>
                        <span style={{ color: '#888', fontSize: '0.95em', marginLeft: '8px' }}>{categoryStats[category] || 0}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;