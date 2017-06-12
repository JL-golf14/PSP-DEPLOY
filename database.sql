
-- create DB

CREATE TABLE main_topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(10000),
  active boolean DEFAULT false,
  upcoming boolean DEFAULT false
);

CREATE TABLE subtopics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(10000),
  main_id integer REFERENCES main_topics
  active boolean DEFAULT false,
  upcoming boolean DEFAULT false
);

CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(5000),
  subtopics_id integer REFERENCES subtopics (id),
  users_email integer REFERENCES users (email)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(2500),
  idea_id integer REFERENCES ideas,
  user_id integer REFERENCES users
);

CREATE TABLE comments_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE comments_flags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE subcomments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(2500),
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE sublikes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  subcomment_id integer REFERENCES subcomments
);

CREATE TABLE subflags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  subcomment_id integer REFERENCES subcomments
);

CREATE TABLE ideas_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE ideas_loves (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE ideas_flags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address VARCHAR(2500) NOT NULL,
  ward VARCHAR(80),
  admin BOOLEAN DEFAULT false,
  photo VARCHAR(80)
);

ALTER TABLE users
ADD active BOOLEAN DEFAULT true;

CREATE TABLE user_filter (
  id SERIAL PRIMARY KEY,
  filter VARCHAR(80) NOT NULL
);

INSERT INTO user_filter (id, filter)
VALUES(1, 'name'),
(2, 'email'),
(3, 'ward');


ALTER TABLE main_topics
ADD upcoming BOOLEAN DEFAULT false;


-----------


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address VARCHAR(2500) NOT NULL,
  ward INTEGER,
  admin BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT false,
  city VARCHAR(200),
  state VARCHAR(200),
  zipcode VARCHAR(200),
  photo VARCHAR(300)
);

CREATE TABLE main_topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(10000),
  active BOOLEAN DEFAULT false,
  upcoming BOOLEAN DEFAULT false
);

CREATE TABLE subtopics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(10000),
  main_id integer REFERENCES main_topics,
  active BOOLEAN DEFAULT false,
  upcoming BOOLEAN DEFAULT false
);

CREATE TABLE ideas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80),
  description VARCHAR(5000),
  subtopics_id integer REFERENCES subtopics,
  user_id integer REFERENCES users
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(2500),
  idea_id integer REFERENCES ideas,
  user_id integer REFERENCES users
);

CREATE TABLE comments_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE comments_flags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE subcomments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(2500),
  user_id integer REFERENCES users,
  comment_id integer REFERENCES comments
);

CREATE TABLE subcomments_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  subcomment_id integer REFERENCES subcomments
);

CREATE TABLE subflags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  subcomment_id integer REFERENCES subcomments
);

CREATE TABLE ideas_likes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE ideas_loves (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);

CREATE TABLE ideas_flags (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users,
  idea_id integer REFERENCES ideas
);


-----------


--
-- PostgreSQL database dump
-- pspdatebase.sql (original document)
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE comments (
    id integer NOT NULL,
    description character varying(2500),
    idea_id integer,
    user_id integer
);


ALTER TABLE comments OWNER TO chris;

--
-- Name: comments_flags; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE comments_flags (
    id integer NOT NULL,
    user_id integer,
    comment_id integer,
    flag_comment text
);


ALTER TABLE comments_flags OWNER TO chris;

--
-- Name: comments_flags_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE comments_flags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_flags_id_seq OWNER TO chris;

--
-- Name: comments_flags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE comments_flags_id_seq OWNED BY comments_flags.id;


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_id_seq OWNER TO chris;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: comments_likes; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE comments_likes (
    id integer NOT NULL,
    user_id integer,
    comment_id integer
);


ALTER TABLE comments_likes OWNER TO chris;

--
-- Name: comments_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE comments_likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_likes_id_seq OWNER TO chris;

--
-- Name: comments_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE comments_likes_id_seq OWNED BY comments_likes.id;


--
-- Name: ideas; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE ideas (
    id integer NOT NULL,
    title character varying(80),
    description character varying(5000),
    subtopics_id integer,
    user_id integer
);


ALTER TABLE ideas OWNER TO chris;

--
-- Name: ideas_flags; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE ideas_flags (
    id integer NOT NULL,
    user_id integer,
    idea_id integer,
    idea_flag_description text
);


ALTER TABLE ideas_flags OWNER TO chris;

--
-- Name: ideas_flags_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE ideas_flags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ideas_flags_id_seq OWNER TO chris;

--
-- Name: ideas_flags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE ideas_flags_id_seq OWNED BY ideas_flags.id;


--
-- Name: ideas_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE ideas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ideas_id_seq OWNER TO chris;

--
-- Name: ideas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE ideas_id_seq OWNED BY ideas.id;


--
-- Name: ideas_likes; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE ideas_likes (
    id integer NOT NULL,
    user_id integer,
    idea_id integer
);


ALTER TABLE ideas_likes OWNER TO chris;

--
-- Name: ideas_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE ideas_likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ideas_likes_id_seq OWNER TO chris;

--
-- Name: ideas_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE ideas_likes_id_seq OWNED BY ideas_likes.id;


--
-- Name: ideas_loves; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE ideas_loves (
    id integer NOT NULL,
    user_id integer,
    idea_id integer
);


ALTER TABLE ideas_loves OWNER TO chris;

--
-- Name: ideas_loves_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE ideas_loves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ideas_loves_id_seq OWNER TO chris;

--
-- Name: ideas_loves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE ideas_loves_id_seq OWNED BY ideas_loves.id;


--
-- Name: main_topics; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE main_topics (
    id integer NOT NULL,
    title character varying(80),
    description character varying(10000),
    active boolean DEFAULT false,
    upcoming boolean DEFAULT false
);


ALTER TABLE main_topics OWNER TO chris;

--
-- Name: main_topics_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE main_topics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE main_topics_id_seq OWNER TO chris;

--
-- Name: main_topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE main_topics_id_seq OWNED BY main_topics.id;


--
-- Name: subcomments; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE subcomments (
    id integer NOT NULL,
    description character varying(2500),
    user_id integer,
    comment_id integer
);


ALTER TABLE subcomments OWNER TO chris;

--
-- Name: subcomments_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE subcomments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subcomments_id_seq OWNER TO chris;

--
-- Name: subcomments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE subcomments_id_seq OWNED BY subcomments.id;


--
-- Name: subcomments_likes; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE subcomments_likes (
    id integer NOT NULL,
    user_id integer,
    subcomment_id integer
);


ALTER TABLE subcomments_likes OWNER TO chris;

--
-- Name: subflags; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE subflags (
    id integer NOT NULL,
    user_id integer,
    subcomment_id integer
);


ALTER TABLE subflags OWNER TO chris;

--
-- Name: subflags_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE subflags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subflags_id_seq OWNER TO chris;

--
-- Name: subflags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE subflags_id_seq OWNED BY subflags.id;


--
-- Name: sublikes_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE sublikes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sublikes_id_seq OWNER TO chris;

--
-- Name: sublikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE sublikes_id_seq OWNED BY subcomments_likes.id;


--
-- Name: subtopics; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE subtopics (
    id integer NOT NULL,
    title character varying(80),
    description character varying(10000),
    main_id integer,
    active boolean DEFAULT false,
    upcoming boolean DEFAULT false
);


ALTER TABLE subtopics OWNER TO chris;

--
-- Name: subtopics_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE subtopics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE subtopics_id_seq OWNER TO chris;

--
-- Name: subtopics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE subtopics_id_seq OWNED BY subtopics.id;


--
-- Name: user_filter; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE user_filter (
    id integer NOT NULL,
    filter character varying(80) NOT NULL
);


ALTER TABLE user_filter OWNER TO chris;

--
-- Name: user_filter_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE user_filter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_filter_id_seq OWNER TO chris;

--
-- Name: user_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE user_filter_id_seq OWNED BY user_filter.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: chris
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    email character varying(100) NOT NULL,
    address character varying(2500) NOT NULL,
    ward integer,
    admin boolean DEFAULT false,
    active boolean DEFAULT true,
    city character varying(200),
    state character varying(200),
    zipcode character varying(200),
    photo character varying(200)
);


ALTER TABLE users OWNER TO chris;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: chris
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO chris;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chris
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: comments_flags id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_flags ALTER COLUMN id SET DEFAULT nextval('comments_flags_id_seq'::regclass);


--
-- Name: comments_likes id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_likes ALTER COLUMN id SET DEFAULT nextval('comments_likes_id_seq'::regclass);


--
-- Name: ideas id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas ALTER COLUMN id SET DEFAULT nextval('ideas_id_seq'::regclass);


--
-- Name: ideas_flags id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_flags ALTER COLUMN id SET DEFAULT nextval('ideas_flags_id_seq'::regclass);


--
-- Name: ideas_likes id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_likes ALTER COLUMN id SET DEFAULT nextval('ideas_likes_id_seq'::regclass);


--
-- Name: ideas_loves id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_loves ALTER COLUMN id SET DEFAULT nextval('ideas_loves_id_seq'::regclass);


--
-- Name: main_topics id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY main_topics ALTER COLUMN id SET DEFAULT nextval('main_topics_id_seq'::regclass);


--
-- Name: subcomments id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments ALTER COLUMN id SET DEFAULT nextval('subcomments_id_seq'::regclass);


--
-- Name: subcomments_likes id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments_likes ALTER COLUMN id SET DEFAULT nextval('sublikes_id_seq'::regclass);


--
-- Name: subflags id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subflags ALTER COLUMN id SET DEFAULT nextval('subflags_id_seq'::regclass);


--
-- Name: subtopics id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subtopics ALTER COLUMN id SET DEFAULT nextval('subtopics_id_seq'::regclass);


--
-- Name: user_filter id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY user_filter ALTER COLUMN id SET DEFAULT nextval('user_filter_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: chris
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY comments (id, description, idea_id, user_id) FROM stdin;
62	Bathroom doorways are too narrow to get through. Hallways don’t allow enough room to turn around. Light switches are too high and electrical outlets too low to reach easily. Cabinets beneath a kitchen sink prevent someone from rolling up close and doing the dishes.\n\nBy the way, you spelled accommodations incorrectly!	56	79
50	Adding this cool comment.	106	1
51	bunch of dummy comments	106	1
52	why did that error out?	106	1
53	these errors are so weird	106	1
54	Which came first?\nThis chicken or the egg?	106	1
55	Adding all of the comments that are possible	106	1
49	Adding all of the comments that are possible	106	1
48	Adding all of the comments that are possible	106	1
47	Adding all of the comments that are possible	106	1
46	Adding all of the comments that are possible	106	1
45	Adding all of the comments that are possible	106	1
44	Adding all of the comments that are possible	106	1
43	Adding all of the comments that are possible	106	1
42	Adding all of the comments that are possible	106	1
41	Adding all of the comments that are possible	106	1
40	Adding all of the comments that are possible	106	1
39	Adding all of the comments that are possible	106	1
38	Adding all of the comments that are possible	106	1
37	Adding all of the comments that are possible	106	1
36	Adding all of the comments that are possible	106	1
35	Adding all of the comments that are possible	106	1
34	Adding all of the comments that are possible	106	1
33	Adding all of the comments that are possible	106	1
32	Adding all of the comments that are possible	106	1
31	Adding all of the comments that are possible	106	1
30	Adding all of the comments that are possible	106	1
29	Adding all of the comments that are possible	106	1
28	Adding all of the comments that are possible	106	1
27	Adding all of the comments that are possible	106	1
26	Adding all of the comments that are possible	106	1
25	Adding all of the comments that are possible	106	1
\.


--
-- Data for Name: comments_flags; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY comments_flags (id, user_id, comment_id, flag_comment) FROM stdin;
33	1	50	After months of crowdsourcing, it’s time to turn all of our small fixes into Minneapolis’s big solutions. How can a compound approach of multiple fixes coalesce into coherent public policy? We’ll study other cities from around the country to find models for Minneapolis to mirror, or avoid. In this topic, Minneapolitans will come together and help us finalize solutions for our public town hall and final policy product.
34	1	50	Again
37	79	62	I don't think it was necessary for this user to point out my spelling mistakes.
\.


--
-- Name: comments_flags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('comments_flags_id_seq', 37, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('comments_id_seq', 62, true);


--
-- Data for Name: comments_likes; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY comments_likes (id, user_id, comment_id) FROM stdin;
\.


--
-- Name: comments_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('comments_likes_id_seq', 42, true);


--
-- Data for Name: ideas; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY ideas (id, title, description, subtopics_id, user_id) FROM stdin;
63	Who is Ensuring The Proper Infrastructure?	 This demographic change presents a number of challenges to current research infrastructure aimed at translating discoveries to improved human health. Key issues include the need to expand the workforce trained in aging research, development of specific resources and harmonization of measures and outcomes, and a culture change within the scientific community. In particular, complexity must be represented within research design and embraced as an important aspect of review panel critiques.	12	68
54	Preparing for a Growing Population	The health care system will need to prepare for the increasing incidences of chronic conditions within the aging population, as well as develop strategies to prevent falls. An important challenge is implementation of new approaches in health care delivery to address the changing health status of this aging population. With chronic conditions on the rise in this population, their health care becomes more complex. Focusing on a single disease rather than comorbidity can result in insufficient focus on other present medical conditions.	14	72
88	Who Will Fill the Gap?	With 75 million Baby Boomers marching inexorably toward retirement, it’s clear that employers will need more than one workforce plan for replacing exiting workers. \n\nFilling the workforce gap will be a challenge. The ranks of the Gen X workers are simply not enough, while many Millennials lack the needed work experience. Foreign-born workers often face immigration challenges, while flexible or remote workers aren’t appropriate for every role.	14	71
89	 Baby Boomers Affecting the Workplace	Baby Boomers are going to shake up your workplace dynamic? In a study conducted the AARP study, only half of working Boomers said they are in good or excellent health.  We can predict that companies will be spending more on employee sick pay, as well as health insurance and life insurance benefits.\n\nThe National Institute for Occupational Safety and Health reports that older workers are less likely to have accidents on the job, but that when they do, their recovery tends to take longer. So, workers comp costs may also be impacted.	14	69
99	Who Will Take Care of My Mother?	The low birthrates of our younger generations mean that there will not, in future, be enough children or grandchildren around to take care of their parents or grandparents. If family members cannot do this, then who will? In Singapore, a special category of well-trained domestic helpers recruited from overseas helps with the daily needs of its elderly citizens. Might not a similar scheme be introduced here? I love my mother but don't have the time or experience to care for her as she ages. I need to feel comfortable that there will be structure in place in the future.	15	70
97	Not Everyone Will Retire	Another way to cover the skills gap is to retain your Baby Boomer employees on the job indefinitely. Be warned, however: Baby Boomer employees may say they plan to work into their 70s (or possibly forever), but by age 68, only 16 percent of people actually work full time (17 percent work part time), according to Gallup.\n\nYour best strategy may be to create a Boomer knowledge transfer and replacement program that focuses your senior employees on transferring their knowledge to others over a pre-retirement period of 12 to 18 months.	14	68
96	Who Will Pick up the Slack	According to Pew Research, Gen X contributes nearly 53 million workers to the U.S. economy. That leaves a gap of 10 million workers to fill the Baby Boomer gap. \n\nUnfortunately, not all Gen Xers will continue to work full time. Many in the “latchkey generation” are at a life stage with children and some must care for aging parents, too. For these workers, workplace flexibility and work/life balance are critical components of the decision to stay in, or step away from, the workforce.	14	70
100	Preparing Infrastructure	Minneapolis needs to prepare itself for the rise of the elderly!! High-traffic public space should be made more pedestrian-friendly (and thereby also more elderly-friendly) by strict enforcement against those shops which display their merchandise illegally on pavements.\n\nEvery staircase or set of steps in Minneapolis needs to have a handrail attached to help the elderly, and others, use them with greater ease and safety. This is a huge requirement which will take years to complete: All the more reason for starting on this task today!	12	71
50	Aging In Place	Cities do need to prepare for an older citizenry. A new report called “Ageing in Cities,” from the Organisation for Economic Cooperation and Development (OECD), a membership group of 30-plus countries that focuses on the global economy, notes:\n\nIn OECD countries, the population share of those over 65 years old reached 17.8 percent in 2010, up from 7.7 percent in 1950, and is expected to climb to 25.1 percent in 2050. Cities are home to 43.2 percent of this older population. Minneapolis should start planning to accomodate for this growth.	12	69
58	Return on Investment	The state of current workforce and infrastructure available for translational research in aging, and suggests important changes that are required to further translational research in aging and the care of older adults. It is imperative that isolated illness be studied in the most appropriate models, that multi-morbidity be explicitly included rather than excluded, and that outcomes of value to older adults (e.g. functional independence, quality of life).	12	70
90	Transportation by Bus	Proper bus travel etiquette ought to be more aggressively promoted and enforced. Examples are legion of younger, able-bodied passengers inappropriately hogging the supposed “special needs’’ seats on public transport and being most reluctant to give them up, even when an elderly person is left standing nearby. More education on civic duties and better public manners should be introduced in schools, when young minds are more malleable, to rectify this disgraceful yet widespread problem.	12	71
101	Sustainable Development	Aging baby boomers want many of the same things as millennials. They want to be mobile and social, with easy access to bus stops, grocery stores, parks, pharmacies and hospitals,” noting, “that means cities and suburbs must adapt. Examining nine OECD cities specifically, from Philadelphia to Toyama, Japan, the report defines sustainable development trends and suggests policies — and points out that while there are challenges to adapting, there’s also opportunity.	12	69
56	Accomodations	When cities make an effort to accommodate “aging in place,” they typically end up with designs that benefit younger residents too.\n\nRELATED STORIES\nMapping of History of Cities Is Modern-Day Encyclopedia for Urbanists\nConfronting Urban Design’s Diversity Crisis With a Return to Black Places\nSidewalk Labs Spinoff Could Be Coming to Your City\nWhat a Massive Indian Festival Can Teach Us About Improving Cities\nLast summer, Next City contributor Jessica Kourkounis asked Philadelphia seniors, “How can your city change to accommodate older residents?”	12	64
104	Immigration to the Rescue	One reason the U.S. is in better shape is its comparatively high rate of immigration. Since people tend to migrate when they are younger, immigrants tend to bring down the age of the population as a whole. Moreover, at least in the U.S., immigrants tend to have a higher birth rate than the native-born population, although the gap has narrowed somewhat in recent years. The future direction of immigration, therefore, makes a big difference to the age breakdown of the U.S. population. 	14	64
106	Productivity as Innovation	Innovation could come to the rescue by boosting the productivity of the remaining labor force. If the more productive few can produce as much output as the less productive many, GDP will not fall. Similarly, with fewer but more productive workers in the population, per-capita GDP may stay constant. Innovation is the means; economic growth is the end.\n\nCan we plausibly expect aging societies to be as innovative as they need to be? Sociologists, policy makers, and cultural researchers tend to stress the hypothesis that old societies lose the spirit of enterprise, favor security over risky dynamism, and become less forward-looking.	16	72
105	Accessibility in New Construction	Accessibility is crucial. Design elements should include: single-floor living without stairs, doorways and hallways at least 36” wide, non-slip flooring with smooth thresholds between rooms, handrails, adequate lighting, lever-style door/faucet handles, higher toilets with extra space around for easier assistance, showers equipped with a bench, and multi-height kitchen countertops. For the exterior of the home, zero-step entrances, level driveways, weather-protected walkway and entrance, and low-maintenance landscaping should be considered.	13	71
111	Real Estate Implecations 	People currently over the age of 55 have saved only $150,000 for retirement, per Fidelity and Vanguard estimates. This savings amount will generate only $500 per month in income, if the recommended 4% withdrawal standard is followed. Social Security pays an average of $1,294 in benefits to retirees, so average monthly income will be $1,794 or $21,528 per year. If 34% – 38% is spent on housing, the average retiree will have a housing budget of $610 – $682 per month – 	13	1
102	Higher Quality Care for the Elderly	The scandalous treatment of some physically and mentally fragile residents in homes for the elderly is directly traceable to a serious shortage of such facilities, while families of abused residents are unwilling to file complaints because of difficulties in gaining admission to such places. Thus, far greater provision of affordable elderly care residential homes and daycare centers needs to be made. This should be matched by stricter official supervision of such homes to ensure compliance in the operation of such facilities.	15	1
94	A Sleeping Giant	When they retire, decades of experience go with them unless a company has plans in place so that their knowledge is inherited by Gen X and millennial employees.\n\n"It's one of those sleeping giants most people don't think about. They deal with it when someone leaves," said Andrew Pena, assistant vice president for human resources at New Mexico State University and author of several papers and articles on retaining corporate generational knowledge. If you don't do something proactively today, you're going to be stuck with employees who know basic tasks but don't have that institutional knowledge.	14	69
59	it's really not that bad	As bad as the U.S. demographics look, things are worse in much of the world. The U.S. has fewer residents over 65, as a share of its population, than most developed countries, and the disparity will only grow in coming decades. In 2050, about 21 percent of the U.S. population will be 65 or older compared to more than 30 percent in much of Western Europe and an incredible 40 percent in Japan. China, as a result of its “one child” policy, faces its own, somewhat different, demographic crisis.	14	72
53	Affordable Housing Boom	According to a report Opens a New Window. by the Harvard Joint Center for Housing, by 2035 more than one in five people in the U.S. will be aged 65 and older, and one in three households will be headed by someone in that age group. The Projections and Implications for Housing a Growing Population: Older Adults 2015-2035 report notes the growth will increase the demand for affordable, accessible housing that is well connected to services beyond what the current supply can meet.	13	71
87	Our Elderly Are Relying on Good Infrastructure	Minneapolis, with a growing senior population, is seeing an increase in the number of frail and disabled elderly who rely on local services and infrastructure and are concentrated in the inner cities and older suburbs. While local governments and institutions will face greater pressure to provide services and infrastructure to this expanding segment, the challenge may prove especially difficult for many upstate communities, given their environment of slow economic growth and fiscal stress.	12	72
52	Are Baby Boomers Buying or Renting?	It's not unusual for empty nesters to consider downsizing and avoiding tasks such as yard work. But typically downsizing has meant buying smaller homes or condos. Now, for a generation with a reputation for setting trends and yearning for freedom, an increasing number want to rent rather than own. Apartment living in Minneapolis frees up time spent on maintenance and they walk to restaurants, plays, movies and musical events. Could renting be a unique twist for many boomers, the sheer size of their generation starting households.	13	64
93	Homeownership	But homeownership among people 50 to 64 slipped 5 percentage points between 2005 and 2013, notes Molinsky. Part was driven by foreclosures and job loss in the recession. Others are "transitioning to renting as a choice," she said. They want "cost-effective options that demand less time, physical effort and money to maintain." As people enter their 70s, she expects the desire for ease and safety to intensify.\n\nThe combination of 8 million foreclosures and a 10 percent unemployment rate during the housing crash and Great Recession sparked a surge in rentals among all age groups during the last few years and has caused rental rates to soar. 	13	68
57	Zoning Regulations	Most housing regulations are controlled at the local level and range from zoning restrictions to building codes, which can become impediments to building new housing for seniors.  Minneapolis has started implementing these changes which has led to a shortage of housing and run-away inflation in housing costs. City plans, zoning regulations and building codes should be reviewed to address the growing elderly population, in addition to transportation, healthcare, and financial assistance/incentives.	13	70
92	Financial Assistance	Governments may need to consider offering financial assistance to low-income older adult renters, and incentive programs for safe and senior-friendly renovations, energy efficient home upgrades, and property tax relief. Affordability will be key, since more than half of all boomers have less than $100,000 saved for retirement. Public awareness and education is needed to encourage older adults to consider their future housing needs earlier in life. What does this mean for the real estate industry as a whole?	13	72
98	Luxury Living	Although luxury buildings in downtown Minneapolis have been especially popular with empty nesters craving activity, Ramella said boomers are also renting near suburban areas where they raised families. They want to continue ties with churches and communities, he said.\n\nRenting in Minneapolis's downtown is beyond the typical boomer's budget. The new luxury buildings in Minneapolis run about $2.81 a square foot, or $2,800 for 1,000 square feet, according to Appraisal Research Counselors. Many units are 700 to 800 square feet and are geared toward single millennials. Boomers typically want larger apartments.	13	69
60	Transforming Healthcare	With waves of boomers getting older and incurring multiple chronic conditions, hospitals will take on more of the financial burden. "They drive hospital costs," says Richard Birkel, senior vice president for the Center for Healthy Aging and director, Self-Management Alliance at the National Council on Aging, a nonprofit service and advocacy group. "People with multiple chronic conditions are much more likely to end up in the hospital, as a result of a fall, as a result of a cold, getting the flu. They are walking on a tightrope, and they are more vulnerable and, therefore, are much more expensive."	15	68
86	Illnesses and Elderly	One of the biggest stress points is sure to be the care of the chronically ill, already a struggle for the Medicare program, particularly regarding patients with multiple chronic conditions.\n\n"The reality is most elderly people do not have one disease on their death certificates," says Daniel Perry, president of the Alliance for Aging Research. Multiple conditions usually require care from more than one specialist in addition to a primary care physician, and the system currently is set up in a way that doesn't encourage coordination and collaboration. With that many new people enrolling in Medicare.	15	1
61	Is Privatisation the Answer?	Privatisation, public-private partnerships and private initiatives will play a key role in absorbing the pressure on public finances and social systems.\n\nPrivate-sector entities must be made aware of the challenges facing them as the labour pool shrinks. Demand for less qualified staff is likely to continue to fall in the future, making it unrealistic to hope that the problem of unemployment will be solved by demographic change. The competition for highly qualified employees (“war for talents”) is likely to become more intense and inflate salaries for this group. The impact of the demographic shift will be wide-ranging, leading to changes.	16	72
128	Millennials vs. Baby Boomers	Back in 1960, only one in five young adults between the ages of 18 and 34 were actually living with their parents.  But, a Pew Research Center study found that in 2014, 32.1% of Millennials lived in their parents home.\n\n“They’re very happy to stay at home and live off the bank of mom and dad and they put off having children, getting married, so everything was later,” Douglas Elliman CEO Dottie Herman told the FOX Business Network’s Maria Bartiromo.\n\nBut there has been a recent shift in Millennials’ impact on the housing market.	13	64
\.


--
-- Data for Name: ideas_flags; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY ideas_flags (id, user_id, idea_id, idea_flag_description) FROM stdin;
57	1	106	mm
38	1	98	ONE MORE TIME
\.


--
-- Name: ideas_flags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('ideas_flags_id_seq', 57, true);


--
-- Name: ideas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('ideas_id_seq', 128, true);


--
-- Data for Name: ideas_likes; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY ideas_likes (id, user_id, idea_id) FROM stdin;
101	63	53
102	63	57
103	63	105
104	63	111
105	63	93
106	63	98
107	63	92
108	63	52
109	63	50
110	63	63
111	63	54
112	63	88
113	63	94
114	63	97
115	63	104
116	63	89
117	63	96
118	63	59
119	63	60
120	63	86
121	63	102
122	63	99
123	63	61
124	63	106
125	63	87
126	63	90
127	63	100
128	63	101
129	63	56
130	63	58
131	1	50
132	1	56
133	1	58
134	1	57
135	1	93
136	1	98
137	1	92
138	1	111
139	1	52
140	1	105
141	1	53
142	1	54
143	1	96
144	1	59
145	1	97
146	1	89
147	1	88
148	1	94
149	1	104
150	1	60
151	1	86
152	1	61
153	63	53
154	63	53
155	63	53
156	63	53
157	63	53
158	63	53
159	63	53
160	63	53
161	63	53
162	63	53
163	63	53
164	63	53
165	63	53
166	63	53
167	63	53
168	63	53
169	63	96
170	63	96
171	63	96
172	63	96
173	63	96
174	63	96
175	63	96
176	63	96
177	63	96
178	63	96
179	63	96
180	63	102
181	63	102
182	63	102
183	63	102
184	63	102
185	63	102
186	63	102
187	63	56
188	63	56
189	63	56
190	63	56
191	63	56
192	63	56
193	63	56
194	1	50
195	1	50
196	1	50
197	1	50
198	1	50
199	63	92
200	63	92
201	63	92
202	63	92
203	63	92
204	63	92
205	63	92
206	63	92
207	63	92
208	63	92
209	63	92
212	63	92
213	63	98
214	63	98
215	63	98
\.


--
-- Name: ideas_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('ideas_likes_id_seq', 158, true);


--
-- Data for Name: ideas_loves; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY ideas_loves (id, user_id, idea_id) FROM stdin;
1	1	52
3	4	101
4	4	56
5	4	100
6	4	50
7	4	58
8	4	104
9	4	89
10	4	59
11	4	96
12	4	99
13	4	97
14	4	54
15	4	53
16	4	52
17	4	57
18	4	57
19	4	54
20	4	54
21	4	54
24	4	54
22	4	89
23	4	89
25	4	98
26	4	93
27	4	93
28	4	105
29	4	89
30	4	93
31	4	104
32	4	98
33	4	89
34	4	54
35	4	101
36	63	98
37	63	89
38	63	54
39	67	54
40	1	56
41	1	53
42	1	96
43	1	102
44	4	92
50	4	92
45	4	92
46	4	92
47	4	92
48	4	92
49	4	92
51	4	53
52	4	53
53	4	53
54	4	53
55	4	53
56	4	53
57	4	53
58	4	53
59	1	106
60	1	61
61	1	92
64	64	53
\.


--
-- Name: ideas_loves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('ideas_loves_id_seq', 64, true);


--
-- Data for Name: main_topics; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY main_topics (id, title, description, active, upcoming) FROM stdin;
9	Pot Holes and Cyborgs	More related than you think.	f	f
10	Aging Minnesota	Minnesota is in a precarious spot with its population. According to the Minnesota State Demographic Center, “In the present decade (2010-2015), the counties that were entirely rural or a rural/town mix (as a group) have seen population losses, while counties that were entirely or partially urban (as a group) saw gains. Entirely urban counties, however, were the only county type growing as a result of migration (not due to births) and only due to international arrivals, ultimately.” Additionally, about 73 percent of Minnesotans now live in urban areas. Furthermore, Minnesota is facing an unprecedented increase in Minnesota’s “older adult” population which means Minnesota will also need to rely on international migration to fill labor force shortages.	t	f
3	title	desc	\N	f
4	title	desc	\N	f
5	\N	\N	\N	f
6	Here is a new Main Topic	Let's make it amazing!	\N	f
7	Here is a new Main Topic	Let's make it amazing!	\N	f
8	Here is a new topic	What are we going to talk about?	\N	f
2	Traffic is Terrible	Traffic Solution Forum for Minneapolis	f	f
1	Minneapolis Traffic Solutions	Commuters have long suspected that metro area highways and freeways are getting congested more often - the current round of road work notwithstanding - and now comes evidence that their suspicions are true.	f	t
\.


--
-- Name: main_topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('main_topics_id_seq', 10, true);


--
-- Data for Name: subcomments; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY subcomments (id, description, user_id, comment_id) FROM stdin;
\.


--
-- Name: subcomments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('subcomments_id_seq', 1, false);


--
-- Data for Name: subcomments_likes; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY subcomments_likes (id, user_id, subcomment_id) FROM stdin;
\.


--
-- Data for Name: subflags; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY subflags (id, user_id, subcomment_id) FROM stdin;
\.


--
-- Name: subflags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('subflags_id_seq', 1, false);


--
-- Name: sublikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('sublikes_id_seq', 1, false);


--
-- Data for Name: subtopics; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY subtopics (id, title, description, main_id, active, upcoming) FROM stdin;
19	Parking	Whether you’re headed into Minneapolis for business or pleasure, parking is a headache you’ll have to face. With more companies moving into central Minneapolis and few large scale parking developments on the horizon, this problem isn’t going away. Minneapolis needs a vision for development that includes parking solutions.	1	f	f
5	What Works for Minneapolis?	After months of crowdsourcing, it’s time to turn all of our small fixes into Minneapolis’s big solutions. How can a compound approach of multiple fixes coalesce into coherent public policy? We’ll study other cities from around the country to find models for Minneapolis to mirror, or avoid. In this topic, Minneapolitans will come together and help us finalize solutions for our public town hall and final policy product.	1	f	t
1	Commuting	It’s no secret that people Minneapolis spend a lot of time in traffic - we’re 4th nationally for time spent in traffic, behind traffic disasters like Houston and New York City. Even with billions of dollars worth of investment and decades of construction, we’re no closer to fixing our traffic snarl.	1	f	t
9	Parking	Is there enough parking where you live?	2	f	f
10	Growth	More traffic sollutions.	2	f	f
8	Impaired Driving	Don't do it!	2	f	f
7	Commuting	What's your commute like?	2	f	f
4	Bike Shops	Where are the best places to buy or rent bikes?	1	f	t
18	More topics about biking	More biking!	1	f	f
13	Housing	Updating zoning and housing regulations to account for this impending shift in state demographics.	10	t	f
6	Pot Holes	Where are they?!	2	f	f
11	Cyborgs	The end to our way of life as we know it?	9	f	f
17			1	f	f
12	Infrastructure	Building infrastructure to facilitate this population change for the next 50-100 years.	10	t	f
15	Healthcare	Planning for increased healthcare costs and how to deal with this burden. Is it a state budget issue? A matter of public health? An individual concern? Or something else?	10	t	f
14	Workforce	Attracting outside talent and diversifying MN’s workforce to keep its economy strong, with a focus on long-term retention of these workers within the state.	10	t	f
16	Innovation	Possible innovations and best practices from within our borders, but also outside of our community. What are examples of how to (and how NOT to) deal with this population shift?	10	t	f
20	title	description	1	f	f
21	What Works for Minneapolis?	After months of crowdsourcing, it’s time to turn all of our small fixes into Minneapolis’s big solutions. How can a compound approach of multiple fixes coalesce into coherent public policy? We’ll study other cities from around the country to find models for Minneapolis to mirror, or avoid. In this topic, Minneapolitans will come together and help us finalize solutions for our public town hall and final policy product.	1	f	f
22			1	f	f
2	Growth	The word is out about Minneapolis - this is the place to be. We’re growing fast, but our transportation system isn’t keeping up. We need to figure out what will make Austin livable for generations to come, be it new zoning laws, a new vision for land use and density or coming future tech.	1	f	t
3	Impaired Driving	In Minneapolis, close to 40 percent of traffic fatalities are alcohol related, and nearly 100,000 DUI arrests were made last year. That’s a problem - and Austin is no exception. With unprecedented access to ridesharing, public transportation, taxis, TNCs like Lyft and Uber, and smart phones, all Minnesotans should be accountable for our impaired driving problem.	1	f	t
\.


--
-- Name: subtopics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('subtopics_id_seq', 22, true);


--
-- Data for Name: user_filter; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY user_filter (id, filter) FROM stdin;
1	User Name
2	User Email
3	User Ward
4	User Status
\.


--
-- Name: user_filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('user_filter_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: chris
--

COPY users (id, name, email, address, ward, admin, active, city, state, zipcode, photo) FROM stdin;
73	Billy Batson\n	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
3	Chad Sundberg	filleremail@gmail.com	730 Stinson BLVD Unit 408 Minneapolis, Minnesota 55413	2	f	t	\N	\N	\N	\N
16	Jennifer	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
14	Amanda	filleremail@gmail.com	stuff	5	f	t	\N	\N	\N	\N
33	Jessica	filleremail@gmail.com	stuff	4	f	t	\N	\N	\N	\N
2	Melissa	filleremail@gmail.com	730 Stinson BLVD Unit 408 Minneapolis, Minnesota 55413	1	f	t	\N	\N	\N	\N
66	Chris Stanston	filleremail@gmail.com	730 Stinson BLVD Unit 408	7	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
49	David Semple\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	5	f	t	Minneapolis	Minnesota	55413	https://lh4.googleusercontent.com/-3uEouOcB028/AAAAAAAAAAI/AAAAAAAAAJU/usqHEUycN60/photo.jpg
63	Josh Pauly	peoplesourcepolicy@gmail.com	730 Stinson BLVD Unit 408	4	t	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
67	Chris Stanston	filleremail@gmail.com	730 Stinson BLVD Unit 408	8	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
74	ari koison	koisonari@gmail.com	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
76	Chris Stanston	chris.sstanston@gmail.com	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
78	Chris Stanston	ssfasdfsdf	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
4	Luke Schlangen	filleremail@gmail.com	730 Stinson BLVD Unit 408 Minneapolis, Minnesota 55413	3	f	t	\N	\N	\N	\N
1	chris Kooiman	chris.kooiman@gmail.com	730 Stinson BLVD Unit 408 Minneapolis, Minnesota 55413	1	t	t	\N	\N	\N	https://lh4.googleusercontent.com/-3uEouOcB028/AAAAAAAAAAI/AAAAAAAAAJU/usqHEUycN60/photo.jpg
62	Dr. Kimiyo Hoshi\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	3	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
68	Clyde Hernandez	clyde.hernandez43@gmail.com	13 W 50th St	1	f	t	Minneapolis	MN	55419	https://randomuser.me/api/portraits/men/84.jpg
69	Francis Johnson	francis.johnson86@gmail.com	4257 Nicollet Ave	2	f	t	Minneapolis	MN	55407	https://randomuser.me/api/portraits/men/86.jpg
70	Jessie Matthews	jessie.matthews11@gmail.com	1624 Harmon Pl	3	f	t	Minneapolis	MN	55403	https://randomuser.me/api/portraits/women/80.jpg
71	Ramona Nelson	ramona.nelson95@gmail.com	4537 Nicollet Ave	4	f	t	Minneapolis	MN	55419	https://randomuser.me/api/portraits/women/18.jpg
51	Kyle Rayner\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	3	f	t	Minneapolis	Minnesota	55413	https://lh4.googleusercontent.com/-3uEouOcB028/AAAAAAAAAAI/AAAAAAAAAJU/usqHEUycN60/photo.jpg
54	Alec Holland\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	7	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
61	Scott Summers\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	2	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
52	Obadiah Stane\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	2	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
53	Barbara Gordon\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	6	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
65	Chris Stanston	filleremail@gmail.com	730 Stinson BLVD Unit 408	6	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
50	Don Wright\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	4	f	t	Minneapolis	Minnesota	55413	https://lh4.googleusercontent.com/-3uEouOcB028/AAAAAAAAAAI/AAAAAAAAAJU/usqHEUycN60/photo.jpg
45	David Semple\n	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
46	Adam Blake\n	filleremail@gmail.com	stuff	9	f	t	\N	\N	\N	\N
47	Lance Gallant\n	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
48	Katherine Manser\n	filleremail@gmail.com	stuff	2	f	t	\N	\N	\N	\N
19	James	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
17	Ed	filleremail@gmail.com	stuff	7	f	t	\N	\N	\N	\N
28	Kelsey	filleremail@gmail.com	stuff	11	f	t	\N	\N	\N	\N
13	Celina	filleremail@gmail.com	stuff	5	f	t	\N	\N	\N	\N
25	Tom	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
29	Logan	filleremail@gmail.com	stuff	11	f	t	\N	\N	\N	\N
23	Bobby	filleremail@gmail.com	stuff	9	f	t	\N	\N	\N	\N
20	John	filleremail@gmail.com	stuff	8	f	t	\N	\N	\N	\N
15	Josh	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
31	Alex	filleremail@gmail.com	stuff	12	f	t	\N	\N	\N	\N
30	Matt	filleremail@gmail.com	stuff	12	f	t	\N	\N	\N	\N
18	Jake	filleremail@gmail.com	stuff	7	f	t	\N	\N	\N	\N
22	Mark	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
21	Sabine	filleremail@gmail.com	stuff	8	f	t	\N	\N	\N	\N
27	Katherine	filleremail@gmail.com	stuff	10	f	t	\N	\N	\N	\N
72	Joann Fleming	joann.fleming90@gmail.com	2726 W 43rd St	5	f	t	Minneapolis	MN	55410	https://randomuser.me/api/portraits/women/52.jpg
60	Ari Koison	filleremail@gmail.com	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
32	Jeremy	filleremail@gmail.com	stuff	3	f	t	\N	\N	\N	\N
34	Barry Allen	filleremail@gmail.com	stuff	4	f	t	\N	\N	\N	\N
9	Kris Szafranski	filleremail@gmail.com	stuff	3	f	t	\N	\N	\N	\N
10	Kris Jenson	filleremail@gmail.com	stuff	1	f	t	\N	\N	\N	\N
11	Christine P.	filleremail@gmail.com	stuff	4	f	t	\N	\N	\N	\N
12	Paige	filleremail@gmail.com	stuff	4	f	t	\N	\N	\N	\N
24	Louise	filleremail@gmail.com	stuff	9	f	t	\N	\N	\N	\N
26	Tyler	filleremail@gmail.com	stuff	9	f	t	\N	\N	\N	\N
36	Oswald Cobblepot	filleremail@gmail.com	stuff	4	f	t	\N	\N	\N	\N
35	Bruce Wayne\n	filleremail@gmail.com	stuff	4	f	t	\N	\N	\N	\N
37	Peter Parker\n	filleremail@gmail.com	stuff	5	f	t	\N	\N	\N	\N
38	Dick Grayson	filleremail@gmail.com	stuff	5	f	t	\N	\N	\N	\N
39	Kurt Wagner\n	filleremail@gmail.com	stuff	5	f	t	\N	\N	\N	\N
40	Carter Hall\n	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
41	Kent Nelson	filleremail@gmail.com	stuff	7	f	t	\N	\N	\N	\N
42	Carrie Kelley	filleremail@gmail.com	stuff	7	f	t	\N	\N	\N	\N
43	Billy Batson\n	filleremail@gmail.com	stuff	6	f	t	\N	\N	\N	\N
44	Tom Evans\n	filleremail@gmail.com	stuff	8	f	t	\N	\N	\N	\N
58	Norbert Sykes\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	11	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
56	Donna Troy\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	9	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
59	Ororo Monroe\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	12	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
55	Troy Stewart\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	8	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
57	William “Billy” Kaplan\n	filleremail@gmail.com	730 Stinson BLVD Unit 408	10	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
75	Chris Stanston	chris.stssanston@gmail.com	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
64	Jeremy Leif	jeremy.lieef@gmail.com	730 Stinson BLVD Unit 408	5	f	t	Minneapolis	Minnesota	55413	https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAxOAAAAJDRmYWExNmRhLTY3MGEtNDQ4MS1iMzYyLWViOTQyOTA0MDhkOQ.jpg
77	Chris Stanston	chris.stanstton@gmail.com	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
79	Chris Stanston	chris.stanston@gmail.com	730 Stinson BLVD Unit 408	1	f	t	Minneapolis	Minnesota	55413	https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chris
--

SELECT pg_catalog.setval('users_id_seq', 79, true);


--
-- Name: comments_flags comments_flags_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_flags
    ADD CONSTRAINT comments_flags_pkey PRIMARY KEY (id);


--
-- Name: comments_likes comments_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_likes
    ADD CONSTRAINT comments_likes_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: ideas_flags ideas_flags_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_flags
    ADD CONSTRAINT ideas_flags_pkey PRIMARY KEY (id);


--
-- Name: ideas_likes ideas_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_likes
    ADD CONSTRAINT ideas_likes_pkey PRIMARY KEY (id);


--
-- Name: ideas_loves ideas_loves_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_loves
    ADD CONSTRAINT ideas_loves_pkey PRIMARY KEY (id);


--
-- Name: ideas ideas_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas
    ADD CONSTRAINT ideas_pkey PRIMARY KEY (id);


--
-- Name: main_topics main_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY main_topics
    ADD CONSTRAINT main_topics_pkey PRIMARY KEY (id);


--
-- Name: subcomments subcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments
    ADD CONSTRAINT subcomments_pkey PRIMARY KEY (id);


--
-- Name: subflags subflags_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subflags
    ADD CONSTRAINT subflags_pkey PRIMARY KEY (id);


--
-- Name: subcomments_likes sublikes_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments_likes
    ADD CONSTRAINT sublikes_pkey PRIMARY KEY (id);


--
-- Name: subtopics subtopics_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subtopics
    ADD CONSTRAINT subtopics_pkey PRIMARY KEY (id);


--
-- Name: user_filter user_filter_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY user_filter
    ADD CONSTRAINT user_filter_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments_flags comments_flags_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_flags
    ADD CONSTRAINT comments_flags_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES comments(id);


--
-- Name: comments_flags comments_flags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_flags
    ADD CONSTRAINT comments_flags_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: comments comments_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES ideas(id);


--
-- Name: comments_likes comments_likes_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_likes
    ADD CONSTRAINT comments_likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES comments(id);


--
-- Name: comments_likes comments_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments_likes
    ADD CONSTRAINT comments_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: ideas_flags ideas_flags_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_flags
    ADD CONSTRAINT ideas_flags_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES ideas(id);


--
-- Name: ideas_flags ideas_flags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_flags
    ADD CONSTRAINT ideas_flags_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: ideas_likes ideas_likes_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_likes
    ADD CONSTRAINT ideas_likes_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES ideas(id);


--
-- Name: ideas_likes ideas_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_likes
    ADD CONSTRAINT ideas_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: ideas_loves ideas_loves_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_loves
    ADD CONSTRAINT ideas_loves_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES ideas(id);


--
-- Name: ideas_loves ideas_loves_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas_loves
    ADD CONSTRAINT ideas_loves_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: ideas ideas_subtopics_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas
    ADD CONSTRAINT ideas_subtopics_id_fkey FOREIGN KEY (subtopics_id) REFERENCES subtopics(id);


--
-- Name: ideas ideas_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY ideas
    ADD CONSTRAINT ideas_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: subcomments subcomments_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments
    ADD CONSTRAINT subcomments_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES comments(id);


--
-- Name: subcomments subcomments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments
    ADD CONSTRAINT subcomments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: subflags subflags_subcomment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subflags
    ADD CONSTRAINT subflags_subcomment_id_fkey FOREIGN KEY (subcomment_id) REFERENCES subcomments(id);


--
-- Name: subflags subflags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subflags
    ADD CONSTRAINT subflags_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: subcomments_likes sublikes_subcomment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments_likes
    ADD CONSTRAINT sublikes_subcomment_id_fkey FOREIGN KEY (subcomment_id) REFERENCES subcomments(id);


--
-- Name: subcomments_likes sublikes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subcomments_likes
    ADD CONSTRAINT sublikes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: subtopics subtopics_main_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chris
--

ALTER TABLE ONLY subtopics
    ADD CONSTRAINT subtopics_main_id_fkey FOREIGN KEY (main_id) REFERENCES main_topics(id);


--
-- PostgreSQL database dump complete
--
