import React from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import Portrait from "@/components/worlds/Portrait";
import {
  Owl,
  Flower,
  FolkBorder,
  FishRule,
  AddaWordmark,
} from "@/components/worlds/Motifs";
import { books, photographySeries } from "@/data/creativeContent";
import { openSourceProjects } from "@/data/projectsData";
import AddaPageHeader, {
  AddaPageEnd,
} from "@/components/worlds/AddaPageHeader";
export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <div className={`book-cover book-${book.id}`}>
        <span>A WORK IN PROGRESS</span>
        <Flower />
        <strong>{book.title}</strong>
        <span>SASWATA S. SENGUPTA</span>
        <small>Provisional cover concept</small>
      </div>
      <div>
        <p className="eyebrow">
          {book.status} / MANUSCRIPT {book.cover}
        </p>
        <h2>{book.title}</h2>
        <p>{book.note}</p>
        <p className="book-footnote">
          An unpublished manuscript. No release date announced.
        </p>
      </div>
    </article>
  );
}
export default function Adda() {
  const series = photographySeries[0];
  return (
    <div className="adda-home">
      <PageMeta
        title="Adda | Saswata S. Sengupta"
        description="Pull up a chair at Adda, Saswata’s personal side. Little stories, a writing desk, films that linger and a little Bengal."
      />
      <FolkBorder />
      <section className="adda-hero shared-hero">
        <div className="adda-hero-copy">
          <p className="eyebrow">COME IN. THERE’S ROOM FOR ANOTHER STORY.</p>
          <AddaWordmark />
          <h1>
            The world is full
            <br />
            of <em>little stories.</em>
          </h1>
          <p>
            A conversation that goes on a little longer.
            <br />
            Welcome to the other side of my workbench.
          </p>
          <a className="adda-button" href="#adda-shelf">
            Take a look around ↓
          </a>
        </div>
        <div className="adda-portrait-wrap">
          <Flower className="portrait-flower" />
          <Portrait world="adda" />
          <span className="adda-handnote">
            Same person,
            <br />
            another lens.
          </span>
        </div>
        <img
          className="adda-skyline"
          src="/assets/adda/kolkata-skyline.svg"
          alt=""
          aria-hidden="true"
          width="1800"
          height="500"
        />
        <Owl className="adda-hero-owl" />
      </section>
      <FishRule />
      <nav className="adda-contents" aria-label="Explore Adda">
        <span className="eyebrow">AROUND THE TABLE</span>
        <a href="#adda-shelf">A second look ↘</a>
        <a href="#adda-desk">On the desk ↘</a>
        <a href="#adda-cinema">After the credits ↘</a>
        <a href="#adda-person">The person ↘</a>
      </nav>
      <section className="adda-feature shared-section" id="adda-shelf">
        <div className="editorial-heading">
          <span>01 / THROUGH THE VIEWFINDER</span>
          <h2>A few things that stayed with me.</h2>
          <Link className="adda-button" to="/photography">
            Explore photographs ↗
          </Link>
        </div>
        <Link to={`/photography/${series.slug}`} className="featured-photo">
          <img
            src="/assets/adda/courtyard-study.svg"
            width="1400"
            height="900"
            alt="Concept illustration of a sunlit Kolkata courtyard"
          />
          <span>CONCEPT ILLUSTRATION · AWAITING YOUR PHOTOGRAPHS</span>
        </Link>
        <div className="photo-note">
          <h3>A place for photographs</h3>
          <p>
            Original photographs are coming. For now, a graphic study of light
            and composition — a preview of the gallery, not my photographic
            work.
          </p>
        </div>
      </section>
      <FolkBorder />
      <section className="adda-books shared-section" id="adda-desk">
        <div className="editorial-heading">
          <span>02 / ON THE WRITING DESK</span>
          <h2>Not yet on a bookshelf.</h2>
          <Link className="adda-button" to="/writing">
            Open the writing desk ↗
          </Link>
        </div>
        <div className="personal-book-feature">
          <Link
            to="/writing"
            className="book-cover book-one"
            aria-label="Explore two unpublished manuscripts"
          >
            <span>ON THE WRITING DESK</span>
            <Flower />
            <strong>
              North
              <br />
              Kolkata.
            </strong>
            <small>Working cover study · title unconfirmed</small>
          </Link>
          <div>
            <p className="eyebrow">TWO UNPUBLISHED MANUSCRIPTS</p>
            <h3>
              Two books.
              <br />
              Still becoming.
            </h3>
            <p>A detective story in North Kolkata.</p>
            <p>A school and a town with questions.</p>
            <Link className="text-link" to="/writing">
              Open the writing desk ↗
            </Link>
          </div>
        </div>
      </section>
      <FishRule />
      <section className="cinema-fragment shared-section" id="adda-cinema">
        <span className="eyebrow">03 / AFTER THE CREDITS</span>
        <div>
          <h2>
            Some films
            <br />
            follow you home.
          </h2>
          <p>
            Satyajit Ray and Rituparno Ghosh; plenty of Hollywood, some
            Bollywood. A growing corner for the films and conversations that
            stay with me.
          </p>
          <Link className="text-link" to="/cinema">
            Stay for the cinema ↗
          </Link>
        </div>
        <span className="film-reel" aria-hidden="true">
          ◉
        </span>
      </section>
      <section className="adda-personal shared-section" id="adda-person">
        <Owl />
        <div>
          <p className="eyebrow">04 / THE PERSON AT THE TABLE</p>
          <h2>Hi, I’m Saswata.</h2>
          <p>
            Kolkata is home. I cook, make photographs, and watch films
            analytically. Before product management, I worked as a freelance
            photographer, leading commercial shoots and a creative team.
          </p>
          <Link className="text-link" to="/adda/about">
            A little more about me ↗
          </Link>
        </div>
      </section>
      <FolkBorder />
      <section className="shared-section shared-contact">
        <p className="eyebrow">আড্ডা</p>
        <h2>
          Another story?
          <br />
          <em>There’s always room.</em>
        </h2>
        <Link className="material-button" to="/contact?world=adda">
          Say hello ↗
        </Link>
      </section>
    </div>
  );
}
export function Writing() {
  return (
    <div className="world-page editorial-page">
      <PageMeta
        title="Writing — Two unpublished books | Saswata S. Sengupta"
        description="Two unpublished manuscripts: a North Kolkata detective story and a societal story about school and education in a fictional town."
      />
      <AddaPageHeader
        label="Writing"
        variant="writing"
        title={
          <>
            Stories,
            <br />
            <em>still becoming.</em>
          </>
        }
        description="Two unpublished books. Two different questions. Both still on my desk."
      />
      <FolkBorder />
      {books.map((book) => (
        <BookPreview key={book.id} book={book} />
      ))}
      <AddaPageEnd />
    </div>
  );
}
export function Cinema() {
  const projects = openSourceProjects.filter((p) =>
    ["11 PM Cinema", "FilmRisk.AI", "Topshe"].includes(p.name),
  );
  return (
    <div className="world-page editorial-page">
      <PageMeta
        title="Cinema | Saswata S. Sengupta"
        description="Satyajit Ray, Rituparno Ghosh and a wider world of cinema. Film reflections to come, alongside cinema-inspired builds."
      />
      <AddaPageHeader
        label="Cinema"
        variant="cinema"
        title={
          <>
            The film ends.
            <br />
            <em>The conversation stays.</em>
          </>
        }
        description="A few influences, a few experiments, and room for the films that linger."
      />
      <FishRule />
      <div className="reading-column">
        <h2>A few names, for now.</h2>
        <p>
          Satyajit Ray. Rituparno Ghosh. A lot of Hollywood and some Bollywood.
          Specific films and personal reflections will join this space later.
        </p>
        <p>
          Until then, here’s where that curiosity has already met the workbench.
        </p>
      </div>
      <div className="cinema-projects">
        {projects.map((p) => (
          <article key={p.name}>
            <p className="eyebrow">CULTURE ↔ BUILDING</p>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <Link
              className="text-link"
              to={`/builds#${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              Explore the implementation at Workbench ↗
            </Link>
          </article>
        ))}
      </div>
      <AddaPageEnd />
    </div>
  );
}
export function AddaAbout() {
  return (
    <div className="world-page editorial-page">
      <PageMeta
        title="The observer | Saswata S. Sengupta"
        description="Saswata’s personal side: Kolkata, photography, cooking, cinema and two unpublished manuscripts."
      />
      <AddaPageHeader
        label="About"
        title={
          <>
            Same curiosity.
            <br />
            <em>Another lens.</em>
          </>
        }
        description="Kolkata is home. This is a little of the life around the work."
      />
      <div className="personal-intro">
        <div>
          <span className="eyebrow">THE PERSON AT THE TABLE</span>
          <h2>Hi, I’m Saswata.</h2>
          <div className="reading-column">
            <p>
              I’m Saswata S. Sengupta, based in Kolkata. I explore digital
              products, cook, shoot photography, and watch films analytically.
            </p>
            <p>
              From September 2019 to June 2021, I worked as a freelance
              photographer, completing more than 58 event and commercial
              projects and leading a six-person creative team.
            </p>
            <p>
              Today, alongside my product work, I’m writing two unpublished
              books: a detective story involving serial killings in North
              Kolkata, and a societal story about school and education in a
              fictional town.
            </p>
            <p>
              This is a place for that side of my life: the things I notice, the
              questions that linger, and Bengal.
            </p>
            <Link className="text-link" to="/contact?world=adda">
              Let’s start a conversation ↗
            </Link>
          </div>
        </div>
        <Portrait world="adda" />
      </div>
      <FolkBorder />
      <AddaPageEnd />
    </div>
  );
}
