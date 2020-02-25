import React, { useEffect } from 'react';
import { useStoreData } from './context';
import { useDispatch } from './context';

const Error = () => {
	const { errorCounter } = useDispatch('counter');
	return <button onClick={errorCounter}>Error (open console)</button>;
};

const Pager = () => {
	const { page } = useStoreData('page');
	const { increasePage, decreasePage } = useDispatch('page');

	return (
		<div id="page">
			<h2>Page: {page}</h2>
			<div id="page-controls">
				<button
					onClick={(e) => {
						e.preventDefault();
						decreasePage();
					}}
				>
					Decrease
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						increasePage();
					}}
				>
					Increase
				</button>
			</div>
		</div>
	);
};

const PostsList = () => {
	const { page } = useStoreData('page');
	const { posts } = useStoreData('posts');
	const { fetchPosts, selectPost } = useDispatch('posts');

	useEffect(() => {
		fetchPosts(page);
		// eslint-disable-next-line
	}, [page]);

	return (
		<ul>
			{Object.values(posts).map(({ id, title }) => (
				<li key={id}>
					<h4 onClick={() => selectPost(id)}>{title.rendered}</h4>
				</li>
			))}
		</ul>
	);
};

const CurrentPost = () => {
	const { currentPost, posts } = useStoreData('posts');

	const getCurrentPost = () => {
		if (!currentPost || !posts[currentPost]) {
			return false;
		}

		return posts[currentPost];
	};

	if (!getCurrentPost()) {
		return null;
	}

	return (
		<div className="current-post">
			<h1>{posts[currentPost].title.rendered}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: posts[currentPost].content.rendered,
				}}
			/>
		</div>
	);
};

const App = () => {
	return (
		<div id="app">
			<Error />
			<Pager />
			<PostsList />
			<CurrentPost />
		</div>
	);
};

export default App;
