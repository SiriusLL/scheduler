function Tweet(props) {
  // Using the provided JSX return a tree of elements that represents a single tweet
  return (
    <article className="tweet">
      <header className="tweet__header">
        <img
          className="tweet__header-avatar"
          src="{props.avatar}"
          alt="User Avatar"
        />
        <h2 className="tweet__header-name">{props.name}</h2>
      </header>
      <main className="tweet__content">
        <p>{props.content}</p>
      </main>
      <footer className="tweet__footer">{props.date}</footer>
    </article>
  );
}
