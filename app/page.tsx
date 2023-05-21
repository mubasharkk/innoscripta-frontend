"use client"

import Link from "next/link";
import moment from "moment";
import {useSearchParams} from 'next/navigation';
import {Button, Form, Container, Row, Col, InputGroup} from "react-bootstrap";

export async function getArticles() {
    const search = useSearchParams();
    console.log('http://localhost:8080/api/articles?' + search.toString());
    return await fetch('http://localhost:8080/api/articles?' + search.toString())
        .then((response) => response.json());
}

export async function getSourcesList() {
    return await fetch('http://localhost:8080/api/sources')
        .then((response) => response.json());
}

const HomePage = async () => {

    const fields = useSearchParams();
    const articlesResponse = await getArticles();
    const sourcesResponse = await getSourcesList();

    const publishedFormattedDate = (date) => {
        return moment(date).format('D MMM, Y - H:mm');
    };

    return (
        <section>
            <div>
                {/* This could be a separate component, skipping due to time.*/}
                <Form>
                    <Container>
                        <Row>
                            <Col><h4>Search</h4></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control defaultValue={fields.get('keyword')} name="keyword" type="search" placeholder="Type to search titles"/>
                            </Col>
                            <Col>
                                <Form.Select aria-label="Default select example" name={'source'} defaultValue={fields.get('source')} >
                                    <option value={''}>Select a news source</option>
                                    {sourcesResponse.data.map((source) => (
                                        <option value={source.slug}>{source.title}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <Form.Control type="date" name={'fromDate'} defaultValue={fields.get('fromDate')}/>
                                    <Form.Control type="date" name={'tillDate'} defaultValue={fields.get('tillDate')}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">
                                    Search
                                </Button>
                            </Col>

                        </Row>
                    </Container>
                </Form>
            </div>
            <hr/>
            <div className="prose dark:prose-invert">
                {articlesResponse.data.length <= 0 ? <div>No article found!</div> : articlesResponse.data.map((article) => (
                    <article key={article._id}>
                        <Link href={'/article/' + article.id}>
                            <h2>{article.title}</h2>
                        </Link>
                        <div>
                            {publishedFormattedDate(article.publishedAt)} by
                            &nbsp;
                            <Link href={'/?author=' + article.author}><strong>{article.author}</strong></Link>
                            &nbsp;&nbsp;&nbsp;
                            <Button href={'/?source=' + article.source.slug} variant="dark" size="sm">
                                {article.source.title}
                            </Button>
                        </div>
                        {article.teaser && <p>{article.teaser}</p>}
                        <hr className="my-4"/>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default HomePage;