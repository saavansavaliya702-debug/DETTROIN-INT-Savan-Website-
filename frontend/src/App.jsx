import { useState } from "react";

const API = import.meta.env.VITE_API_URL || "https://dettroin-int-savan-website-1.onrender.com";
const navLinks = [
  ["About", "#about"],
  ["Learning", "#learning"],
  ["Student life", "#life"],
  ["Community", "#stories"],
  ["Contact", "#contact"],
];
function EnquiryForm({ onDone }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    interest: "Admissions for 2026-27",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    // Prevent double-click / double submission
    if (sending) return;

    setSending(true);
    setStatus("");
    setStatusType("");

    try {
      // Only ONE fetch request
      const response = await fetch(`${API}/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save enquiry.");
      }

      setStatus("Success! Your enquiry has been saved in MongoDB.");
      setStatusType("success");

      setData({
        name: "",
        email: "",
        interest: "Admissions for 2026-27",
      });

      onDone?.();
    } catch (error) {
      setStatus(error.message || "Unable to save enquiry.");
      setStatusType("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className='enquiry-form' onSubmit={submit}>
      <label>
        Parent / guardian name
        <input
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder='Savan Savaliya'
        />
      </label>

      <label>
        Email address
        <input
          required
          type='email'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder='savan@example.com'
        />
      </label>

      <label>
        I'm interested in
        <select
          value={data.interest}
          onChange={(e) => setData({ ...data, interest: e.target.value })}>
          <option>Admissions for 2026-27</option>
          <option>Booking a campus visit</option>
          <option>Speaking to admissions</option>
        </select>
      </label>

      <button className='btn cream' type='submit' disabled={sending}>
        {sending ? "Saving..." : "Send enquiry"}
      </button>

      {status && (
        <p className={`database-message ${statusType}`} aria-live='polite'>
          {status}
        </p>
      )}
    </form>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const open = () => {
    setModal(true);
    setMenu(false);
  };
  return (
    <>
      <a className='skip' href='#main'>
        Skip to content
      </a>
      <div className='topbar'>
        <div className='shell'>
          <span>Admissions open for 2026-27</span>
          <a href='#visit'>Book a campus visit</a>
        </div>
      </div>
      <header>
        <div className='shell nav'>
          <a className='brand' href='#top'>
            <i>V</i>
            <span>
              <strong>VASANT</strong>
              <small>VALLEY SCHOOL</small>
            </span>
          </a>
          <button
            className='menu'
            onClick={() => setMenu(!menu)}
            aria-label='Toggle navigation'>
            ☰
          </button>
          <nav className={menu ? "open" : ""}>
            {navLinks.map(([text, href]) => (
              <a onClick={() => setMenu(false)} key={href} href={href}>
                {text}
              </a>
            ))}
            <button className='btn small' onClick={open}>
              Enquire now →
            </button>
          </nav>
        </div>
      </header>
      <main id='main'>
        <section className='hero' id='top'>
          <div className='shell hero-copy'>
            <p className='eyebrow light'>A place to grow boldly</p>
            <h1>
              Learning that
              <br />
              <em>moves with you.</em>
            </h1>
            <p>
              A future-facing education rooted in curiosity, character and
              meaningful connection.
            </p>
            <button className='btn cream' onClick={open}>
              Start your journey →
            </button>
          </div>
        </section>
        <section className='section shell' id='about'>
          <p className='eyebrow'>Welcome to Vasant Valley</p>
          <div className='split'>
            <h2>
              We see education as a living, <em>human</em> experience.
            </h2>
            <p>
              At Vasant Valley, every child is known, challenged and celebrated.
              Our joyful, purposeful environment lets learners question deeply,
              act kindly and shape the world around them.
            </p>
          </div>
        </section>
        <section className='stats'>
          <div className='shell'>
            {[
              ["30+", "years of learning"],
              ["1,200", "curious learners"],
              ["18:1", "student-teacher ratio"],
              ["40+", "clubs & pursuits"],
            ].map(([number, label]) => (
              <div key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className='section learning' id='learning'>
          <div className='shell'>
            <p className='eyebrow'>A learning journey</p>
            <h2>
              Every stage, its own <em>possibility.</em>
            </h2>
            <div className='cards'>
              {[
                ["Early Years", "Wonder begins here.", "early"],
                ["Primary Years", "Building confident foundations.", "primary"],
                ["Middle Years", "Finding a voice and a path.", "middle"],
                ["Senior School", "Ready to make a difference.", "senior"],
              ].map(([title, text, style], i) => (
                <article key={title} className={`card ${style}`}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <button onClick={open}>Explore →</button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className='quote'>
          <div className='shell'>
            <p className='eyebrow light'>What guides us</p>
            <blockquote>
              “The aim of education is not to fill a vessel, but to light a
              fire.”
            </blockquote>
            <small>— W. B. YEATS</small>
          </div>
        </section>
        <section className='section shell experience' id='life'>
          <div className='experience-image' />
          <div>
            <p className='eyebrow'>Beyond the classroom</p>
            <h2>
              A school day full of <em>discovery.</em>
            </h2>
            <p>
              From the studio to the playing field, the garden to the stage,
              students find the spaces and people that bring their interests to
              life.
            </p>
            <ul>
              <li>Arts, design & expression</li>
              <li>Sport & wellbeing</li>
              <li>Service & leadership</li>
            </ul>
            <button className='btn dark' onClick={open}>
              See student life →
            </button>
          </div>
        </section>
        <section className='visit' id='visit'>
          <div className='shell'>
            <div>
              <p className='eyebrow'>Come and see</p>
              <h2>
                Meet our <em>community.</em>
              </h2>
              <p>Walk our campus, meet our educators and ask every question.</p>
              <button className='btn cream' onClick={open}>
                Book a visit →
              </button>
            </div>
          </div>
        </section>
        <section className='section shell' id='stories'>
          <p className='eyebrow'>From our community</p>
          <h2>
            Stories in <em>motion.</em>
          </h2>
          <div className='stories'>
            {[
              "Young makers turn ideas into impact at our annual Design Fair",
              "A closer look at the questions driving Grade 8 inquiry",
              "Planting a greener future, one native sapling at a time",
            ].map((story, i) => (
              <article key={story}>
                <div className={`story-image image-${i}`} />
                <small>COMMUNITY · MAY 2026</small>
                <h3>{story}</h3>
                <a href='#contact'>Read story →</a>
              </article>
            ))}
          </div>
        </section>
        <section className='contact' id='contact'>
          <div className='shell contact-grid'>
            <div>
              <p className='eyebrow light'>Let's talk</p>
              <h2>
                Your child's next <em>chapter begins here.</em>
              </h2>
              <p>
                Tell us a little about your family and our admissions team will
                be in touch.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>
      <footer>
        <div className='shell'>
          © 2026 Vasant Valley School · Redesign concept
        </div>
      </footer>
      {modal && (
        <div
          className='modal'
          onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className='modal-card'>
            <button
              className='close'
              onClick={() => setModal(false)}
              aria-label='Close'>
              ×
            </button>
            <p className='eyebrow'>Admissions 2026-27</p>
            <h2>Let's begin.</h2>
            <p>
              Share your details and we'll arrange your personal introduction.
            </p>
            <EnquiryForm
              onDone={() => setTimeout(() => setModal(false), 1200)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
