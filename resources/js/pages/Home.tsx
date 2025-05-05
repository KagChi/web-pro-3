import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    products: Product[]
}

export default function Home({ products }: Props) {
    useEffect(() => {
        const map = L.map('map').setView([-7.2575, 112.7521], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-7.2575, 112.7521]).addTo(map)
            .bindPopup('Our Store Location')
            .openPopup();

        return () => {
            map.remove();
        };
    }, []);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-color px-2">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img className="rounded-circle" src="./assets/Logo.png" alt="Logo" height="40" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse p-2" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#product">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <header className="hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold">Kebutuhan Material Bangunan Anda, Kami yang Penuhi</h1>
                            <p className="lead">Dari semen hingga pipa, dari cat hingga pasir, semua tersedia dengan harga terbaik dan
                                pengiriman cepat!</p>
                            <a href="#contact" className="btn btn-primary btn-lg me-2" style={{ backgroundColor: '#FF0B55', borderColor: '#FF0B55' }}><i className="bi bi-whatsapp me-2"></i>Hubungi Kami</a>
                            <a href="#product" className="btn btn-outline-primary btn-lg" style={{ color: '#FF0B55', borderColor: '#FF0B55' }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FF0B55';
                                e.currentTarget.style.color = 'white';
                            }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#FF0B55';
                                }}>Lihat Produk</a>
                        </div>
                        <div className="col-lg-6 py-4">
                            <img src="assets/Hero.jpg" alt="Toko Material" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-5" id="product">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Kenapa Memilih Kami?</h2>
                        <p className="text-muted">Kami hadir dengan fitur lengkap dan layanan premium</p>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            {products.map((product) => (
                                <div className="col-md-4" key={product.id}>
                                    <div className="featured-product-card">
                                        <div className="featured-product-image" style={{ backgroundImage: `url(/storage/${product.image})` }} />
                                        <div className="featured-product-details">
                                            <h3 className="mb-3">{product.title}</h3>
                                            <p className="mb-3">{product.desc}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">Price: {product.price}</span>
                                                <a href="#" className="btn btn-primary"
                                                    style={{ backgroundColor: '#FF0B55', borderColor: '#FF0B55' }}>Lihat Produk</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-box text-center p-4 border rounded shadow-sm h-100">
                                <div className="icon-circle">
                                    <i className="bi bi-speedometer2"></i>
                                </div>
                                <h5>Performa Tinggi</h5>
                                <p>Website dan aplikasi kami bekerja cepat dan efisien, tanpa kompromi.</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-box text-center p-4 border rounded shadow-sm h-100">
                                <div className="icon-circle">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                                <h5>Keamanan Terjamin</h5>
                                <p>Keamanan data Anda adalah prioritas utama dengan sistem berlapis.</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-box text-center p-4 border rounded shadow-sm h-100">
                                <div className="icon-circle">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <h5>Dukungan 24/7</h5>
                                <p>Tim support kami siap membantu kapan pun Anda butuhkan.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <div id='contact' className="container my-5">
                <h1 className="text-center mb-4" id="kontak">Hubungi Kami</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="map-container" id="map"></div>
                    </div>
                    <div className="col-md-6">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nama</label>
                                <input type="text" className="form-control" id="name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Pesan</label>
                                <textarea className="form-control" id="message" rows={5} required></textarea>
                            </div>
                            <button type="submit" className="btn" style={{ backgroundColor: '#FF0B55', color: 'white' }}>Kirim</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="gradient-footer text-white py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* Company Info */}
                        <div className="col-lg-4">
                            <h5 className="fw-bold mb-3">Matery</h5>
                            <p className="opacity-75">Toko material terlengkap untuk kebutuhan konstruksi Anda.</p>
                            <div className="d-flex gap-2 mt-4">
                                <a href="#" className="social-icon">
                                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon">
                                    <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                                        <path
                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-4">
                            <h6 className="fw-bold mb-3">Tautan Cepat</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="footer-link">Tentang Kami</a></li>
                                <li className="mb-2"><a href="#" className="footer-link">Layanan</a></li>
                                <li className="mb-2"><a href="#" className="footer-link">Portofolio</a></li>
                                <li className="mb-2"><a href="#" className="footer-link">Kontak</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="col-lg-2 col-md-4">
                            <h6 className="fw-bold mb-3">Sumber Daya</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="footer-link">Blog</a></li>
                                <li className="mb-2"><a href="#" className="footer-link">Dokumentasi</a></li>
                                <li className="mb-2"><a href="#" className="footer-link">Dukungan</a></li>
                                <li className="mb-2"><a href="#" className="footer-link">Kebijakan Privasi</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="col-lg-4">
                            <h6 className="fw-bold mb-3">Berlangganan Newsletter</h6>
                            <p className="opacity-75">Dapatkan berita dan update terbaru dari kami.</p>
                            <div className="input-group mt-3">
                                <input type="email" className="form-control newsletter-input" placeholder="Masukkan email Anda" />
                                <button className="btn btn-light px-4" type="button">Berlangganan</button>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4 opacity-25" />

                    {/* Copyright */}
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <small className="opacity-75">© 2024 Materalis. All rights reserved.</small>
                        </div>
                        <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
                            <a href="#" className="footer-link me-3"><small>Terms of Service</small></a>
                            <a href="#" className="footer-link me-3"><small>Privacy Policy</small></a>
                            <a href="#" className="footer-link"><small>Cookie Policy</small></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
