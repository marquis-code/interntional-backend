const axios = require('axios');

const generateArticles = () => {
  const categories = ['Hematology', 'Microbiology', 'Chemical Pathology', 'General News'];
  const statuses = ['published', 'draft', 'scheduled'];
  const articles = [];

  for (let i = 1; i <= 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    articles.push({
      title: `Understanding ${category} - Part ${i}`,
      content: `This is an in-depth guide on ${category}. It covers various topics related to clinical practices, lab safety, and standard operating procedures. Interns and professionals should review this material carefully.`,
      category,
      status,
      tags: ['clinical', category.toLowerCase().replace(' ', '-')],
      coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800'
    });
  }
  return articles;
};

const seed = async () => {
  const articles = generateArticles();
  let success = 0;
  
  for (const article of articles) {
    try {
      await axios.post('http://localhost:4000/api/v1/articles', article);
      success++;
      console.log(`Seeded: ${article.title}`);
    } catch (err) {
      console.error(`Failed to seed: ${article.title}`, err.message);
    }
  }
  
  console.log(`\nSuccessfully seeded ${success}/${articles.length} articles.`);
};

seed();
