import IArticle from '../types/article.types'

const generateArticles = (numArticles: number): IArticle[] => {
    const articles: IArticle[] = []
    const statusOptions: Array<IArticle['status']> = ['KREIRANO', 'NARUČENO', 'ISPORUČENO']
    const articleNames: string[] = ['Iphone', 'Macbook pro', 'Mis', 'Stol']
    const supliersNames: string[] = ['Santa Domenica', 'Emmezeta', 'Portanova', 'Zelda']

    for (let i = 0; i < numArticles; i++) {
        const article: IArticle = {
            id: i + 1,
            naziv: articleNames[Math.floor(Math.random() * articleNames.length)],
            dobavljač: supliersNames[Math.floor(Math.random() * supliersNames.length)],
            status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        }
        articles.push(article)
    }

    return articles
}

export default generateArticles
