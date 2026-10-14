
import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Classic Sneakers", category: "Shoes", price: 1499, oldPrice: 1999, emoji: "👟", color: "#f4e9dc", rating: 4.8 },
  { id: 2, name: "Everyday Backpack", category: "Bags", price: 999, oldPrice: 1299, emoji: "🎒", color: "#e5e9f5", rating: 4.6 },
  { id: 3, name: "Minimal Watch", category: "Accessories", price: 1899, oldPrice: 2499, emoji: "⌚", color: "#e9e4dc", rating: 4.9 },
  { id: 4, name: "Wireless Headphones", category: "Electronics", price: 2299, oldPrice: 2999, emoji: "🎧", color: "#e4edf0", rating: 4.7 },
  { id: 5, name: "Everyday T-Shirt", category: "Clothing", price: 599, oldPrice: 799, emoji: "👕", color: "#f1e2e7", rating: 4.5 },
  { id: 6, name: "Classic Sunglasses", category: "Accessories", price: 799, oldPrice: 1099, emoji: "🕶️", color: "#e8e6df", rating: 4.4 },
  { id: 7, name: "Running Shoes", category: "Shoes", price: 1799, oldPrice: 2299, emoji: "👟", color: "#e2eddf", rating: 4.8 },
  { id: 8, name: "Travel Bag", category: "Bags", price: 1399, oldPrice: 1799, emoji: "👜", color: "#f0e6d8", rating: 4.6 },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [sort, setSort] = useState("featured");
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, category, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);

      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to cart`);
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleWishlist(id) {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  return (
    <div className="app">
      <div className="announcement">
        ✦ A little something for your everyday style · Free shipping over ₹2,000
      </div>

      <header className="navbar">
        <a className="brand" href="#home">shopora<span>.</span></a>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" onClick={() => {
            setShowCart(false);
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }} aria-label="Search products">⌕</button>

          <button className="icon-button" onClick={() => setShowCart(!showCart)}>
            🛍️ <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">THE EVERYDAY EDIT</p>
            <h1>Find your<br />kind of <span>everyday.</span></h1>
            <p className="hero-description">
              Thoughtfully picked essentials to make your everyday a little more special.
            </p>
            <a className="primary-button" href="#products">Explore collection ↗</a>
            <div className="hero-note">✳ Everyday essentials, thoughtfully chosen.</div>
          </div>

          <div className="hero-art" aria-label="Shopping collection illustration">
            <div className="art-circle"></div>
            <div className="art-card art-card-one">👟</div>
            <div className="art-card art-card-two">👜</div>
            <div className="art-card art-card-three">⌚</div>
            <div className="art-label">YOUR STYLE, YOUR STORY ✦</div>
          </div>
        </section>

        <section className="benefits">
          <div>✦ <span><b>Curated picks</b><small>Everyday favourites</small></span></div>
          <div>♡ <span><b>Made for you</b><small>Find your personal style</small></span></div>
          <div>↗ <span><b>Easy shopping</b><small>A smooth shopping experience</small></span></div>
        </section>

        <section className="products-section" id="products">
          <div className="section-top">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>Good finds, <span>great feels.</span></h2>
              <p className="muted">Little things that make a big difference.</p>
            </div>
            <label className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
            </label>
          </div>

          <div className="toolbar">
            <div className="categories">
              {["All", "Clothing", "Shoes", "Bags", "Accessories", "Electronics"].map((item) => (
                <button
                  key={item}
                  className={category === item ? "category active" : "category"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to high</option>
              <option value="high">Price: High to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          {notice && <p className="notice" role="status">{notice}</p>}

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-art" style={{ backgroundColor: product.color }}>
                  <span className="product-emoji">{product.emoji}</span>
                  <span className="sale-label">PICKED FOR YOU</span>
                  <button
                    className={wishlist.includes(product.id) ? "heart liked" : "heart"}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Toggle ${product.name} wishlist`}
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <div className="rating">★ {product.rating} <span>· Loved by shoppers</span></div>
                  <div className="price-row">
                    <div>
                      <b>{money(product.price)}</b>
                      <del>{money(product.oldPrice)}</del>
                    </div>
                    <button className="add-button" onClick={() => addToCart(product)}>
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <span>⌕</span>
              <h3>No products found</h3>
              <p>Try a different search or category.</p>
              <button className="primary-button" onClick={() => {
                setSearch("");
                setCategory("All");
              }}>Show all products</button>
            </div>
          )}
        </section>

        {showCart && (
          <section className="cart-section" id="cart">
            <div className="cart-title">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2>Your shopping bag</h2>
              </div>
              <button className="close-button" onClick={() => setShowCart(false)}>Close ×</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Your bag is waiting for something lovely.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-line" key={item.id}>
                    <span className="cart-product-art" style={{ backgroundColor: item.color }}>
                      {item.emoji}
                    </span>
                    <div className="cart-product-name">
                      <b>{item.name}</b>
                      <span>{money(item.price)} each</span>
                      <div className="quantity">
                        <button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                      </div>
                    </div>
                    <b>{money(item.price * item.quantity)}</b>
                  </div>
                ))}
                <div className="cart-summary">
                  <span>Total</span>
                  <strong>{money(total)}</strong>
                </div>
                <p className="muted">Demo only: checkout and payment are not connected.</p>
                <button className="primary-button" onClick={() => setNotice("Demo checkout: no real order or payment was made.")}>
                  Continue to checkout
                </button>
              </>
            )}
          </section>
        )}

        <section className="about-section" id="about">
          <p className="eyebrow">A LITTLE ABOUT SHOPORA</p>
          <h2>Simple finds. <span>Thoughtful living.</span></h2>
          <p>This demo storefront was created to practise React components, state management, product filtering and shopping cart functionality.</p>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">shopora<span>.</span></a>
        <p>Designed with care. Built for practice.</p>
        <p>© {new Date().getFullYear()} Shopora Demo Store</p>
      </footer>
    </div>
  );
}

export default App;
