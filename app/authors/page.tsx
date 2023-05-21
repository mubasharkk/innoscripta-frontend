"use client"

import Link from "next/link";
import {Accordion} from "react-bootstrap";

export async function getAuthors() {
    const res = await fetch('http://localhost:8080/api/authors?locale=en&country=us&page=50')
        .then((response) => response.json());

    return res.data;
}

const AuthorsPage = async () => {

    const authors = await getAuthors();

    let data = authors.reduce((r, e) => {
        // get first letter of name of current element
        let group = e[0].toUpperCase();
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = {group, children: [e]}
        // if there is push current element to children array for that letter
        else r[group].children.push(e);
        // return accumulator
        return r;
    }, {});

    return (
        <section className="">
            <h3>Authors</h3>
            <ul>
                {Object.entries(data).map(([name, group]) => (
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey={name._id}>
                            <Accordion.Header>{name}</Accordion.Header>
                            <Accordion.Body>
                                <ul className="dark:prose-invert">
                                    {group.children.map((author) => (
                                        <li key={author._id}>
                                            <Link href={'/?author=' + author}>{author}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </ul>
        </section>
    )
}


export default AuthorsPage;