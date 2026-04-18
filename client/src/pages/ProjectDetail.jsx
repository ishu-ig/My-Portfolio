import React, { useEffect, useState } from "react";
import { getPortfolio } from "../Redux/ActionCreartors/PortfolioActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProjectDetails() {
  const { _id } = useParams();

  const [data, setData] = useState(null);
  const [relatedData, setRelatedData] = useState([]);
  const PortfolioStateData = useSelector((state) => state.PortfolioStateData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  useEffect(() => {
    if (PortfolioStateData.length) {
      const selectedProject = PortfolioStateData.find((x) => x._id === _id);
      setData(selectedProject || null);

      const otherProjects = PortfolioStateData.filter((x) => x._id !== _id);
      setRelatedData(otherProjects);
    }
  }, [PortfolioStateData, _id]);

  if (!data)
    return <div className="text-center py-5">Loading project details...</div>;

  return (
    <>
      {/* PROJECT DETAILS */}
      <section className="project-details-enhanced py-5">
        <div className="container text-center">
          <h2
            className="section-title mb-3  title-font"
            style={{ color: "var(--text-color)" }}
          >
            {data.name}
          </h2>

          <div className="title-underline mx-auto mb-4"></div>

          <div className="project-image-wrapper mb-4">
            <img
              src={`${process.env.REACT_APP_BACKEND_SERVER}/${data.pic}`}
              alt={data.name}
              className="project-image"
            />
          </div>

          <p className="short-description lead px-3 text-center mobile-font ">
            {data.shortDescription}
          </p>

          <hr className="custom-divider my-4" />

          <div
            className="long-description px-3 text-justify long-description-text"
            dangerouslySetInnerHTML={{ __html: data.longDescription }}
          ></div>

          <div className="project-meta mt-4 px-3 glass-card ">
            <p>
              <strong className="mobile-font">Category:</strong> {data.category}
            </p>
            <p>
              <strong className="mobile-font">Tech Stack:</strong> {data.tech}
            </p>
          </div>

          <div className="button-row mt-4">
            {data.githubRepo && (
              <a
                href={data.githubRepo}
                target="_blank"
                className="btn modern-btn-small me-3"
              >
                GitHub Repo
              </a>
            )}
            <Link to="/" className="btn modern-btn-small px-5">
              Home
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      {/* RELATED PROJECTS */}
      {/* RELATED PROJECTS */}
      <section className="related-projects py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2
              className="section-title"
              style={{ color: "var(--text-color)" }}
            >
              Other Projects
            </h2>
            <div className="title-underline mx-auto"></div>
          </div>

          {/* Swiper Import */}
          {/* IMPORTANT: Add at the top of the file */}
          {/*
            import { Swiper, SwiperSlide } from "swiper/react";
            import { Pagination, Autoplay } from "swiper/modules";
            import "swiper/css";
            import "swiper/css/pagination";
        */}

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2500 }}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {relatedData.length === 0 ? (
              <p className="text-center">No other projects available.</p>
            ) : (
              relatedData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="portfolio-card-upgraded h-100">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`}
                      alt={item.name}
                      height={200}
                      className="portfolio-card-img"
                    />

                    <div className="portfolio-card-body text-center">
                      <h5 className="card-title fw-bold">{item.name}</h5>
                      <p style={{ color: "var(--text-color)" }}>
                        {item.category}
                      </p>

                      <Link
                        to={`/projectDetail/${item._id}`}
                        className="btn modern-btn-small"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <style>
          {`
/* ===== MAIN PROJECT IMAGE ===== */
.project-image-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.project-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

/* ===== SWIPER / CARD IMAGES ===== */
.portfolio-card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

/* ===== CARD STYLING ===== */
.portfolio-card-upgraded {
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.portfolio-card-upgraded:hover {
  transform: translateY(-5px);
}

/* ===== MOBILE RESPONSIVE ===== */
@media (max-width: 768px) {
  .project-image {
    max-height: 250px;
  }

  .portfolio-card-img {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .portfolio-card-img {
    height: 150px;
  }
}
`}
        </style>
      </section>
    </>
  );
}
