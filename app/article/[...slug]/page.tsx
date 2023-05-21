"use client"

import Link from "next/link";
import moment from "moment";
import {useParams} from 'next/navigation';

export async function getArticles() {
    const params = useParams();
    return await fetch(`http://localhost:8080/api/articles/${params.slug}`)
        .then((response) => response.json());
}

const ArticlesPage = async () => {

    const article = (await getArticles()).data;

    const publishedFormattedDate = (date) => {
        return moment(date).format('D MMM, Y - H:mm');
    };

    return (
        <article className="py-6 prose dark:prose-invert">
            <h1 className="mb-2">{article.title}</h1>
            <hr className="my-4"/>
            <div>{publishedFormattedDate(article.publishedAt)} by &nbsp;
                <Link href={'/?author=' + article.author}><strong>{article.author}</strong></Link>
            </div>
            <hr className="my-4"/>
            <div dangerouslySetInnerHTML={{__html: article.body}}/>
            <hr className="my-4"/>
        </article>
    )
}


export default ArticlesPage;